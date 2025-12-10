"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Check, AlertTriangle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import GlowingButton from "@/components/GlowingButton"

interface StripePaymentProps {
  amount?: number
  currency?: string
  plan?: string
  duration?: number
  onPaymentSuccess?: (sessionId: string) => void
  onPaymentError?: (error: string) => void
  className?: string
}

export default function StripePayment({
  amount = 200,
  currency = "USD",
  plan = "pro",
  duration = 30,
  onPaymentSuccess,
  onPaymentError,
  className
}: StripePaymentProps) {
  const [email, setEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handlePayment = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Create Stripe checkout session
      const response = await fetch('https://cyberrazorbackend.vercel.app/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          plan: plan,
          duration: duration,
        }),
      })

      const data = await response.json()

      if (data.success && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
        onPaymentSuccess?.(data.sessionId)
      } else {
        const errorMessage = data.message || "Failed to create checkout session"
        setError(errorMessage)
        onPaymentError?.(errorMessage)
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to connect to payment server"
      setError(errorMessage)
      onPaymentError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("bg-slate-900/50 border-blue-500/30", className)}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Stripe Payment
        </CardTitle>
        <CardDescription className="text-slate-300">
          Pay securely with credit card via Stripe
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Info */}
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Amount:</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              ${amount} {currency}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Plan:</span>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Duration:</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              {duration} days
            </Badge>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="bg-slate-800/50 border-slate-600 text-white"
            disabled={isLoading}
          />
          <p className="text-xs text-slate-400">
            Access token will be sent to this email
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <Check className="h-4 w-4" />
            <AlertDescription className="text-green-200">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Payment Button */}
        <GlowingButton
          onClick={handlePayment}
          disabled={isLoading || !email}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              Pay ${amount} with Stripe
            </>
          )}
        </GlowingButton>

        {/* Security Info */}
        <div className="bg-slate-800/50 rounded-lg p-3 border border-blue-500/20">
          <div className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1 text-xs text-slate-300">
              <p>✓ Secure payment processing by Stripe</p>
              <p>✓ Your card details are never stored on our servers</p>
              <p>✓ PCI-DSS compliant payment gateway</p>
              <p>✓ Access token delivered instantly via email</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>We accept:</span>
            <Badge variant="outline" className="text-xs">Visa</Badge>
            <Badge variant="outline" className="text-xs">Mastercard</Badge>
            <Badge variant="outline" className="text-xs">Amex</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
