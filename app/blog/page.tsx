"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Zap,
  AlertTriangle,
  Bot,
  Eye,
  Users,
  Lock,
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
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

const blogPosts = [
  {
    id: 1,
    title: "AI-Enhanced Threat Detection: The Future of Cyber Defense",
    excerpt: "Traditional security systems rely on static rules, which can be easily bypassed by modern attackers.",
    content: "Traditional security systems rely on static rules, which can be easily bypassed by modern attackers. At CyberRazor, we integrate machine learning and deep learning models into our SOAR framework to detect unusual behaviors, even before a known signature exists.\n\nOur AI analyzes millions of Wazuh alerts, correlating them with historical threat patterns stored in PostgreSQL, and automatically triggers playbooks to neutralize attacks in real time. This adaptive approach reduces false positives and strengthens organizational resilience.",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    date: "October 10, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Phishing 3.0: Beyond the Click",
    excerpt: "Phishing has evolved from simple deceptive emails to highly targeted, AI-generated messages.",
    content: "Phishing has evolved from simple deceptive emails to highly targeted, AI-generated messages. These new \"Phishing 3.0\" campaigns mimic real corporate communication and use advanced social engineering.\n\nCyberRazor's phishing detection module uses NLP-based text classifiers to recognize linguistic manipulation and fake brand identities. Once detected, the SOAR engine isolates the incident, blocks sender domains, and issues automated response actions.",
    icon: AlertTriangle,
    color: "from-red-500 to-orange-500",
    date: "October 8, 2025",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Insider Threats: The Silent Risk",
    excerpt: "Not all threats come from outside the firewall. Insider threats can cause devastating breaches.",
    content: "Not all threats come from outside the firewall. Insider threats—whether malicious or accidental—can cause devastating breaches.\n\nCyberRazor employs behavioral analytics and user activity modeling to identify anomalies such as unauthorized access attempts, unusual data transfers, or privilege escalation. These are flagged for automated containment and SOC review, ensuring quick remediation and compliance logging.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    date: "October 5, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Ransomware Trends 2025: What Enterprises Must Know",
    excerpt: "The year 2025 has seen a rise in AI-assisted ransomware that adapts to endpoint defenses.",
    content: "The year 2025 has seen a rise in AI-assisted ransomware that adapts to endpoint defenses. CyberRazor's predictive defense module uses pattern recognition to forecast ransomware delivery vectors and automatically implement preventive policies.\n\nOur platform ensures data integrity by maintaining real-time encrypted backups and applying immutable log tracking for forensic analysis.",
    icon: Lock,
    color: "from-yellow-500 to-red-500",
    date: "October 3, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "The Power of Automation in Incident Response",
    excerpt: "Incident response used to take hours; now it happens in seconds through automation.",
    content: "Incident response used to take hours; now it happens in seconds. Through CyberRazor's playbook automation, predefined workflows detect, analyze, and respond to incidents with minimal human intervention.\n\nFrom isolating infected hosts to notifying admins via Gmail or WhatsApp integration, CyberRazor ensures every step follows a verified sequence, improving efficiency and reducing downtime.",
    icon: Zap,
    color: "from-green-500 to-blue-500",
    date: "October 1, 2025",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Zero Trust Architecture: Building Impenetrable Networks",
    excerpt: "Zero Trust is not just a buzzword—it's a fundamental shift in cybersecurity strategy.",
    content: "Zero Trust is not just a buzzword—it's a fundamental shift in cybersecurity strategy that assumes no user or device should be trusted by default, regardless of their location.\n\nCyberRazor implements Zero Trust principles through continuous authentication, micro-segmentation, and real-time access verification. Our platform monitors every network transaction, validates user identities using multi-factor authentication, and applies least-privilege access controls.\n\nBy integrating with existing infrastructure through APIs and SIEM tools, CyberRazor creates dynamic security perimeters that adapt to threats in real-time, ensuring that even if one component is compromised, the entire network remains secure.",
    icon: Shield,
    color: "from-cyan-500 to-blue-500",
    date: "October 12, 2025",
    readTime: "8 min read",
  },
]

export default function BlogPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null)

  return (
    <div className={cn("min-h-screen bg-black text-white relative blog-page dark", orbitron.variable)} style={{ backgroundColor: '#000000' }}>
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
        {!selectedPost ? (
          // Blog List View
          <>
            {/* Hero Section */}
            <section className="relative py-16 sm:py-20 overflow-hidden bg-black">
              <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 animate-pulse">
                    🔒 Threat Intelligence Hub
                  </Badge>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-orbitron">
                      <div className="bg-gradient-to-b from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                        <DecryptedText
                          text="CyberRazor Threat Blog"
                          speed={30}
                          animateOn="view"
                          className="block tracking-wider"
                          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?{}[]|"
                          maxIterations={15}
                        />
                      </div>
                    </h1>

                    <div className="text-base sm:text-lg md:text-xl text-slate-300 max-w-5xl mx-auto leading-relaxed font-orbitron font-light px-4 break-words hyphens-auto">
                      <DecryptedText
                        text="The CyberRazor Threat Blog is your go-to source for the latest updates on cybersecurity incidents, attack trends, vulnerability research, and AI-driven defense methodologies. Our analysts and automated detection systems continuously monitor the global threat landscape to identify new risks and deliver actionable intelligence."
                        speed={15}
                        animateOn="view"
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                        maxIterations={8}
                      />
                    </div>

                    <div className="text-base sm:text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed font-orbitron font-light px-4 break-words hyphens-auto">
                      We believe that knowledge is the most effective weapon in the fight against cybercrime. By sharing timely insights, we empower organizations to prepare, defend, and respond to evolving cyber threats with confidence.
                    </div>
                  </div>
                </div>
            </section>

            {/* Latest Blogs Section */}
            <section className="py-16 sm:py-20 bg-black">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    <DecryptedText text="Latest Blogs" animateOn="view" />
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
                  {blogPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedPost(post)}
                    >
                      <FloatingCard className="group overflow-hidden h-full flex flex-col">
                      <CardHeader className="relative flex-shrink-0">
                        <div className="flex items-center space-x-4 mb-4">
                          <div
                            className={cn(
                              "p-4 rounded-xl bg-gradient-to-r transition-all duration-300 group-hover:scale-110",
                              post.color,
                            )}
                          >
                            <post.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl sm:text-2xl text-white leading-tight break-words">
                              <DecryptedText text={post.title} />
                            </CardTitle>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <CardDescription className="text-slate-300 text-base leading-relaxed break-words hyphens-auto">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform"
                          >
                            Read More
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </FloatingCard>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          // Individual Blog Post View
          <section className="py-16 sm:py-20 bg-black min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPost(null)}
                  className="mb-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 bg-transparent p-0 h-auto font-semibold"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>

                <FloatingCard className="overflow-hidden">
                  <CardHeader className="pb-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={cn(
                          "p-4 rounded-xl bg-gradient-to-r",
                          selectedPost.color,
                        )}
                      >
                        <selectedPost.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight break-words hyphens-auto">
                          {selectedPost.title}
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-slate-400 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert prose-lg max-w-none">
                      {selectedPost.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 break-words hyphens-auto">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </FloatingCard>
              </div>
            </div>
          </section>
        )}
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
                  <Link href="/blog" className="hover:text-blue-400 transition-colors text-blue-400">
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
