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
import Image from "next/image";
import { Calendar, QrCode, Award, Users, TrendingUp, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activities = [
    {
      image: "/activity1.jpeg",
      title: "Engineering Workshop",
      description: "Hands-on sessions building real-world engineering solutions."
    },
    {
      image: "/activity2.png",
      title: "Site Visit Experience",
      description: "On-site exploration of industry facilities and operations."
    },
    {
      image: "/activity3.jpg",
      title: "Technical Seminar",
      description: "Deep dives into emerging technologies and best practices."
    },
    {
      image: "/activity4.jpg",
      title: "Networking Event",
      description: "Connect with peers, mentors, and industry professionals."
    },
    {
      image: "/activity5.jpg",
      title: "Industry Talk",
      description: "Insights from leaders shaping the engineering landscape."
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activities.length, isHovered]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activities.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? activities.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => setIsFlipped(true), 3000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipped(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  useEffect(() => {
    setIsFlipped(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, [currentImageIndex]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/BackgroundIEM.jpg')" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-indigo-600/70 to-blue-900/80 backdrop-blur-sm"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10 max-w-full">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto gap-8">
              {/* Left side - Text content */}
              <div className="flex flex-col space-y-8 text-left flex-1 max-w-2xl">
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl">
                    IEM Connect
                    <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      Engineering Excellence
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                    Your all-in-one platform for event management, smart attendance tracking, 
                    and instant certificate generation — designed for the modern engineer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6">
                    <Link href="/register">Get Started →</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:bg-transparent active:bg-transparent backdrop-blur-md shadow-xl text-lg px-8 py-6 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40 hover:border-blue-200"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Auto-rotating image carousel with hover flip */}
              <div
                className="hidden lg:block relative w-[600px] h-[500px] flex-shrink-0 perspective-1000"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                  {activities.map((activity, index) => (
                    <div
                      key={activity.title}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.1,0.2,1)] transform-style-3d will-change-transform ${
                          isFlipped ? "rotate-y-180" : ""
                        }`}
                      >
                        {/* Front face */}
                        <div className="absolute inset-0 backface-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                            <p className="text-white font-semibold text-lg drop-shadow">{activity.title}</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Back face */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-blue-700/90 via-cyan-600/90 to-blue-500/90 text-white flex flex-col items-center justify-center px-6 text-center">
                          <h3 className="text-2xl font-bold mb-3">{activity.title}</h3>
                          <p className="text-white/90 leading-relaxed mb-4">{activity.description}</p>
                          <Button
                            variant="outline"
                            className="border-2 border-white text-white bg-transparent hover:bg-transparent hover:text-white active:bg-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40 hover:border-blue-200"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Left Arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                  
                  {/* Activity indicator dots */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    {activities.map((activity, index) => (
                      <button
                        key={activity.title}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to ${activity.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent"></div>
        </section>

        {/* About the Platform */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white/85 to-white/75 backdrop-blur-md">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Platform Features
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Everything you need to manage your engineering journey
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Browse and register for seminars, workshops, and site visits. 
                    Stay updated with all engineering events in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <QrCode className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Smart Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Hassle-free check-ins via QR codes or unique pins. 
                    Track your attendance automatically and effortlessly.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Digital Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Automated certificate generation and secure storage for your 
                    professional portfolio. Download anytime, anywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About IEM UTM */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white/75 to-white/85 backdrop-blur-md">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
                  Since 1959
                </div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  About IEM UTM
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Institution of Engineers Malaysia (IEM) was established in 1959. 
                  With over <span className="font-bold text-blue-600">30,000 members</span>, 
                  it is the primary qualifying body for professional engineers in Malaysia.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Join a legacy of excellence and innovation that has shaped Malaysia's engineering landscape for decades.
                </p>
              </div>
              <div className="grid gap-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-xl">Vision</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      To be the premier professional organization pivotal in achieving 
                      Malaysia's vision for technological advancement.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-50 to-white hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-cyan-600" />
                      <CardTitle className="text-xl">Mission</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Promote sound professional engineering practice, serve the needs of members, 
                      and contribute towards nation building through excellence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join IEM Student Chapter */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white/85 to-white/75 backdrop-blur-md">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Why Join IEM Student Chapter?
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Unlock exclusive benefits and opportunities for your engineering career
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Award, title: "Gain recognition for engineering experience" },
                { icon: Users, title: "Qualify for registration as a Professional Engineer" },
                { icon: Users, title: "Network with engineers in private/public sectors" },
                { icon: TrendingUp, title: "Professional development via talks and site visits" },
                { icon: Calendar, title: "Discounts for IEM UTM Student Section events" },
                { icon: BookOpen, title: "Subscription to the IEM Monthly bulletin (Jurutera)" },
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-4 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 leading-snug">
                      {benefit.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-center text-sm text-slate-300 md:text-left">
              © {new Date().getFullYear()} IEM UTM Student Section — Engineering the Future
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
