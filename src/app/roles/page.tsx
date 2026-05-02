import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OdishaLogo } from '@/components/odisha-logo';
import { Shield, User, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    name: 'State(Admin)',
    description: 'For officials with full access to monitor and manage the system.',
    icon: <Shield className="h-10 w-10 text-primary" />,
    href: '/login/admin',
    cta: 'Admin Login',
  },
  {
    name: 'Officials',
    description: 'For Block, District, and ULB representatives to manage and approve data.',
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    href: '/login/official',
    cta: 'Official Login',
  },
  {
    name: 'Driver / Transport Personnel',
    description: 'For transport personnel responsible for waste collection and invoicing.',
    icon: <User className="h-10 w-10 text-primary" />,
    href: '/login/civilian',
    cta: 'Driver Login',
  },
  {
    name: 'Gram Panchayat (GP)',
    description: 'For Gram Panchayat officials to manage local data and submit reports.',
    icon: <Building className="h-10 w-10 text-primary" />,
    href: '/login/gp-ulb',
    cta: 'GP Login',
  },
];

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      <div className="text-center mb-12">
        <Link href="/" className="inline-block mb-4">
          <OdishaLogo className="h-16 w-16" />
        </Link>
        <h1 className="text-4xl font-headline font-bold">Select Your Role</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Choose the appropriate portal to access your dashboard and manage waste data effectively.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {roles.map((role) => (
          <Card
            key={role.name}
            className="flex flex-col text-center items-center justify-between p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <CardHeader className="items-center">
              {role.icon}
              <CardTitle className="mt-4 text-2xl font-headline">{role.name}</CardTitle>
              <CardDescription className="mt-2 min-h-[60px]">{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full mt-4">
              <Button asChild className="w-full">
                <Link href={role.href}>
                  {role.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button variant="link" asChild>
          <Link href="/">← Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
