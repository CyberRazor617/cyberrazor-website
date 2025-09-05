"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically authenticate the user
      console.log("Login attempt:", formData)
      
      // Redirect to dashboard or home page
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login error:", error)
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Focus the email input when component mounts
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  return (
    <div className={cn("min-h-screen bg-black text-white relative overflow-hidden", orbitron.variable)}>
      {/* Wave Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#wave1)"
          />
          <path
            d="M0,600 Q400,300 800,600 T1200,600 L1200,800 L0,800 Z"
            fill="url(#wave2)"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/logo.jpg"
                alt="CYBERRAZOR Logo"
                width={28}
                height={28}
                className="rounded-lg sm:w-8 sm:h-8"
              />
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] px-4 py-6 sm:py-0">
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-2 sm:space-y-3">
            <CardTitle className="text-lg sm:text-xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm sm:text-base">
              Access your CYBERRAZOR dashboard
            </CardDescription>
            <div className="mt-2">
              <Link href="/signup">
                <Button variant="link" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
                  Don't have an account? Sign up
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm sm:text-base">
                  Email Address
                </Label>
                <Input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300 text-sm sm:text-base">
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 pr-10 backdrop-blur-sm text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded border-blue-500/30 bg-slate-800/50 text-blue-500 focus:ring-blue-400"
                />
                <Label htmlFor="remember" className="text-slate-300 text-xs sm:text-sm">
                  Remember me
                </Label>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2 sm:gap-3">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-2.5 transition-all duration-200 shadow-lg border border-gray-600 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-center text-slate-400 text-xs sm:text-sm">
              Want to secure your data?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                Signup here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}