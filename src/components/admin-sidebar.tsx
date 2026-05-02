'use client';

import {
  Building,
  Calendar,
  FileText,
  Home,
  Navigation,
  Network,
  Truck,
  Users,
  Video,
  Warehouse,
  ClipboardList,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { OdishaLogo } from '@/components/odisha-logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/admin', icon: Home, label: 'Dashboard' },
  { href: '/admin/waste-details', icon: Calculator, label: 'Waste Details' },
  { href: '/admin/schedule-meeting', icon: Video, label: 'Steering Committee Meeting' },
  { href: '/admin/organization-structure', icon: Network, label: 'Organization Structure' },
  { href: '/admin/route-planning', icon: Navigation, label: 'Route Planning' },
  { href: '/admin/waste-collection-details', icon: ClipboardList, label: 'Waste Collection Details' },
  { href: '/admin/driver-details', icon: Truck, label: 'Driver Details' },
  { href: '/admin/gp-details', icon: Building, label: 'Information about MRFs and Associated GPs' },
  { href: '/admin/monthly-details', icon: FileText, label: 'Approved Reports' },
];

export function AdminSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <OdishaLogo className="h-8 w-8" />
          <span className="text-lg font-headline">Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{label}</span>
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