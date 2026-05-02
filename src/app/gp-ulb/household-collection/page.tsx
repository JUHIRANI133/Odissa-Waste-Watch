'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useFirestore } from '@/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, Timestamp } from 'firebase/firestore';
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { format } from 'date-fns';

interface Household {
  id: string;
  firestoreId?: string;
  houseId: string;
  ownerName: string;
  collected: boolean;
  collectionDate?: string | null;
  wasteAmount?: number;
  routeId?: string | null;
  gpName?: string | null;
  collectedBy?: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

function HouseholdCollectionContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const routeId = searchParams.get('routeId') || '';
  const gpName = searchParams.get('gpName') || '';
  
  const [households, setHouseholds] = useState<Household[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHousehold, setEditingHousehold] = useState<Household | null>(null);
  const [formData, setFormData] = useState({
    houseId: '',
    ownerName: '',
    wasteAmount: ''
  });
  
  const db = useFirestore();

  // Fetch households from Firestore
  useEffect(() => {
    const fetchHouseholds = async () => {
      if (!db) return;
      
      setIsLoading(true);
      try {
        let q;
        if (routeId) {
          q = query(collection(db, 'households'), where('routeId', '==', routeId));
        } else if (gpName) {
          q = query(collection(db, 'households'), where('gpName', '==', gpName));
        } else {
          q = query(collection(db, 'households'), orderBy('createdAt', 'desc'));
        }
        
        const querySnapshot = await getDocs(q);
        const householdData: Household[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          householdData.push({ 
            id: doc.id, 
            firestoreId: doc.id,
            houseId: data.houseId || '',
            ownerName: data.ownerName || '',
            collected: data.collected || false,
            collectionDate: data.collectionDate || null,
            wasteAmount: data.wasteAmount || 0,
            routeId: data.routeId || null,
            gpName: data.gpName || null,
            collectedBy: data.collectedBy || null,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          });
        });
        
        setHouseholds(householdData);
      } catch (error) {
        console.error('Error fetching households:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHouseholds();
  }, [db, routeId, gpName]);

  const collectedCount = households.filter(h => h.collected).length;
  const progressPercentage = households.length > 0 ? (collectedCount / households.length) * 100 : 0;
  const totalWasteCollected = households.reduce((sum, h) => sum + (h.wasteAmount || 0), 0);

  const handleCheckboxChange = async (index: number, checked: boolean) => {
    const household = households[index];
    if (!db || !household.firestoreId) return;
    
    setIsSaving(true);
    try {
      const householdRef = doc(db, 'households', household.firestoreId);
      const updateData: any = {
        collected: checked,
        updatedAt: Timestamp.now()
      };
      
      if (checked) {
        updateData.collectionDate = new Date().toISOString();
        updateData.collectedBy = name;
      } else {
        updateData.collectionDate = null;
        updateData.collectedBy = null;
      }
      
      await updateDoc(householdRef, updateData);
      
      const updatedHouseholds = [...households];
      updatedHouseholds[index] = { 
        ...updatedHouseholds[index], 
        collected: checked,
        collectionDate: checked ? new Date().toISOString() : null,
        collectedBy: checked ? name : null
      };
      setHouseholds(updatedHouseholds);
    } catch (error) {
      console.error('Error updating collection status:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleWasteAmountChange = async (index: number, amount: number) => {
    const household = households[index];
    if (!db || !household.firestoreId) return;
    
    setIsSaving(true);
    try {
      const householdRef = doc(db, 'households', household.firestoreId);
      await updateDoc(householdRef, {
        wasteAmount: amount,
        updatedAt: Timestamp.now()
      });
      
      const updatedHouseholds = [...households];
      updatedHouseholds[index] = { ...updatedHouseholds[index], wasteAmount: amount };
      setHouseholds(updatedHouseholds);
    } catch (error) {
      console.error('Error updating waste amount:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddHousehold = async () => {
    if (!formData.houseId || !formData.ownerName) {
      alert("Please fill all required fields");
      return;
    }
    
    if (!db) return;
    
    setIsSaving(true);
    try {
      const newHousehold = {
        houseId: formData.houseId,
        ownerName: formData.ownerName,
        wasteAmount: parseFloat(formData.wasteAmount) || 0,
        collected: false,
        routeId: routeId || null,
        gpName: gpName || null,
        collectedBy: null,
        collectionDate: null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, 'households'), newHousehold);
      const addedHousehold: Household = {
        id: docRef.id,
        firestoreId: docRef.id,
        houseId: newHousehold.houseId,
        ownerName: newHousehold.ownerName,
        wasteAmount: newHousehold.wasteAmount,
        collected: newHousehold.collected,
        routeId: newHousehold.routeId,
        gpName: newHousehold.gpName,
        collectedBy: newHousehold.collectedBy,
        collectionDate: newHousehold.collectionDate,
        createdAt: newHousehold.createdAt,
        updatedAt: newHousehold.updatedAt
      };
      setHouseholds([...households, addedHousehold]);
      setIsDialogOpen(false);
      setFormData({ houseId: '', ownerName: '', wasteAmount: '' });
    } catch (error) {
      console.error('Error adding household:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditHousehold = async () => {
    if (!editingHousehold || !editingHousehold.firestoreId || !db) return;
    if (!formData.houseId || !formData.ownerName) {
      alert("Please fill all required fields");
      return;
    }
    
    setIsSaving(true);
    try {
      const householdRef = doc(db, 'households', editingHousehold.firestoreId);
      await updateDoc(householdRef, {
        houseId: formData.houseId,
        ownerName: formData.ownerName,
        wasteAmount: parseFloat(formData.wasteAmount) || 0,
        updatedAt: Timestamp.now()
      });
      
      const updatedHouseholds = households.map(h => 
        h.firestoreId === editingHousehold.firestoreId 
          ? { ...h, 
              houseId: formData.houseId, 
              ownerName: formData.ownerName,
              wasteAmount: parseFloat(formData.wasteAmount) || 0
            }
          : h
      );
      setHouseholds(updatedHouseholds);
      setIsDialogOpen(false);
      setEditingHousehold(null);
      setFormData({ houseId: '', ownerName: '', wasteAmount: '' });
    } catch (error) {
      console.error('Error editing household:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteHousehold = async (household: Household) => {
    if (!db || !household.firestoreId) return;
    
    if (!confirm(`Are you sure you want to delete ${household.ownerName}?`)) return;
    
    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'households', household.firestoreId));
      setHouseholds(households.filter(h => h.firestoreId !== household.firestoreId));
    } catch (error) {
      console.error('Error deleting household:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const openAddDialog = () => {
    setEditingHousehold(null);
    setFormData({ houseId: '', ownerName: '', wasteAmount: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (household: Household) => {
    setEditingHousehold(household);
    setFormData({
      houseId: household.houseId,
      ownerName: household.ownerName,
      wasteAmount: household.wasteAmount?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading household data...</p>
      </div>
    );
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-headline font-black uppercase tracking-tight">
              Household Waste Collection
            </CardTitle>
            <CardDescription className="font-bold">
              Track waste collection status from houses in your Gram Panchayat
              {gpName && ` - ${gpName}`}
              {routeId && ` (Route: ${routeId})`}
            </CardDescription>
          </div>
          <Button 
            onClick={openAddDialog}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Household
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">Collection Progress</span>
              <p className="text-sm text-muted-foreground">
                {collectedCount} / {households.length} Houses Completed
              </p>
            </div>
            <div className="text-right">
              <span className="font-medium text-primary">Total Waste Collected</span>
              <p className="text-sm font-black text-primary">{totalWasteCollected.toFixed(1)} KG</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Households Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] font-black uppercase text-[10px]">House ID</TableHead>
                <TableHead className="font-black uppercase text-[10px]">Owner Name</TableHead>
                <TableHead className="w-[130px] font-black uppercase text-[10px]">Collection Date</TableHead>
                <TableHead className="w-[100px] font-black uppercase text-[10px] text-center">Collected</TableHead>
                <TableHead className="w-[150px] font-black uppercase text-[10px]">Waste Amount (KG)</TableHead>
                <TableHead className="w-[100px] font-black uppercase text-[10px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {households.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No households found. Click "Add Household" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                households.map((household, index) => (
                  <TableRow key={household.firestoreId || household.id} className="border-b hover:bg-muted/20">
                    <TableCell className="font-mono text-xs font-bold">{household.houseId}</TableCell>
                    <TableCell className="font-medium">{household.ownerName}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {household.collectionDate ? format(new Date(household.collectionDate), 'dd/MM/yyyy') : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={household.collected} 
                        onCheckedChange={(checked) => handleCheckboxChange(index, checked as boolean)}
                        disabled={isSaving}
                        aria-label="Mark as collected"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={household.wasteAmount || ''}
                        onChange={(e) => handleWasteAmountChange(index, parseFloat(e.target.value) || 0)}
                        placeholder="0.0"
                        className="w-24 h-8 text-sm"
                        step="0.1"
                        min="0"
                        disabled={isSaving}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(household)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteHousehold(household)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Section */}
        {households.length > 0 && (
          <div className="p-4 bg-primary/5 rounded-lg border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs font-black text-muted-foreground uppercase">Total Households</p>
                <p className="text-2xl font-black">{households.length}</p>
              </div>
              <div>
                <p className="text-xs font-black text-muted-foreground uppercase">Completed</p>
                <p className="text-2xl font-black text-green-600">{collectedCount}</p>
              </div>
              <div>
                <p className="text-xs font-black text-muted-foreground uppercase">Pending</p>
                <p className="text-2xl font-black text-orange-600">{households.length - collectedCount}</p>
              </div>
              <div>
                <p className="text-xs font-black text-muted-foreground uppercase">Total Waste</p>
                <p className="text-2xl font-black text-primary">{totalWasteCollected.toFixed(1)} KG</p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-black uppercase tracking-tight">
                {editingHousehold ? 'Edit Household' : 'Add New Household'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="houseId" className="font-black text-xs uppercase">
                  House ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="houseId"
                  value={formData.houseId}
                  onChange={(e) => setFormData({ ...formData, houseId: e.target.value })}
                  placeholder="e.g., H001, H002"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName" className="font-black text-xs uppercase">
                  Owner Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="Enter owner's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteAmount" className="font-black text-xs uppercase">
                  Waste Amount (KG)
                </Label>
                <Input
                  id="wasteAmount"
                  type="number"
                  value={formData.wasteAmount}
                  onChange={(e) => setFormData({ ...formData, wasteAmount: e.target.value })}
                  placeholder="0.0"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={editingHousehold ? handleEditHousehold : handleAddHousehold}
                disabled={isSaving || !formData.houseId || !formData.ownerName}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingHousehold ? 'Update' : 'Add'} Household
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function HouseholdCollectionPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center animate-pulse">Loading household collection data...</div>}>
      <HouseholdCollectionContent />
    </Suspense>
  );
}