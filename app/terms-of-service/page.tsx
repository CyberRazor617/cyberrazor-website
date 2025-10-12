"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Shield,
  Lock,
  Eye,
  Users,
  AlertTriangle,
  RefreshCw,
  Home,
  Scale,
} from "lucide-react"
import { useRouter } from "next/navigation"
import GridBackgroundDemo from "@/components/GridBackgroundDemo"
import DecryptedText from "@/components/DecryptedText"
import FloatingCard from "@/components/FloatingCard"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

const termsItems = [
  {
    icon: Shield,
    title: "1. Authorized Use",
    content: "CyberRazor's SOAR, AI, and security tools must be used solely for defensive and authorized monitoring purposes. Any misuse, such as offensive attacks or unauthorized scanning, is strictly prohibited.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "2. Data Responsibility",
    content: "Users are responsible for maintaining data integrity and must not attempt to alter or access the system's backend or restricted modules.",
    color: "from-green-500 to-blue-500",
  },
  {
    icon: Eye,
    title: "3. Continuous Monitoring",
    content: "Our platform monitors system events to detect potential breaches. This monitoring is for defensive and operational optimization purposes only.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: RefreshCw,
    title: "4. System Updates and Changes",
    content: "CyberRazor reserves the right to update software, rules, and machine learning models as part of continuous improvement and threat adaptation.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: AlertTriangle,
    title: "5. Limitation of Liability",
    content: "CyberRazor aims to provide maximum protection, but no system is entirely immune to cyberattacks. We do not assume responsibility for losses resulting from factors beyond our control, such as third-party software vulnerabilities or user negligence.",
    color: "from-yellow-500 to-red-500",
  },
]

export default function TermsOfServicePage() {
  const router = useRouter()

  return (
    <div className={cn("min-h-screen bg-black text-white relative terms-page", orbitron.variable)} style={{ backgroundColor: '#000000' }}>
      {/* Multiple layers to ensure solid black background */}
      <div className="fixed inset-0 bg-black z-0" style={{ backgroundColor: '#000000' }}></div>
      <div className="absolute inset-0 bg-black z-0" style={{ backgroundColor: '#000000' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black z-0"></div>
      
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
          className="bg-black/90 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="pt-8 relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <GridBackgroundDemo className="absolute inset-0">
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 animate-pulse">
                  ⚖️ Terms of Defense
                </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-orbitron">
                  <div className="bg-gradient-to-b from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    <DecryptedText
                      text="Terms of Service"
                      speed={30}
                      animateOn="view"
                      className="block tracking-wider"
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?{}[]|"
                      maxIterations={15}
                    />
                  </div>
                </h1>

                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-300 max-w-5xl mx-auto leading-relaxed font-orbitron">
                  <DecryptedText
                    text="Our Mutual Commitment to Cybersecurity Excellence"
                    speed={15}
                    animateOn="view"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                    maxIterations={8}
                  />
                </div>

                <div className="text-base sm:text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-orbitron font-light px-4 break-words hyphens-auto">
                  By accessing or using CyberRazor's systems, tools, and services, users agree to follow responsible, lawful, and ethical cybersecurity practices. These Terms of Defense define the shared responsibilities between CyberRazor and its users.
                </div>
              </div>
            </div>
          </GridBackgroundDemo>
        </section>

        {/* Terms Details Section */}
        <section className="py-16 sm:py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {termsItems.map((item, index) => (
                <div key={index} className="h-full flex flex-col">
                  <FloatingCard className="group overflow-hidden h-full flex flex-col">
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex items-start space-x-4 mb-6">
                        <div
                          className={cn(
                            "p-4 rounded-xl bg-gradient-to-r transition-all duration-300 group-hover:scale-110 flex-shrink-0",
                            item.color,
                          )}
                        >
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight break-words font-orbitron mb-4">
                            <DecryptedText text={item.title} />
                          </h3>
                          <p className="text-slate-300 text-base leading-relaxed break-words hyphens-auto">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </div>
              ))}
            </div>

            {/* Final Agreement */}
            <div className="mt-16 max-w-4xl mx-auto">
              <FloatingCard className="overflow-hidden">
                <div className="p-8 sm:p-12 text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-orbitron">
                    <DecryptedText text="Mutual Agreement" />
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed break-words hyphens-auto">
                    By continuing to use CyberRazor, you agree to collaborate in maintaining a secure, ethical, 
                    and resilient digital ecosystem. Together, we build the future of cybersecurity defense.
                  </p>
                </div>
              </FloatingCard>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative bg-black border-t border-blue-500/20 py-12 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                  CYBERRAZOR
                </span>
              </div>
              <p className="text-slate-400 text-sm sm:text-lg font-orbitron font-light">
                AI-powered threat detection and real-time cyber defense
              </p>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-orbitron">Command</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 font-orbitron font-light text-sm sm:text-base">
                <li>
                  <button onClick={() => router.push('/#about')} className="hover:text-blue-400 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/#services')} className="hover:text-blue-400 transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/#pricing')} className="hover:text-blue-400 transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/#contact')} className="hover:text-blue-400 transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-orbitron">Trends</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 font-orbitron font-light text-sm sm:text-base">
                <li>
                  <button onClick={() => router.push('/blog')} className="hover:text-blue-400 transition-colors">
                    Threat Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/privacy-policy')} className="hover:text-blue-400 transition-colors">
                    Privacy Shield
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/terms-of-service')} className="hover:text-blue-400 transition-colors text-blue-400">
                    Terms of Defense
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/security')} className="hover:text-blue-400 transition-colors">
                    Security Protocols
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-slate-400 text-xs sm:text-sm font-orbitron font-light">
              &copy; {new Date().getFullYear()} CYBERRAZOR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
