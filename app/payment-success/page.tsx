"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Mail, ExternalLink, Copy, Check, Loader2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [accessToken, setAccessToken] = useState<string>("")
  const [tokenCopied, setTokenCopied] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (sessionId) {
      fetchSessionData(sessionId)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchSessionData = async (id: string) => {
    try {
      const response = await fetch(`https://cyberrazorbackend.vercel.app/api/stripe/session/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setSessionData(data.session)
        
        // Manually verify payment and trigger email sending
        if (data.session.status === 'paid') {
          verifyAndActivate(id)
        }
      }
    } catch (error) {
      console.error("Error fetching session:", error)
    } finally {
      setLoading(false)
    }
  }

  const verifyAndActivate = async (id: string) => {
    try {
      console.log('🔍 Verifying payment for session:', id)
      const response = await fetch(`https://cyberrazorbackend.vercel.app/api/stripe/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: id }),
      })
      
      console.log('📡 Response status:', response.status)
      const data = await response.json()
      console.log('📦 Payment verification response:', data)
      
      if (data.success && data.accessToken) {
        console.log('✅ Access token received:', data.accessToken)
        setAccessToken(data.accessToken)
      } else {
        console.error('❌ No access token in response:', data)
        setError(data.message || 'Failed to generate access token')
      }
    } catch (error) {
      console.error("❌ Error verifying payment:", error)
      setError('Failed to verify payment. Please contact support.')
    }
  }

  const copySessionId = async () => {
    if (sessionId) {
      await navigator.clipboard.writeText(sessionId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyAccessToken = async () => {
    if (accessToken) {
      await navigator.clipboard.writeText(accessToken)
      setTokenCopied(true)
      setTimeout(() => setTokenCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-slate-900/50 border-green-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Your subscription has been activated
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-slate-400 mt-4">Loading payment details...</p>
              </div>
            ) : (
              <>
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h3 className="text-red-400 font-semibold">Verification Error</h3>
                    </div>
                    <p className="text-red-200 text-sm">{error}</p>
                    <p className="text-slate-400 text-xs mt-2">
                      Please contact support with your Session ID: {sessionId}
                    </p>
                  </div>
                )}

                {/* Payment Details */}
                {sessionData && (
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <h3 className="text-white font-semibold">Payment Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount Paid:</span>
                        <span className="text-white font-medium">
                          ${sessionData.amount} {sessionData.currency?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <Badge className="bg-green-500/20 text-green-300">
                          {sessionData.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-white font-mono text-sm">
                          {sessionData.customer_email}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session ID */}
                {sessionId && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Session ID:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copySessionId}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-white font-mono text-xs break-all">{sessionId}</p>
                  </div>
                )}

                {/* Access Token */}
                {accessToken && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400 text-sm font-semibold">🎉 Your Access Token:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAccessToken}
                        className="h-6 w-6 p-0"
                      >
                        {tokenCopied ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : (
                          <Copy className="h-3 w-3 text-green-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-white font-mono text-sm break-all bg-slate-800/50 p-3 rounded">
                      {accessToken}
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                      Copy this token and use it to activate your Pro Portal account
                    </p>
                  </div>
                )}

                {/* Next Steps */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="text-blue-400 font-semibold">Check Your Email</h3>
                      <p className="text-slate-300 text-sm">
                        We've sent your <strong>access token</strong> to {sessionData?.customer_email || "your email address"}. 
                        Use this token to activate your Pro Portal account.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Link href="https://cyberrazorpro.vercel.app" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Go to Pro Portal
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-slate-500 text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Link href="/">
                      Back to Home
                    </Link>
                  </Button>
                </div>

                {/* Support */}
                <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-sm mb-2">Need help?</p>
                  <div className="text-sm text-slate-300">
                    <p>Email: cyberrazor0123@gmail.com</p>
                    <p>Phone: +923152754324</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading payment details...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
