"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky px-6 py-0 flex absolute top-0 left-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="flex justify-between w-full h-14 items-center">
        
        {/* LEFT SIDE (Logo) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">IEM Connect</span>
          </Link>
        </div>

        {/* RIGHT SIDE (Login/Register) */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

      </div>
    </header>
  );
}
