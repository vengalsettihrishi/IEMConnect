'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-background">IC</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">IEM Connect</h1>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90 text-background"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Welcome Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-3xl text-foreground">Welcome, {user.name}!</CardTitle>
              <CardDescription className="text-muted-foreground">Your account is fully authenticated and secure</CardDescription>
            </CardHeader>
          </Card>

          {/* User Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="text-lg font-medium text-foreground">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-medium text-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="text-lg font-medium text-foreground capitalize">{user.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Membership Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Membership Number</p>
                  <p className="text-lg font-medium text-foreground">{user.membership_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Security Status</p>
                  <p className="text-lg font-medium text-accent">✓ 2FA Verified</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Security Information</CardTitle>
              <CardDescription className="text-muted-foreground">Your account is protected with two-factor authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm text-accent">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-muted-foreground">Active and protecting your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-sm text-accent">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Secure Login</p>
                    <p className="text-sm text-muted-foreground">Your session is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
