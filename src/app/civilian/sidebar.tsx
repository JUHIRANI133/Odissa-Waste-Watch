'use client';

import {
  Calendar,
  Clock,
  FileText,
  HelpCircle,
  Home,
  PieChart,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { OdishaLogo } from '@/components/odisha-logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const navItems = [
  { href: '/civilian', icon: Home, label: 'Activities' },
  { href: '/civilian/schedule', icon: Clock, label: 'Schedule' },
  { href: '/civilian/waste-receipt-details', icon: FileText, label: 'Waste Receipt Details' },
  { href: '/civilian/waste-collected', icon: PieChart, label: 'Waste Collected' },
  { href: '/civilian/request-query', icon: HelpCircle, label: 'Request/Query' },
  { href: '/civilian/history', icon: Calendar, label: 'History' },
  { href: '/civilian/profile', icon: User, label: 'Profile' },
];

export function CivilianSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/civilian" className="flex items-center gap-2 font-semibold">
          <OdishaLogo className="h-8 w-8" />
          <span className="text-lg font-headline">Driver Panel</span>
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
              {label}
            </Link>
          ))}
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
