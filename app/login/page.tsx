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
import { config } from "@/lib/config"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Orbitron } from "next/font/google"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      // Call the login API (backend)
      const response = await fetch(`${config.backendUrl}${config.api.auth.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle different error types
        if (data.status === 'pending') {
          setError("Your account is still under review. You will receive an email once your account is approved.")
        } else if (data.status === 'rejected') {
          setError("Your account application has been rejected. Please contact support.")
        } else if (data.status === 'inactive') {
          setError("Your account has been deactivated. Please contact support.")
        } else {
          setError(data.message || "Invalid credentials. Please try again.")
        }
        return
      }

      // Store the token locally (for same-origin flows)
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      
      // Redirect to user portal with token for cross-origin localStorage
      const redirectUrl = `${config.userPortalUrl}?token=${encodeURIComponent(data.access_token)}`
      window.location.href = redirectUrl
      
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to login. Please try again.")
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

      {/* Navbar */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
            items={[
              { name: "Home", link: "/" },
              { name: "About", link: "/#about" },
              { name: "Services", link: "/#services" },
              { name: "Pricing", link: "/#pricing" },
              { name: "Contact", link: "/#contact" },
            ]} 
            onItemClick={() => {
              // Handle navigation if needed
            }}
          />
          <div className="flex items-center relative z-[70]">
            {/* No additional buttons needed on login page */}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/#about" },
              { name: "Services", link: "/#services" },
              { name: "Pricing", link: "/#pricing" },
              { name: "Contact", link: "/#contact" },
            ].map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 text-base sm:text-lg py-2 sm:py-3 px-2 sm:px-4 rounded-lg hover:bg-gray-100/10 dark:hover:bg-gray-800/10 transition-colors"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

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
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
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
              disabled={isLoading || !rememberMe || !formData.email || !formData.password}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-2.5 transition-all duration-200 shadow-lg border border-gray-600 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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