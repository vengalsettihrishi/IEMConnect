'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated gradient background with mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-sky-600 to-blue-900"></div>
      
      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.4),transparent_40%)]" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.3),transparent_50%)]" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-sky-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-1/4 w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-cyan-200/50 rounded-full animate-bounce" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-200/40 rounded-full animate-bounce" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-sky-300/50 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-300/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 border-2 border-cyan-300/10 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 right-40 w-16 h-16 border border-sky-300/20 rounded-full" style={{animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'}}></div>
        
        {/* Floating icons */}
        <div className="absolute top-32 left-20 opacity-20 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}>
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div className="absolute bottom-24 right-32 opacity-15 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
          <svg className="w-16 h-16 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10 animate-pulse">
          <svg className="w-20 h-20 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Main split box */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Welcome message above the box */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-3">
            Create an account
          </h1>
          <p className="text-sky-100 text-lg font-medium">
            Join the IEM UTM Student Section today!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          {/* Left side - Image */}
          <div className="relative hidden md:block">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/BackgroundIEM.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-900/80 backdrop-blur-[2px]"></div>
            </div>
            <div className="relative h-full flex flex-col justify-center items-center p-12 text-white">
              <div className="mb-8">
                <img
                  src="/iem-logo.jpg"
                  alt="IEM Logo"
                  className="w-24 h-24 object-contain mx-auto rounded-xl bg-white/10 p-3 backdrop-blur-md"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center">Join IEM Connect</h2>
              <p className="text-sky-100 text-center leading-relaxed">
                Institution of Engineers Malaysia<br />
                UTM Student Section
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "✓ Verified Members Only",
                  "✓ Secure Registration",
                  "✓ Admin Approval Process",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Register Form */}
          <div className="p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Started
              </h2>
              <p className="text-gray-600">
                Fill in your details to register
              </p>
            </div>

            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Login
                </a>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Registration will be reviewed and verified by Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

