'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { jharsugudaDistrictData } from "@/lib/disJharsuguda";
import { jajpurDistrictData } from "@/lib/disJajpur";
import { bhadrakDistrictData } from "@/lib/disBhadrak";
import { bargarhDistrictData } from "@/lib/disBargarh";
import { angulDistrictData } from "@/lib/disAngul";
import { balangirDistrictData } from "@/lib/disBalangir";
import { mrfData } from "@/lib/mrf-data";

type DriverStatus = "Working" | "On Leave" | "Maintenance";

function DriverDetailsContent() {
    const searchParams = useSearchParams();
    const ulbName = searchParams.get('ulb');
    const districtNameParam = searchParams.get('district');

    const districtName = useMemo(() => {
        if (districtNameParam) return districtNameParam;
        if (ulbName) {
            const found = mrfData.find(m => m.ulbName.toLowerCase() === ulbName.toLowerCase());
            return found?.district || 'Bhadrak';
        }
        return 'Bhadrak';
    }, [districtNameParam, ulbName]);

    const { driversList, workersList } = useMemo(() => {
        if (!ulbName || !districtName) return { driversList: [], workersList: [] };

        let source = null;
        const d = districtName.toLowerCase();
        if (d === 'jajpur') source = jajpurDistrictData;
        else if (d === 'bhadrak') source = bhadrakDistrictData;
        else if (d === 'jharsuguda') source = jharsugudaDistrictData;
        else if (d === 'bargarh') source = bargarhDistrictData;
        else if (d === 'angul') source = angulDistrictData;
        else if (d === 'balangir') source = balangirDistrictData;

        if (!source) return { driversList: [], workersList: [] };

        // Filter schedules by ULB to find assigned drivers
        const ulbSchedules = source.data.collectionSchedules.filter((s: any) => 
            s.ulb.toLowerCase().includes(ulbName.toLowerCase()) || 
            ulbName.toLowerCase().includes(s.ulb.toLowerCase())
        );

        const drivers = ulbSchedules.map((s: any, idx: number) => ({
            id: `DRV-${idx + 1}`,
            name: s.driverName !== '-' ? s.driverName : 'Verified Personnel',
            vehicleNo: s.vehicleNo !== '-' ? s.vehicleNo : 'TBD',
            vehicleType: s.vehicleType,
            assignedGP: s.gpName,
            status: "Working" as DriverStatus,
        }));

        // Filter routes to find assigned workers
        const ulbRoutes = source.data.routes.filter((r: any) => 
            r.destination.toLowerCase().includes(ulbName.toLowerCase()) || 
            ulbName.toLowerCase().includes(r.destination.toLowerCase())
        );

        const workers = ulbRoutes.flatMap((r: any) => 
            (r.workers || []).map((w: any, idx: number) => ({
                id: `W-${idx + 1}`,
                name: w.name,
                associatedGPs: r.startingGp,
                status: "Working",
                attendance: 28,
                dailyWage: 350,
            }))
        );

        return { driversList: drivers, workersList: workers };
    }, [ulbName, districtName]);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Working": return "default";
            case "On Leave": return "secondary";
            case "Maintenance": return "destructive";
            default: return "outline";
        }
    }

  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Driver & Vehicle Status: {ulbName}</CardTitle>
            <CardDescription>Verified collection personnel currently active in the district circuits targeting your ULB.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Driver</TableHead>
                        <TableHead>Vehicle No.</TableHead>
                        <TableHead>Vehicle Type</TableHead>
                        <TableHead>Assigned Cluster</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {driversList.map((driver, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-bold">{driver.name}</TableCell>
                            <TableCell className="font-mono">{driver.vehicleNo}</TableCell>
                            <TableCell className="text-xs uppercase">{driver.vehicleType}</TableCell>
                            <TableCell className="text-xs">{driver.assignedGP}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(driver.status)}>
                                    {driver.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    {driversList.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground italic">No driver records found for this ULB node.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Assigned Sanitation Workers</CardTitle>
                <CardDescription>Personnel roster mapped to logistical paths ending at your facility.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Worker Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Primary GP</TableHead>
                            <TableHead>Attendance (days)</TableHead>
                            <TableHead>Salary (INR)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workersList.map((worker, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{worker.name}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(worker.status)}>
                                        {worker.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs">{worker.associatedGPs}</TableCell>
                                <TableCell className="font-mono">{worker.attendance}</TableCell>
                                <TableCell className="font-bold">{(worker.attendance * worker.dailyWage).toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        ))}
                        {workersList.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground italic">No worker rosters currently assigned to your logistical paths.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

export default function UlbDriverDetailsPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center animate-pulse">Syncing personnel registry...</div>}>
            <DriverDetailsContent />
        </Suspense>
    )
}