'use client';

import {
  Calendar,
  Clock,
  FileText,
  HelpCircle,
  Home,
  User,
  Users,
  Database,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { OdishaLogo } from '@/components/odisha-logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/civilian', icon: Home, label: 'Activities' },
  { href: '/civilian/schedule', icon: Clock, label: 'Route Schedule' },
  { href: '/civilian/invoice-details', icon: FileText, label: 'Waste Receipt Generation' },
  { href: '/civilian/waste-details', icon: Database, label: 'Waste Details' },
  { href: '/civilian/request-query', icon: HelpCircle, label: 'Request/Query' },
  { href: '/civilian/history', icon: Calendar, label: 'Trip History' },
  { href: '/civilian/profile', icon: User, label: 'Driver Profile' },
];

export function CivilianSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getHref = (baseHref: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${baseHref}?${params.toString()}`;
  }

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href={getHref('/civilian')} className="flex items-center gap-2 font-semibold">
          <OdishaLogo className="h-8 w-8" />
          <span className="text-lg font-headline">Driver Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 py-4 text-sm font-medium lg:px-4">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={getHref(href)}
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