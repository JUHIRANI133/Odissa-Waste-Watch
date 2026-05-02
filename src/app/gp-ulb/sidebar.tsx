'use client';

import {
  Home,
  FileText,
  User,
  Users,
  HomeIcon,
  Map,
  Truck,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { OdishaLogo } from '@/components/odisha-logo';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function GpUlbSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const gp = searchParams.get('gp') || '';
  const ulb = searchParams.get('ulb') || '';
  const district = searchParams.get('district') || '';
  const block = searchParams.get('block') || '';

  // Helper function to preserve all query parameters
  const getHref = (baseHref: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${baseHref}?${params.toString()}`;
  }

  // Get the correct waste details path based on role
  const getWasteDetailsHref = () => {
    if (role === 'ulb' && ulb) {
      return `/gp-ulb/ulb-waste-details?ulb=${ulb}&district=${district}&role=ulb`;
    } else if (role === 'gp' && gp) {
      return `/gp-ulb/gp-waste-details?gp=${gp}&district=${district}&block=${block}&role=gp`;
    }
    return getHref('/gp-ulb');
  };

  // Get dashboard href with preserved params
  const getDashboardHref = () => {
    return getHref('/gp-ulb');
  };

  // Get other hrefs
  const getHouseholdHref = () => getHref('/gp-ulb/household-collection');
  const getVehicleRouteHref = () => getHref('/gp-ulb/vehicle-route');
  const getDriverDetailsHref = () => getHref('/gp-ulb/driver-details');
  const getWasteReceiptHref = () => getHref('/gp-ulb/waste-receipt-details');
  const getMonthlyReportingHref = () => getHref('/gp-ulb/monthly-reporting');
  const getPersonalDetailsHref = () => getHref('/gp-ulb/personal-details');

  // Dynamic nav items based on role
  const getNavItems = () => {
    const items = [
      { href: getDashboardHref(), icon: Home, label: 'Dashboard', exact: true },
      { href: getWasteDetailsHref(), icon: Calculator, label: 'Waste Details', exact: false },
    ];
    
    if (role === 'gp') {
      items.push(
        { href: getHouseholdHref(), icon: HomeIcon, label: 'Household Data', exact: false },
        { href: getVehicleRouteHref(), icon: Map, label: 'Vehicle Route', exact: false }
      );
    }
    
    if (role === 'ulb') {
      items.push(
        { href: getDriverDetailsHref(), icon: Truck, label: 'Driver & Sanitation Worker Details', exact: false }
      );
    }
    
    items.push(
      { href: getWasteReceiptHref(), icon: FileText, label: 'Waste Receipt Details', exact: false },
      { href: getMonthlyReportingHref(), icon: FileText, label: 'Monthly Reporting', exact: false },
      { href: getPersonalDetailsHref(), icon: User, label: 'Personal Details', exact: false }
    );
    
    return items;
  };

  // Check if a path is active
  const isActive = (itemHref: string, exact: boolean = false) => {
    const pathOnly = itemHref.split('?')[0];
    if (exact) {
      return pathname === pathOnly;
    }
    // For waste details, check both possible paths
    if (pathOnly === '/gp-ulb/ulb-waste-details' || pathOnly === '/gp-ulb/gp-waste-details') {
      return pathname === '/gp-ulb/ulb-waste-details' || pathname === '/gp-ulb/gp-waste-details';
    }
    return pathname === pathOnly;
  };

  const navItems = getNavItems();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <Link href={getDashboardHref()} className="flex items-center gap-2 font-semibold">
          <OdishaLogo className="h-8 w-8" />
          <span className="text-lg font-headline">Portal</span>
        </Link>
        <Badge variant={role === 'gp' ? 'default' : 'secondary'}>{gp || ulb || role?.toUpperCase() || 'PORTAL'}</Badge>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          {navItems.map(({ href, icon: Icon, label, exact }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                isActive(href, exact) && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Separator className="my-2" />
          <Link
            href="/roles"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            )}
          >
            <Users className="h-4 w-4" />
            Back to Role Selection
          </Link>
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 lg:flex">
      {content}
    </aside>
  );
}