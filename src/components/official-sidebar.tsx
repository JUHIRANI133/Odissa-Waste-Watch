'use client';

import {
  FileCheck,
  Home,
  Users,
  BarChart,
  LayoutGrid,
  LayoutDashboard,
  Map,
  Atom,
  Navigation,
  ClipboardList,
  TableProperties,
  MailWarning,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { OdishaLogo } from '@/components/odisha-logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export function OfficialSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const district = searchParams.get('district');
  const block = searchParams.get('block');

  const getHref = (baseHref: string) => {
    const params = new URLSearchParams();
    if (role) params.set('role', role);
    if (district) params.set('district', district);
    if (block) params.set('block', block);
    return `${baseHref}?${params.toString()}`;
  }

  const navItems = [
    { href: '/official/block-dashboard', icon: LayoutDashboard, label: 'Block Dashboard', role: 'block' },
    { href: '/official/block-waste-details', icon: Calculator, label: 'Waste Details', role: 'block' },
    { href: '/official/dashboard', icon: Home, label: 'Overview Dashboard', role: 'district' },
    { href: '/official/waste-details', icon: Calculator, label: 'Waste Details', role: 'district' },
    { href: '/official/steering-committee', icon: Users, label: 'Steering Committee Status' },
    { href: '/official/gp-information', icon: TableProperties, label: 'Information about GPs' },
    { href: '/official', icon: FileCheck, label: 'Approval Dashboard' },
    { href: '/official/personnel-details', icon: Navigation, label: 'Route & Worker Roster', role: 'block' },
    { href: '/official/personnel-requests', icon: MailWarning, label: 'Personnel Request and Complaints from GP', role: 'block' },
    { href: '/official/route-planning', icon: Navigation, label: 'District Route Planning', role: 'district' },
    { href: '/official/waste-collection-details', icon: ClipboardList, label: 'Waste Collection Details' },
    { href: '/official/district-overview', icon: LayoutGrid, label: 'Block/GP Deep Dive', role: 'district' },
    { href: '/official/structure-map', icon: Map, label: 'District Structure Map', role: 'district' },
    { href: '/official/block-structure-map', icon: Atom, label: 'Block Structure Map', role: 'block' },
    { href: '/official/graphs', icon: BarChart, label: 'Graphs' },
  ];

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <Link href={getHref(role === 'block' ? '/official/block-dashboard' : '/official')} className="flex items-center gap-2 font-semibold">
          <OdishaLogo className="h-8 w-8" />
          <span className="text-lg font-headline">Official Portal</span>
        </Link>
         <Badge variant={role === 'block' ? 'default' : 'secondary'}>{district || block || (role === 'block' ? 'Block' : 'District')}</Badge>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          {navItems.filter(item => !item.role || item.role === role).map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={getHref(href)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname.split('?')[0] === href && 'bg-muted text-primary'
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
