'use client';

import { GpUlbSidebar } from '@/components/gp-ulb-sidebar';
import { PortalLayoutWrapper } from '@/components/portal-layout-wrapper';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function GpUlbLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [year, setYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
      setYear(new Date().getFullYear());
    }, []);
    
    const nameParam = searchParams.get('name');
    const roleParam = searchParams.get('role');
    const gpParam = searchParams.get('gp');
    const ulbParam = searchParams.get('ulb');

    let profileName = 'Official';
    let roleName = 'User';

    if (roleParam === 'ulb') {
        profileName = nameParam || 'ULB Official';
        roleName = `ULB Official (${ulbParam})`;
    } else if (roleParam === 'gp') {
        profileName = nameParam || 'GP Official';
        roleName = `GP Official (${gpParam})`;
    }

    const handleLogout = () => {
        router.push('/roles');
    };

    return (
        <PortalLayoutWrapper sidebarContent={<GpUlbSidebar />} title="GP/ULB Portal">
            <div className="flex flex-col min-h-screen">
                {/* Header - Only visible on desktop */}
                <div className="hidden lg:flex sticky top-0 z-40 h-16 items-center justify-end border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <User className="h-9 w-9 p-1.5 rounded-full bg-muted text-muted-foreground" />
                            <div className="text-sm">
                                <p className="font-semibold">Welcome, {profileName.split('(')[0].trim()}</p>
                                <p className="text-muted-foreground capitalize">{roleName}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="icon" onClick={handleLogout} title="Logout">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                
                {/* Main Content - Removed overflow-x-auto to allow natural fit */}
                <main className="flex-1">
                    <div className="w-full max-w-full overflow-x-auto lg:overflow-x-visible">
                        {children}
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground mt-auto shrink-0">
                    <p>&copy; {year} Government of Odisha. All Rights Reserved.</p>
                </footer>
            </div>
        </PortalLayoutWrapper>
    );
}

export default function GpUlbLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <GpUlbLayoutContent>{children}</GpUlbLayoutContent>
        </Suspense>
    );
}