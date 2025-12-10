"use client"

import Link from "next/link"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-slate-900/50 border-red-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Your payment was not completed
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Information */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">What happened?</h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>• You cancelled the payment process</p>
                <p>• No charges were made to your card</p>
                <p>• Your subscription was not activated</p>
              </div>
            </div>

            {/* Why Subscribe */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-3">Why subscribe to Pro?</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✓ AI-powered file scanning and threat detection</li>
                <li>✓ Advanced network analysis with IP blocking</li>
                <li>✓ Complete CIA security audits</li>
                <li>✓ Priority customer support</li>
                <li>✓ Real-time monitoring dashboard</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => window.history.back()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Support */}
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm mb-2">Have questions?</p>
              <div className="text-sm text-slate-300">
                <p>Email: cyberrazor0123@gmail.com</p>
                <p>Phone: +923152754324</p>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 text-center">Other Options</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/#pricing">
                  <Button variant="ghost" className="w-full">
                    View All Plans
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="w-full">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
