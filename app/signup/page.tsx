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
import { Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Orbitron } from "next/font/google"
import { toast, ToastContainer } from 'react-toastify'
import { config } from "@/lib/config"
import 'react-toastify/dist/ReactToastify.css'

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const firstNameInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Calculate password strength
    if (name === "password") {
      const strength = calculatePasswordStrength(value)
      setPasswordStrength(strength)
    }
  }

  const generateUsername = (first: string, last: string, email: string) => {
    const base = `${first}${last ? '_' + last : ''}`.toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 50)

    if (base && base.length >= 3) return base

    const emailLocal = (email.split('@')[0] || '').toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 50)

    return emailLocal && emailLocal.length >= 3 ? emailLocal : `user_${Date.now()}`
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500"
    if (strength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return "Weak"
    if (strength <= 3) return "Medium"
    return "Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      // Enforce backend password policy: at least 6 chars, 1 lower, 1 upper, 1 number
      const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
      if (!passwordPolicy.test(formData.password)) {
        toast.error("Password must be 6+ chars and include lowercase, uppercase, and a number.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      // Validate password strength
      if (passwordStrength < 3) {
        toast.error("Password is too weak. Please use a stronger password.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        return
      }

      // Call the signup API (backend)
      const response = await fetch(`${config.backendUrl}${config.api.auth.signup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: generateUsername(formData.firstName, formData.lastName, formData.email),
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const validationMsg = Array.isArray(data?.details) && data.details.length
          ? data.details[0]?.msg || data.details[0]?.message
          : data?.message || 'Failed to create account'
        throw new Error(validationMsg)
      }

      setSuccess(true)
      
      toast.success(data.message || "Account created successfully! Redirecting to login...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
      
    } catch (error) {
      console.error("Signup error:", error)
      const errorMessage = typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined
      toast.error(errorMessage || "Failed to create account. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Focus the first name input when component mounts
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus()
    }
  }, [])

  return (
    <div className={cn("min-h-screen bg-black text-white relative overflow-hidden", orbitron.variable)}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] px-4 py-6 sm:py-8">
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-3 sm:space-y-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm sm:text-base">
              Join CYBERRAZOR and secure your digital world
            </CardDescription>
            <div className="mt-2">
              <Link href="/login">
                <Button variant="link" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
                  Already have an account? Sign in
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

            {success && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  <p className="text-green-400 text-xs sm:text-sm text-center">
                    Account created successfully! Redirecting...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300 text-sm sm:text-base">
                    First Name
                  </Label>
                  <Input
                    ref={firstNameInputRef}
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300 text-sm sm:text-base">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-sm sm:text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-300 text-sm sm:text-base">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
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
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 2 ? "text-red-400" :
                        passwordStrength <= 3 ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 sm:h-1.5">
                      <div
                        className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300 text-sm sm:text-base">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 pr-10 backdrop-blur-sm text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                  className="mt-1 rounded border-blue-500/30 bg-slate-800/50 text-blue-500 focus:ring-blue-400"
                />
                <Label htmlFor="terms" className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2 sm:gap-3">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !acceptedTerms || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-2.5 transition-all duration-200 shadow-lg border border-gray-600 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
            <p className="text-center text-slate-400 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}