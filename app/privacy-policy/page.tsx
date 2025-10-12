"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import {
  Shield,
  Lock,
  Eye,
  Database,
  FileText,
  Home,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DecryptedText from "@/components/DecryptedText"
import FloatingCard from "@/components/FloatingCard"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

const privacyItems = [
  {
    icon: Database,
    title: "Data Collection & Usage",
    content: "We collect only essential system telemetry and log data necessary for threat detection and response. No personal or organizationally sensitive data is accessed, stored, or shared without explicit consent.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Encryption and Storage",
    content: "All transmitted data—whether alerts, reports, or incident details—is secured using AES-256 encryption during transit and at rest. Our storage mechanisms employ PostgreSQL with strict role-based access controls.",
    color: "from-green-500 to-blue-500",
  },
  {
    icon: Eye,
    title: "AI Ethics and Transparency",
    content: "Our machine learning models are designed to analyze patterns, not personal information. They operate within predefined ethical boundaries, ensuring compliance with GDPR, ISO 27001, and other international standards.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Your Control",
    content: "Users retain full ownership of their data. You can request data export, deletion, or anonymization at any time.",
    color: "from-orange-500 to-red-500",
  },
]

export default function PrivacyPolicyPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={cn("min-h-screen bg-black text-white relative privacy-page dark", orbitron.variable)} style={{ backgroundColor: '#000000' }}>
      {/* Multiple layers to ensure solid black background */}
      <div className="fixed inset-0 bg-black z-0" style={{ backgroundColor: '#000000' }}></div>
      <div className="absolute inset-0 bg-black z-0" style={{ backgroundColor: '#000000' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black z-0"></div>
      
      {/* Navbar */}
      <Navbar>
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
            onItemClick={() => {}}
          />
          <div className="flex items-center relative z-[70]">
            <Button 
              variant="outline" 
              onClick={() => router.push('/login')}
              className="relative z-[70] pointer-events-auto bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400"
            >
              Start
            </Button>
          </div>
        </NavBody>

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
            <div className="flex w-full justify-center mt-2 sm:mt-4">
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/login');
                }}
                variant="outline"
                className="pointer-events-auto bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400"
              >
                Start
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 animate-pulse">
                🛡️ Privacy Shield Framework
              </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-orbitron">
                  <div className="bg-gradient-to-b from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    <DecryptedText
                      text="Privacy Policy"
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
                    text="Protecting Data Through Transparency and Control"
                    speed={15}
                    animateOn="view"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                    maxIterations={8}
                  />
                </div>

                <div className="text-base sm:text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-orbitron font-light px-4 break-words hyphens-auto">
                  At CyberRazor, we believe privacy is not just a feature—it is a fundamental right. Our Privacy Shield Framework ensures that all user and organizational data handled by our platform remains confidential, protected, and transparent at every stage.
                </div>
              </div>
            </div>
        </section>

        {/* Privacy Details Section */}
        <section className="py-16 sm:py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {privacyItems.map((item, index) => (
                <div key={index} className="h-full flex flex-col">
                  <FloatingCard className="group overflow-hidden h-full flex flex-col">
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex items-center space-x-4 mb-6">
                        <div
                          className={cn(
                            "p-4 rounded-xl bg-gradient-to-r transition-all duration-300 group-hover:scale-110",
                            item.color,
                          )}
                        >
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight break-words font-orbitron">
                            <DecryptedText text={item.title} />
                          </h3>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-300 text-base leading-relaxed break-words hyphens-auto">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </FloatingCard>
                </div>
              ))}
            </div>

            {/* Final Statement */}
            <div className="mt-16 max-w-4xl mx-auto">
              <FloatingCard className="overflow-hidden">
                <div className="p-8 sm:p-12 text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-orbitron">
                    <DecryptedText text="Our Commitment" />
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed break-words hyphens-auto">
                    CyberRazor guarantees a privacy-first environment built on trust, integrity, and compliance. 
                    Your data protection is not just our responsibility—it's our promise.
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
                  <Link href="/#about" className="hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-blue-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-orbitron">Trends</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 font-orbitron font-light text-sm sm:text-base">
                <li>
                  <Link href="/blog" className="hover:text-blue-400 transition-colors">
                    Threat Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors text-blue-400">
                    Privacy Shield
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                    Terms of Defense
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-blue-400 transition-colors">
                    Security Protocols
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-blue-400 transition-colors">
                    Compliance
                  </Link>
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
