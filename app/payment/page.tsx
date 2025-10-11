"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import MetaMaskPayment from "@/components/MetaMaskPayment"
import Link from "next/link"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

export default function PaymentPage() {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [txHash, setTxHash] = useState("")

  const handlePaymentSuccess = (hash: string) => {
    setTxHash(hash)
    setPaymentSuccess(true)
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
  }

  return (
    <div className={cn("min-h-screen bg-black text-white", orbitron.variable)}>
      {/* Header */}
      <div className="border-b border-blue-500/20 bg-slate-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="font-orbitron font-bold text-lg">CYBERRAZOR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent font-orbitron">
              Secure Payment
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Complete your CYBERRAZOR subscription with secure cryptocurrency payments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Section */}
            <div className="space-y-6">
              <MetaMaskPayment
                amount="0.1"
                currency="ETH"
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />

              {/* Payment Success */}
              {paymentSuccess && (
                <Card className="bg-green-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Payment Successful!
                    </CardTitle>
                    <CardDescription className="text-green-200">
                      Your payment has been processed successfully
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400 text-sm">Transaction Hash:</span>
                        <p className="text-white font-mono text-sm break-all">{txHash}</p>
                      </div>
                      <Button
                        onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
                        variant="secondary"
                        className="w-full"
                      >
                        View on Etherscan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Payment Info */}
            <div className="space-y-6">
              {/* Pricing Info */}
              <Card className="bg-slate-900/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Pro Tier Subscription</CardTitle>
                  <CardDescription className="text-slate-300">
                    Advanced AI-powered security for professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Monthly Plan</span>
                    <Badge className="bg-blue-500/20 text-blue-300">$100/month</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Crypto Payment</span>
                    <Badge className="bg-green-500/20 text-green-300">0.1 ETH</Badge>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-white font-semibold mb-2">What's Included:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        AI File Scanning with playbook automation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        AI Network Analysis with IP blocking
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Complete CIA Security Audits
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Export Scan Summary reports
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="bg-slate-900/50 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Notice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-300">
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Always verify the recipient address before sending payment
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Double-check the amount before confirming the transaction
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Keep your transaction hash for your records
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-slate-900/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Need Help?</CardTitle>
                  <CardDescription className="text-slate-300">
                    Our support team is here to assist you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      If you encounter any issues with your payment, please contact our support team:
                    </p>
                    <div className="space-y-2">
                      <p className="text-blue-400">Email: cyberrazor0123@gmail.com</p>
                      <p className="text-blue-400">Phone: +923152754324</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
