'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const protectedRoutes = ['/admin', '/official', '/civilian', '/gp-ulb'];
  
  useEffect(() => {
    if (loading) return;

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!user && isProtectedRoute) {
        // Find which login page corresponds to the protected route
        const loginPath = pathname.split('/')[1];
        if(loginPath) {
             router.push(`/login/${loginPath}`);
        } else {
            router.push('/');
        }
    }
  }, [user, loading, pathname, router]);

  return { user, loading };
}
