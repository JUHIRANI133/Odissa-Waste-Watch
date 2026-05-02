'use client';

import { CivilianSidebar } from '@/components/civilian-sidebar';
import { PortalLayoutWrapper } from '@/components/portal-layout-wrapper';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CivilianLayoutContent({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  const name = searchParams.get('name') || 'Personnel';
  const role = searchParams.get('role') || 'civilian';
  const block = searchParams.get('block') || '';
  
  const formatRoleLabel = (r: string) => {
    if (r === 'driver') return 'Driver';
    if (r === 'sanitation_worker') return 'Worker';
    if (r === 'nodal_gp') return 'GP Nodal';
    if (r === 'nodal_ulb') return 'ULB Nodal';
    return 'Personnel';
  };

  const handleLogout = () => {
    router.push('/login/civilian');
  };

  return (
    <PortalLayoutWrapper sidebarContent={<CivilianSidebar />} title="Personnel Portal">
      <div className="flex flex-col min-h-screen">
        {/* Header - Only visible on desktop */}
        <div className="hidden lg:flex sticky top-0 z-40 h-16 items-center justify-end border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <User className="h-9 w-9 p-1.5 rounded-full bg-muted text-muted-foreground border-2 border-primary/20" />
              <div className="text-sm">
                <p className="font-black uppercase tracking-tight text-foreground">{name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="default" className="text-[7px] h-3 px-1 font-black uppercase tracking-widest">{formatRoleLabel(role)}</Badge>
                  {block && <Badge variant="secondary" className="text-[8px] py-0 font-bold">{block}</Badge>}
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout} title="Logout" className="hover:bg-destructive hover:text-white transition-colors">
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

export default function CivilianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CivilianLayoutContent>{children}</CivilianLayoutContent>
    </Suspense>
  );
}