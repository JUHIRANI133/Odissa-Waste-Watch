'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Loader2, Save, Sparkles, FileText, Package, Weight, Recycle, Trash2, Droplets, GlassWater, FileSpreadsheet, Building, Shirt } from 'lucide-react';
import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractWasteReceiptData } from '@/ai/flows/invoice-data-extraction';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Define the expected return type from AI extraction
interface ExtractedReceiptData {
  dateOfCollection?: string;
  gpName?: string;
  taggedUlb?: string;
  taggedMrf?: string;
  routeId?: string;
  totalWaste?: string;
  plastic?: string;
  paper?: string;
  metal?: string;
  glass?: string;
  cloth?: string;
  sanitation?: string;
  others?: string;
}

function WasteReceiptGenerationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const db = useFirestore();
  const [mounted, setMounted] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    gpName: searchParams.get('gp') || '',
    district: searchParams.get('district') || '',
    block: searchParams.get('block') || '',
    taggedUlb: '',
    taggedMrf: '',
    routeId: '',
    totalKg: '',
    plasticKg: '',
    paperKg: '',
    metalKg: '',
    glassKg: '',
    clothKg: '',
    sanitationKg: '',
    othersKg: ''
  });

  useEffect(() => { setMounted(true); }, []);

  // Auto-calculate total when individual waste categories change
  const updateTotalFromCategories = (updatedFormData: typeof formData) => {
    const plastic = parseFloat(updatedFormData.plasticKg) || 0;
    const paper = parseFloat(updatedFormData.paperKg) || 0;
    const metal = parseFloat(updatedFormData.metalKg) || 0;
    const glass = parseFloat(updatedFormData.glassKg) || 0;
    const cloth = parseFloat(updatedFormData.clothKg) || 0;
    const sanitation = parseFloat(updatedFormData.sanitationKg) || 0;
    const others = parseFloat(updatedFormData.othersKg) || 0;
    const calculatedTotal = plastic + paper + metal + glass + cloth + sanitation + others;
    
    if (calculatedTotal > 0) {
      setFormData(prev => ({
        ...prev,
        totalKg: calculatedTotal.toString()
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    
    // Auto-calculate total if changing any waste category
    if (['plasticKg', 'paperKg', 'metalKg', 'glassKg', 'clothKg', 'sanitationKg', 'othersKg'].includes(id)) {
      updateTotalFromCategories(updatedFormData);
    }
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, totalKg: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const result = await extractWasteReceiptData({ receiptImage: base64 }) as ExtractedReceiptData;
        if (result) {
          setFormData(prev => ({
            ...prev,
            date: result.dateOfCollection || prev.date,
            gpName: result.gpName || prev.gpName,
            taggedUlb: result.taggedUlb || prev.taggedUlb,
            taggedMrf: result.taggedMrf || prev.taggedMrf,
            routeId: result.routeId || prev.routeId,
            totalKg: result.totalWaste?.replace(/[^0-9.]/g, '') || '',
            plasticKg: result.plastic?.replace(/[^0-9.]/g, '') || '',
            paperKg: result.paper?.replace(/[^0-9.]/g, '') || '',
            metalKg: result.metal?.replace(/[^0-9.]/g, '') || '',
            glassKg: result.glass?.replace(/[^0-9.]/g, '') || '',
            clothKg: result.cloth?.replace(/[^0-9.]/g, '') || '',
            sanitationKg: result.sanitation?.replace(/[^0-9.]/g, '') || '',
            othersKg: result.others?.replace(/[^0-9.]/g, '') || ''
          }));
          toast({ title: "Extraction Complete", description: "Fields populated from photo." });
        }
      } catch (err) {
        toast({ title: "Extraction Failed", description: "AI could not read the photo. Please enter manually.", variant: "destructive" });
      } finally {
        setIsExtracting(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!db) {
      toast({ title: "Error", description: "Database connection not available.", variant: "destructive" });
      return;
    }
    
    if (!formData.gpName) {
      toast({ title: "Validation Error", description: "GP Name is required.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const gpNameValue = formData.gpName;
      const totalKgValue = parseFloat(formData.totalKg) || 0;
      const plasticValue = parseFloat(formData.plasticKg) || 0;
      const paperValue = parseFloat(formData.paperKg) || 0;
      const metalValue = parseFloat(formData.metalKg) || 0;
      const glassValue = parseFloat(formData.glassKg) || 0;
      const clothValue = parseFloat(formData.clothKg) || 0;
      const sanitationValue = parseFloat(formData.sanitationKg) || 0;
      const othersValue = parseFloat(formData.othersKg) || 0;
      
      await addDoc(collection(db, 'wasteDetails'), {
        date: formData.date,
        district: formData.district,
        block: formData.block,
        ulb: formData.taggedUlb,
        mrf: formData.taggedMrf,
        routeId: formData.routeId,
        submittedByRole: 'gp',
        gpName: gpNameValue,
        driverSubmitted: totalKgValue,
        totalGpLoad: totalKgValue,
        plastic: plasticValue,
        paper: paperValue,
        metal: metalValue,
        glass: glassValue,
        cloth: clothValue,
        sanitation: sanitationValue,
        others: othersValue,
        gpBreakdown: [{ name: gpNameValue, amount: totalKgValue }],
        submittedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      });
      
      toast({ title: "Receipt Generated", description: "Data synced with master ledger across all portals." });
      router.push(`/gp-ulb?${searchParams.toString()}`);
    } catch (err) {
      console.error('Submit error:', err);
      toast({ title: "Error", description: "Submission failed. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <Card className="border-2 border-primary/20 shadow-lg bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" /> AI Receipt Assistant
              </CardTitle>
              <CardDescription className="text-[10px] font-bold">Upload a photo to automatically fill the form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center space-y-4 hover:bg-primary/5 transition-colors cursor-pointer relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      disabled={isExtracting || isSubmitting}
                    />
                    <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto group-hover:scale-110 transition-transform">
                        {isExtracting ? <Loader2 className="h-8 w-8 animate-spin text-primary" /> : <UploadCloud className="h-8 w-8 text-primary" />}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-primary">{isExtracting ? 'Extracting Data...' : 'Upload Receipt Photo'}</p>
                        <p className="text-[9px] text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-8">
        <Card className="border-2 shadow-xl border-primary/20">
            <CardHeader className="bg-primary/5 border-b pb-6">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                <FileText className="h-6 w-6" /> Waste Receipt Generation
              </CardTitle>
              <CardDescription className="font-bold text-primary opacity-70">GP Portal - Official waste receipt submission</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-wider">Basic Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">GP Name *</Label>
                    <Input 
                      id="gpName"
                      type="text" 
                      value={formData.gpName} 
                      onChange={handleInputChange}
                      placeholder="Enter Gram Panchayat name"
                      className="font-bold"
                      disabled={!!searchParams.get('gp')}
                    />
                    {searchParams.get('gp') && (
                      <p className="text-[8px] text-muted-foreground">GP name auto-filled from portal</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Date of Collection</Label>
                    <Input 
                      id="date"
                      type="date" 
                      value={formData.date} 
                      onChange={handleInputChange} 
                      className="font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">District</Label>
                    <Input value={formData.district} disabled className="bg-muted/20 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Block</Label>
                    <Input value={formData.block} disabled className="bg-muted/20 font-bold" />
                  </div>
                </div>
              </div>

              {/* Administrative Context Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Building className="h-4 w-4 text-primary" />
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-wider">Administrative Context</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Tagged ULB</Label>
                    <Input 
                      id="taggedUlb"
                      type="text" 
                      value={formData.taggedUlb} 
                      onChange={handleInputChange}
                      placeholder="e.g., Boudh Municipality"
                      className="font-bold" 
                    />
                    <p className="text-[8px] text-muted-foreground">Urban Local Body associated with this GP</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Tagged MRF</Label>
                    <Input 
                      id="taggedMrf"
                      value={formData.taggedMrf} 
                      onChange={handleInputChange} 
                      placeholder="e.g., Kodandapur MRF"
                      className="font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Route ID</Label>
                    <Input 
                      id="routeId"
                      value={formData.routeId} 
                      onChange={handleInputChange} 
                      placeholder="e.g., RJ-01"
                      className="font-mono font-bold" 
                    />
                  </div>
                </div>
              </div>

              {/* Waste Category Breakdown Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Recycle className="h-4 w-4 text-primary" />
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-wider">Waste Category Breakdown (Kg)</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <Package className="h-3 w-3" /> Plastic
                    </Label>
                    <Input 
                      id="plasticKg"
                      type="number" 
                      step="0.01"
                      value={formData.plasticKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <FileSpreadsheet className="h-3 w-3" /> Paper
                    </Label>
                    <Input 
                      id="paperKg"
                      type="number" 
                      step="0.01"
                      value={formData.paperKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <Weight className="h-3 w-3" /> Metal
                    </Label>
                    <Input 
                      id="metalKg"
                      type="number" 
                      step="0.01"
                      value={formData.metalKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <GlassWater className="h-3 w-3" /> Glass
                    </Label>
                    <Input 
                      id="glassKg"
                      type="number" 
                      step="0.01"
                      value={formData.glassKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <Shirt className="h-3 w-3" /> Cloth
                    </Label>
                    <Input 
                      id="clothKg"
                      type="number" 
                      step="0.01"
                      value={formData.clothKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <Droplets className="h-3 w-3" /> Sanitation
                    </Label>
                    <Input 
                      id="sanitationKg"
                      type="number" 
                      step="0.01"
                      value={formData.sanitationKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60 flex items-center gap-1">
                      <Trash2 className="h-3 w-3" /> Others
                    </Label>
                    <Input 
                      id="othersKg"
                      type="number" 
                      step="0.01"
                      value={formData.othersKg} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="font-mono font-bold" 
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              {/* Total Waste Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Weight className="h-4 w-4 text-primary" />
                  <h3 className="text-[10px] font-black uppercase text-primary tracking-wider">Total Waste Summary</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase opacity-60">Total Waste (Kg)</Label>
                    <Input 
                      id="totalKg"
                      type="number" 
                      step="0.01"
                      value={formData.totalKg} 
                      onChange={handleTotalChange}
                      placeholder="0.00"
                      className="font-mono font-black text-primary bg-primary/5 text-lg h-12" 
                    />
                    <p className="text-[8px] text-muted-foreground">Auto-calculated from categories above</p>
                  </div>
                  <div className="bg-muted/10 rounded-xl p-4 border border-dashed flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-muted-foreground">Categories Entered:</span>
                    <span className="text-xs font-black text-primary">
                      {[
                        formData.plasticKg && parseFloat(formData.plasticKg) > 0 ? 'Plastic' : '',
                        formData.paperKg && parseFloat(formData.paperKg) > 0 ? 'Paper' : '',
                        formData.metalKg && parseFloat(formData.metalKg) > 0 ? 'Metal' : '',
                        formData.glassKg && parseFloat(formData.glassKg) > 0 ? 'Glass' : '',
                        formData.clothKg && parseFloat(formData.clothKg) > 0 ? 'Cloth' : '',
                        formData.sanitationKg && parseFloat(formData.sanitationKg) > 0 ? 'Sanitation' : '',
                        formData.othersKg && parseFloat(formData.othersKg) > 0 ? 'Others' : ''
                      ].filter(Boolean).join(', ') || 'None'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/5 border-t p-6">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.gpName || (!formData.totalKg && !formData.plasticKg && !formData.paperKg && !formData.clothKg)} 
                className="w-full h-12 font-black uppercase tracking-widest shadow-lg"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 h-5 w-5" />} 
                Finalize & Submit Verified Receipt
              </Button>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}

export default function WasteReceiptGenerationPage() {
  return (<Suspense fallback={<div className="p-12 text-center animate-pulse">Loading waste receipt generation portal...</div>}><WasteReceiptGenerationContent /></Suspense>);
}