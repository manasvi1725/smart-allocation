'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const rolePath: { [key: string]: string } = {
        'volunteer': '/volunteer-dashboard',
        'ngo': '/ngo-dashboard',
        'user': '/user-dashboard',
      };
      router.push(rolePath[user?.role || 'user']);
    }
  }, [isAuthenticated, user?.role, router]);

  return null;
}
