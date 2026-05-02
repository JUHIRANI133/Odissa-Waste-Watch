 'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { OdishaLogo } from '@/components/odisha-logo';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAllowedEmail } from '@/lib/auth/auth';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic field validation
    if (!name || !email || !password) {
      toast({
        title: 'Information Required',
        description: 'Please enter your name, official email, and password.',
        variant: 'destructive'
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Invalid Email Format',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    // Email allowlist check - using 'admin' portal
    if (!isAllowedEmail(email, 'admin')) {
      toast({
        title: 'Invalid Email',
        description: 'Access denied. This email is not authorized for Admin login. Only specific admin emails are allowed.',
        variant: 'destructive'
      });
      return;
    }

    // Password minimum length check
    if (password.length < 6) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: 'Welcome Back',
        description: `Successfully authenticated as ${name}. Accessing State Dashboard.`,
        variant: 'default'
      });
      
      router.push('/admin');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary/50 to-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <OdishaLogo className="h-16 w-16 mx-auto hover:scale-105 transition-transform duration-300" />
          </Link>
          <div>
            <CardTitle className="text-3xl font-headline font-black uppercase tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              State Admin Login
            </CardTitle>
            <CardDescription className="font-medium mt-2 text-muted-foreground">
              Enter your administrative credentials for state-wide monitoring and control.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
              >
                <span>Full Name</span>
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 font-medium border-2 border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
              >
                <span>Official Email Address</span>
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@odisha.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 font-medium border-2 border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                disabled={isLoading}
              />
              <p className="text-[10px] text-muted-foreground font-medium">
                Only authorized admin emails are permitted. Please use your official government email address.
              </p>
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
              >
                <span>Access Password</span>
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 font-medium border-2 border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                disabled={isLoading}
              />
              <p className="text-[10px] text-muted-foreground font-medium">
                Minimum 6 characters required.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-black uppercase tracking-widest shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Authenticating...
                </>
              ) : (
                'Access State Dashboard'
              )}
            </Button>

            {/* Demo credentials hint - remove in production */}
            <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-dashed border-primary/20">
              <p className="text-[9px] font-mono text-center text-muted-foreground uppercase tracking-wider">
                Demo Credentials: Authorized admin emails only | Password: min 6 chars
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button
          variant="ghost"
          asChild
          className="text-muted-foreground hover:text-primary font-bold transition-all duration-200 hover:scale-105"
        >
          <Link href="/roles" className="flex items-center gap-2">
            ← Back to Role Selection Portal
          </Link>
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">
          Secured Admin Gateway • Odisha Waste Management System
        </p>
      </div>
    </div>
  );
}
