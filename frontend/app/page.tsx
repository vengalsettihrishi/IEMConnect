"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">

  {/* Hero Section */}
  <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        IEM Connect: Streamlining Engineering Excellence
      </h1>
      <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
        The official platform for IEM UTM to track events, manage attendance, and generate certificates seamlessly.
      </p>
      <Button asChild size="lg" className="mt-6">
        <Link href="/register">Get Started</Link>
      </Button>
    </div>
  </section>





        {/* About the Platform */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
  <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
    <h2 className="text-3xl font-bold sm:text-5xl mb-12">About the Platform</h2>
    <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Browse and register for seminars, workshops, and site
                    visits.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Smart Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Hassle-free check-ins via QR codes or unique pins.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Digital Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automated certificate generation and storage for your
                    professional portfolio.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About IEM UTM */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
  <div className="max-w-5xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-2 items-center">
      
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
          About IEM UTM
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0">
          IEM (The Institution of Engineers Malaysia) was formed in 1959. 
          With over 30,000 members, it is a primary qualifying body for 
          professional engineers in Malaysia.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              To be the premier professional Organisation pivotal achieving Vision 2020.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              Promote sound professional engineering practice, service the needs 
              of members, and contribute towards nation building.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  </div>
</section>


        {/* Why Join IEM Student Chapter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
  <div className="mx-auto max-w-5xl px-4 md:px-6 text-center">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
      Why Join IEM Student Chapter?
    </h2>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-4xl text-left">
      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Gain recognition for engineering experience
        </h3>
      </div>

      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Qualify for registration as a Professional Engineer
        </h3>
      </div>

      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Network with engineers in private/public sectors
        </h3>
      </div>

      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Professional development via talks and site visits
        </h3>
      </div>

      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Discounts for IEM UTM Student Section events
        </h3>
      </div>

      <div className="flex items-start space-x-3">
        <div className="mt-1 rounded-full bg-blue-100 p-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        </div>
        <h3 className="font-medium">
          Subscription to the IEM Monthly bulletin (Jurutera)
        </h3>
      </div>
    </div>
  </div>
</section>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t">
  {/* Change container to max-w + mx-auto */}
  <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
      © {new Date().getFullYear()} IEM UTM Student Section — Engineering
      the Future
    </p>
    <div className="flex items-center space-x-4">
      <Link
        href="/terms"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Terms
      </Link>
      <Link
        href="/privacy"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Privacy
      </Link>
    </div>
  </div>
</footer>

    </div>
  );
}
