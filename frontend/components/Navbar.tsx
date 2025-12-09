"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="w-full flex h-20 items-center px-6 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/iem-logo.jpg"
              alt="IEM Logo"
              width={48}
              height={48}
              className="rounded"
            />
            <span className="font-bold text-2xl">IEM Connect</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="lg" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
