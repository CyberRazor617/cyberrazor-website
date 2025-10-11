"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Wallet, Shield, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import MetaMaskPayment from "@/components/MetaMaskPayment"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess?: (txHash: string) => void
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [txHash, setTxHash] = useState("")

  const handlePaymentSuccess = (hash: string) => {
    setTxHash(hash)
    setPaymentSuccess(true)
    onPaymentSuccess?.(hash)
  }

  const handleClose = () => {
    setPaymentSuccess(false)
    setTxHash("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("max-w-4xl max-h-[90vh] bg-slate-900 border-blue-500/30 text-white overflow-hidden flex flex-col", orbitron.variable)}>
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent font-orbitron">
                Upgrade to Pro Tier
              </DialogTitle>
              <DialogDescription className="text-slate-300 mt-2">
                Secure your digital infrastructure with our advanced AI-powered cybersecurity solution
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pb-4">
          {/* Payment Section */}
          <div className="space-y-4">
            <MetaMaskPayment
              amount="0.1"
              currency="ETH"
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={(error) => console.error("Payment error:", error)}
            />

            {/* Payment Success */}
            {paymentSuccess && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h3 className="text-green-400 font-semibold">Payment Successful!</h3>
                </div>
                <p className="text-green-200 text-sm mb-3">
                  Your Pro Tier subscription has been activated
                </p>
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400 text-xs">Transaction Hash:</span>
                    <p className="text-white font-mono text-xs break-all">{txHash}</p>
                  </div>
                  <Button
                    onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    View on Etherscan
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Pro Tier Benefits */}
          <div className="space-y-4">
            {/* Pricing Info */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-semibold">Pro Tier - $100/month</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Crypto Payment</span>
                  <Badge className="bg-green-500/20 text-green-300">0.1 ETH</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Billing</span>
                  <Badge className="bg-blue-500/20 text-blue-300">Monthly</Badge>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {[
                  "AI File Scanning with playbook automation",
                  "AI Network Analysis with IP blocking",
                  "Complete CIA Security Audits",
                  "Export Scan Summary reports",
                  "Priority customer support",
                  "Advanced threat intelligence",
                  "Real-time monitoring dashboard",
                  "Custom security configurations"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Notice */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <h3 className="text-yellow-400 font-semibold text-sm">Security Notice</h3>
              </div>
              <div className="space-y-1 text-slate-300 text-xs">
                <p>• Always verify the recipient address before sending</p>
                <p>• Double-check the amount before confirming</p>
                <p>• Keep your transaction hash for records</p>
                <p>• Contact support if you need assistance</p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-white font-semibold mb-2 text-sm">Need Help?</h3>
              <div className="space-y-1 text-slate-300 text-xs">
                <p>Email: cyberrazor0123@gmail.com</p>
                <p>Phone: +923152754324</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
