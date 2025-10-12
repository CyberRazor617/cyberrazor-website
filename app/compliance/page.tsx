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
  FileCheck,
  Globe,
  Award,
  Database,
  Search,
  Home,
  CheckCircle2,
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

const complianceItems = [
  {
    icon: Globe,
    title: "1. GDPR (General Data Protection Regulation)",
    content: "Protects user data privacy and provides complete transparency in how data is collected and used.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "2. ISO/IEC 27001",
    content: "Establishes a systematic approach to managing sensitive company information through effective risk management.",
    color: "from-green-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "3. NIST Cybersecurity Framework",
    content: "Provides structured guidelines for identifying, protecting, detecting, responding to, and recovering from cyber incidents.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileCheck,
    title: "4. SOC 2 Compliance",
    content: "Ensures our controls around data security, availability, and confidentiality meet the highest standards.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Database,
    title: "5. Data Retention Policy",
    content: "Logs and security data are retained only as long as required for analysis and compliance reporting.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Search,
    title: "6. Audit and Review",
    content: "Regular internal and third-party audits verify our adherence to evolving legal and security frameworks.",
    color: "from-indigo-500 to-purple-500",
  },
]

export default function CompliancePage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={cn("min-h-screen bg-black text-white relative compliance-page dark", orbitron.variable)} style={{ backgroundColor: '#000000' }}>
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
                📋 Compliance Framework
              </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-orbitron">
                  <div className="bg-gradient-to-b from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    <DecryptedText
                      text="Compliance"
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
                    text="Built on Global Standards, Driven by Integrity"
                    speed={15}
                    animateOn="view"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                    maxIterations={8}
                  />
                </div>

                <div className="text-base sm:text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-orbitron font-light px-4 break-words hyphens-auto">
                  CyberRazor adheres to a rigorous compliance structure aligned with international cybersecurity and privacy regulations. Compliance is not just about checking boxes—it's about ensuring accountability, transparency, and reliability in every system component.
                </div>
              </div>
            </div>
        </section>

        {/* Compliance Framework Section */}
        <section className="py-16 sm:py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                <DecryptedText text="Our Compliance Framework Includes" animateOn="view" />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {complianceItems.map((item, index) => (
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
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight break-words font-orbitron mb-4">
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

            {/* Commitment Statement */}
            <div className="mt-16 max-w-4xl mx-auto">
              <FloatingCard className="overflow-hidden">
                <div className="p-8 sm:p-12 text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-orbitron">
                    <DecryptedText text="Our Commitment to Excellence" />
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed break-words hyphens-auto">
                    CyberRazor's compliance strategy ensures every action, alert, and automation meets international 
                    security and privacy expectations, reinforcing the trust our users place in us.
                  </p>
                </div>
              </FloatingCard>
            </div>
          </div>
        </section>

        {/* Compliance Standards Highlight */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-slate-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FloatingCard className="overflow-hidden text-center">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white font-orbitron mb-2">GDPR</h4>
                    <p className="text-sm text-slate-400">Data Protection</p>
                  </div>
                </FloatingCard>

                <FloatingCard className="overflow-hidden text-center">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white font-orbitron mb-2">ISO 27001</h4>
                    <p className="text-sm text-slate-400">Information Security</p>
                  </div>
                </FloatingCard>

                <FloatingCard className="overflow-hidden text-center">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white font-orbitron mb-2">NIST</h4>
                    <p className="text-sm text-slate-400">Cybersecurity Framework</p>
                  </div>
                </FloatingCard>

                <FloatingCard className="overflow-hidden text-center">
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <FileCheck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white font-orbitron mb-2">SOC 2</h4>
                    <p className="text-sm text-slate-400">Security Controls</p>
                  </div>
                </FloatingCard>
              </div>
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
                  <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
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
                  <Link href="/compliance" className="hover:text-blue-400 transition-colors text-blue-400">
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
