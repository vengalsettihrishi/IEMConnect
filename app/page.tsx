"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col p-4 w-full">
      {/* Top right buttons */}
      <div className="flex justify-end gap-4 w-full">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold">2FA Authentication System</h1>
          <p className="text-lg text-muted-foreground">Secure authentication with two-factor verification</p>
        </div>
      </div>
    </main>
  )
}
