"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CreditCard, Lock, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["400", "700", "800", "900"],
    variable: "--font-orbitron",
})

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit">("credit")
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        email: "",
        billingAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    })
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return v
        }
    }

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4)
        }
        return v
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.cardNumber.replace(/\s/g, '')) {
            newErrors.cardNumber = "Card number is required"
        } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
            newErrors.cardNumber = "Card number must be at least 13 digits"
        }

        if (!formData.expiryDate) {
            newErrors.expiryDate = "Expiry date is required"
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)"
        }

        if (!formData.cvv) {
            newErrors.cvv = "CVV is required"
        } else if (formData.cvv.length < 3) {
            newErrors.cvv = "CVV must be at least 3 digits"
        }

        if (!formData.cardholderName) {
            newErrors.cardholderName = "Cardholder name is required"
        }

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.billingAddress) {
            newErrors.billingAddress = "Billing address is required"
        }

        if (!formData.city) {
            newErrors.city = "City is required"
        }

        if (!formData.zipCode) {
            newErrors.zipCode = "ZIP code is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsProcessing(true)

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 3000))

            // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
            console.log("Payment processed:", {
                ...formData,
                paymentMethod,
                amount: 100,
                currency: "USD"
            })

            // Redirect to success page or show success message
            alert("Payment successful! Welcome to CYBERRAZOR Pro!")

        } catch (error) {
            console.error("Payment error:", error)
            alert("Payment failed. Please try again.")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className={cn("min-h-screen bg-black text-white relative overflow-hidden", orbitron.variable)}>
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1200 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e40af" strokeWidth="0.5" opacity="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/logo.jpg"
                                alt="CYBERRAZOR Logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Secure Checkout
                        </span>
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Complete your CYBERRAZOR Pro subscription
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-400 flex items-center">
                                <Shield className="w-6 h-6 mr-2" />
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-gray-800/50 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-semibold text-white">CYBERRAZOR Pro</span>
                                    <span className="text-lg font-bold text-blue-400">$100/month</span>
                                </div>
                                <p className="text-slate-300 text-sm mb-4">
                                    Advanced AI-powered security for professionals
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                        AI File Scanning (can do playbook thing)
                                    </div>
                                    <div className="flex items-center text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                        AI Network Analysis (can block IP too)
                                    </div>
                                    <div className="flex items-center text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                        CIA Security Audits (complete)
                                    </div>
                                    <div className="flex items-center text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                        Export Scan Summary
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span className="text-white">Total</span>
                                    <span className="text-blue-400">$100.00/month</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-2">
                                    Billed monthly • Cancel anytime
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Form */}
                    <Card className="bg-gray-900/50 border-blue-500/20 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-400 flex items-center">
                                <CreditCard className="w-6 h-6 mr-2" />
                                Payment Information
                            </CardTitle>
                            <CardDescription className="text-slate-300">
                                Your payment information is encrypted and secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Payment Method Selection */}
                                <div className="space-y-3">
                                    <Label className="text-white">Payment Method</Label>
                                    <div className="flex space-x-4">
                                        <Button
                                            type="button"
                                            variant={paymentMethod === "credit" ? "default" : "outline"}
                                            onClick={() => setPaymentMethod("credit")}
                                            className={cn(
                                                "flex-1",
                                                paymentMethod === "credit"
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                            )}
                                        >
                                            Credit Card
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={paymentMethod === "debit" ? "default" : "outline"}
                                            onClick={() => setPaymentMethod("debit")}
                                            className={cn(
                                                "flex-1",
                                                paymentMethod === "debit"
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                            )}
                                        >
                                            Debit Card
                                        </Button>
                                    </div>
                                </div>

                                {/* Card Information */}
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                                        <Input
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                e.target.value = formatCardNumber(e.target.value)
                                                handleInputChange(e)
                                            }}
                                            placeholder="1234 5678 9012 3456"
                                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                            maxLength={19}
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                                            <Input
                                                id="expiryDate"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={(e) => {
                                                    e.target.value = formatExpiryDate(e.target.value)
                                                    handleInputChange(e)
                                                }}
                                                placeholder="MM/YY"
                                                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                                maxLength={5}
                                            />
                                            {errors.expiryDate && (
                                                <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="cvv" className="text-white">CVV</Label>
                                            <Input
                                                id="cvv"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                                maxLength={4}
                                                type="password"
                                            />
                                            {errors.cvv && (
                                                <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="cardholderName" className="text-white">Cardholder Name</Label>
                                        <Input
                                            id="cardholderName"
                                            name="cardholderName"
                                            value={formData.cardholderName}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                        {errors.cardholderName && (
                                            <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Billing Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white">Billing Information</h3>

                                    <div>
                                        <Label htmlFor="email" className="text-white">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="billingAddress" className="text-white">Billing Address</Label>
                                        <Input
                                            id="billingAddress"
                                            name="billingAddress"
                                            value={formData.billingAddress}
                                            onChange={handleInputChange}
                                            placeholder="123 Main Street"
                                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                        {errors.billingAddress && (
                                            <p className="text-red-400 text-sm mt-1">{errors.billingAddress}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city" className="text-white">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="New York"
                                                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                            {errors.city && (
                                                <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="zipCode" className="text-white">ZIP Code</Label>
                                            <Input
                                                id="zipCode"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                placeholder="10001"
                                                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                            {errors.zipCode && (
                                                <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <Lock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-300 font-medium text-sm">Secure Payment</p>
                                            <p className="text-slate-300 text-sm">
                                                Your payment information is encrypted and processed securely. We never store your card details.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 text-lg transition-all duration-200 shadow-lg shadow-blue-500/25"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Processing Payment...</span>
                                        </div>
                                    ) : (
                                        `Complete ${paymentMethod === "credit" ? "Credit" : "Debit"} Card Payment - $100.00`
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
