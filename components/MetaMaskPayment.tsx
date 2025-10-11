"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Copy, Check, ExternalLink, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import GlowingButton from "@/components/GlowingButton"

interface MetaMaskPaymentProps {
  amount?: string
  currency?: string
  onPaymentSuccess?: (txHash: string) => void
  onPaymentError?: (error: string) => void
  className?: string
}

export default function MetaMaskPayment({
  amount = "0.1",
  currency = "ETH",
  onPaymentSuccess,
  onPaymentError,
  className
}: MetaMaskPaymentProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string>("")
  const [balance, setBalance] = useState<string>("0")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(amount)
  const [recipientAddress, setRecipientAddress] = useState("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6") // Replace with your actual address

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== "undefined" && typeof window.ethereum !== "undefined"

  useEffect(() => {
    if (isMetaMaskInstalled) {
      checkConnection()
    }
  }, [isMetaMaskInstalled])

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        setIsConnected(true)
        setAccount(accounts[0])
        await getBalance(accounts[0])
      }
    } catch (error) {
      console.error("Error checking connection:", error)
    }
  }

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      setError("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      if (accounts.length > 0) {
        setIsConnected(true)
        setAccount(accounts[0])
        await getBalance(accounts[0])
        setSuccess("Wallet connected successfully!")
      }
    } catch (error: any) {
      setError(error.message || "Failed to connect wallet")
      onPaymentError?.(error.message || "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }

  const getBalance = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
      
      // Convert from wei to ETH
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)
      setBalance(balanceInEth)
    } catch (error) {
      console.error("Error getting balance:", error)
    }
  }

  const sendPayment = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first")
      return
    }

    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Convert ETH to wei
      const amountInWei = (parseFloat(paymentAmount) * Math.pow(10, 18)).toString(16)
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: recipientAddress,
          value: `0x${amountInWei}`,
          gas: '0x5208', // 21000 gas limit for simple transfer
        }]
      })

      setSuccess(`Payment sent successfully! Transaction hash: ${txHash}`)
      onPaymentSuccess?.(txHash)
      
      // Refresh balance
      await getBalance(account)
    } catch (error: any) {
      const errorMessage = error.message || "Payment failed"
      setError(errorMessage)
      onPaymentError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isMetaMaskInstalled) {
    return (
      <Card className={cn("bg-slate-900/50 border-blue-500/30", className)}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            MetaMask Required
          </CardTitle>
          <CardDescription className="text-slate-300">
            MetaMask is required for cryptocurrency payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              Please install MetaMask browser extension to continue with cryptocurrency payments.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
              className="w-full"
              variant="secondary"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Install MetaMask
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("bg-slate-900/50 border-blue-500/30 max-h-[600px] overflow-hidden flex flex-col", className)}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Crypto Payment
        </CardTitle>
        <CardDescription className="text-slate-300">
          Pay securely with {currency} using MetaMask
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
        {!isConnected ? (
          <div className="space-y-4">
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <Wallet className="h-4 w-4" />
              <AlertDescription className="text-blue-200">
                Connect your MetaMask wallet to make payments
              </AlertDescription>
            </Alert>
            <GlowingButton
              onClick={connectWallet}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Connecting..." : "Connect MetaMask"}
            </GlowingButton>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Wallet Info */}
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Connected Account:</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono text-sm">
                    {formatAddress(account)}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(account)}
                    className="h-6 w-6 p-0"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Balance:</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                  {balance} ETH
                </Badge>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="amount" className="text-slate-300">
                  Amount ({currency})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.001"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white"
                  placeholder="0.1"
                />
              </div>
              
              <div>
                <Label htmlFor="recipient" className="text-slate-300">
                  Recipient Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="recipient"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white font-mono text-sm"
                    placeholder="0x..."
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(recipientAddress)}
                    className="h-10 w-10 p-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

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
              onClick={sendPayment}
              disabled={isLoading || !paymentAmount || parseFloat(paymentAmount) <= 0}
              className="w-full"
            >
              {isLoading ? "Processing..." : `Send ${paymentAmount} ${currency}`}
            </GlowingButton>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}
