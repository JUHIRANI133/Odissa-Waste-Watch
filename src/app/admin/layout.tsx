'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { PortalLayoutWrapper } from '@/components/portal-layout-wrapper';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleLogout = () => {
    router.push('/roles');
  };

  return (
    <PortalLayoutWrapper sidebarContent={<AdminSidebar />} title="Admin Portal">
      <div className="flex flex-col min-h-screen">
        {/* Header - Only visible on desktop */}
        <div className="hidden lg:flex sticky top-0 z-40 h-16 items-center justify-end border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <User className="h-9 w-9 p-1.5 rounded-full bg-muted text-muted-foreground" />
              <div className="text-sm">
                <p className="font-semibold">State Admin</p>
                <p className="text-muted-foreground capitalize">Admin</p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Header Content - Desktop header hidden on mobile, mobile header already in wrapper */}
        <div className="lg:hidden">
          {/* Mobile header is handled by PortalLayoutWrapper */}
        </div>
        
        {/* Main Content - Removed overflow-x-auto to allow natural fit */}
        <main className="flex-1">
          <div className="w-full max-w-full overflow-x-auto lg:overflow-x-visible">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground mt-auto shrink-0">
          <p>&copy; {currentYear} Government of Odisha. All Rights Reserved.</p>
        </footer>
      </div>
    </PortalLayoutWrapper>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutContent>{children}</AdminLayoutContent>
  );
}