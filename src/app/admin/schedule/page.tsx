
'use client';
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const dailyPlan = [
    {
        route: "Route 1: Coastal Block",
        driver: "Ramesh Kumar",
        vehicle: "OD-02-AB-1234 (Tata Ace)",
        gps: "Gobindpur, Ramapur, Sreerampur",
        wasteEst: "3.5 Tons",
        wasteTypes: "Plastic (40%), Organic (50%), Other (10%)"
    },
    {
        route: "Route 2: Northern Block",
        driver: "Suresh Singh",
        vehicle: "OD-05-CD-5678 (Tractor)",
        gps: "Madhapur, Ratagarh, Kalyanpur",
        wasteEst: "2.8 Tons",
        wasteTypes: "Plastic (30%), Organic (60%), Other (10%)"
    },
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Schedule / Planner</h1>
          <p className="text-muted-foreground">Define routes, allocate vehicles, and estimate waste collection.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="mr-2"/>
                Export PDF
            </Button>
            <Button>
                <PlusCircle className="mr-2"/>
                New Plan
            </Button>
        </div>
      </div>
      
      <Tabs defaultValue="day">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Plan - {currentDate || "..."}</CardTitle>
                    <CardDescription>Detailed route and vehicle allocation for today's collection.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Route</TableHead>
                            <TableHead>Driver & Vehicle</TableHead>
                            <TableHead>GPs</TableHead>
                            <TableHead>Est. Waste</TableHead>
                            <TableHead>Waste Types</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dailyPlan.map((plan, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{plan.route}</TableCell>
                                    <TableCell>{plan.driver} <br/> <span className="text-muted-foreground text-xs">{plan.vehicle}</span></TableCell>
                                    <TableCell>{plan.gps}</TableCell>
                                    <TableCell>{plan.wasteEst}</TableCell>
                                    <TableCell className="text-xs">{plan.wasteTypes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="week">
          <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <p>Weekly planner with aggregated data will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="month">
          <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <p>Monthly planner with charts for trends and forecasting will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
