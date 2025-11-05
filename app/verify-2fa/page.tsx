'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Verify2FAForm from '@/components/Verify2FAForm';

export default function Verify2FAPage() {
  const router = useRouter();
  const { tempToken, token } = useAuth();

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    } else if (!tempToken) {
      router.push('/login');
    }
  }, [tempToken, token, router]);

  if (!tempToken) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-background">IC</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">IEM Connect</h1>
        </div>

        {/* 2FA Verification Form */}
        <Verify2FAForm />
      </div>
    </div>
  );
}
