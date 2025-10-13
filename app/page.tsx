"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import SpotlightCard from "@/components/SpotlightCard"
import DocumentationModal from "@/components/DocumentationModal"
import PaymentModal from "@/components/PaymentModal"
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
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  AlertTriangle,
  Lock,
  Activity,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  Cpu,
  Database,
  Network,
  Radar,
  ShieldCheck,
  Terminal,
  ChevronRightIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import GridBackgroundDemo from "@/components/GridBackgroundDemo"
import DecryptedText from "@/components/DecryptedText"
import FloatingCard from "@/components/FloatingCard"
import GlowingButton from "@/components/GlowingButton"
import TargetCursor from "@/components/TargetCursor"
import { Orbitron } from "next/font/google"
import Hyperspeed from "@/components/Hyperspeed"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

// Documentation content
const pythonModuleDoc = `# CYBERRAZOR Python Module Documentation

## Overview
The CYBERRAZOR Python module provides powerful cybersecurity tools for automated threat detection, vulnerability scanning, and security analysis. This module integrates seamlessly into your Python development workflow and CI/CD pipelines.

## Installation

### Prerequisites
Before installing the CYBERRAZOR Python module, ensure your system meets the following requirements:

#### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+, CentOS 7+, RHEL 7+)
- **Python Version**: Python 3.8 or higher
- **Memory**: Minimum 4GB RAM (8GB recommended for large-scale scanning)
- **Storage**: At least 2GB free disk space
- **Network**: Internet connection for threat intelligence updates

#### Required System Dependencies
- **Windows**:
  - Microsoft Visual C++ Redistributable 2019 or later
  - Windows Defender or compatible antivirus software
- **macOS**:
  - Xcode Command Line Tools
  - Homebrew (recommended for dependency management)
- **Linux**:
  - GCC compiler
  - libssl-dev
  - libffi-dev
  - python3-dev

#### Python Dependencies
The module automatically installs the following dependencies:
- \`requests>=2.28.0\` - HTTP library for API communications
- \`cryptography>=3.4.8\` - Cryptographic functions
- \`psutil>=5.8.0\` - System and process utilities
- \`scapy>=2.4.5\` - Network packet manipulation
- \`yara-python>=4.2.0\` - Pattern matching engine
- \`python-nmap>=0.7.1\` - Network scanning
- \`paramiko>=2.9.0\` - SSH client library

### Installation Commands

#### Standard Installation
\`\`\`bash
pip install cyberrazor
\`\`\`

#### Development Installation
\`\`\`bash
pip install cyberrazor[dev]
\`\`\`

#### From Source
\`\`\`bash
git clone https://github.com/cyberrazor/python-module.git
cd python-module
pip install -e .
\`\`\`

## Quick Start

### Basic Usage
\`\`\`python
import cyberrazor

# Initialize the scanner
scanner = cyberrazor.Scanner()

# Run a file scan
results = scanner.scan_file("/path/to/file")

# Run network monitoring
network_results = scanner.monitor_network(interface="eth0")

# Run CIA audit
audit_results = scanner.run_cia_audit(target="192.168.1.0/24")
\`\`\`

### Advanced Configuration
\`\`\`python
import cyberrazor

# Configure scanner with custom settings
config = cyberrazor.Config(
    threat_intelligence=True,
    real_time_monitoring=True,
    scan_depth="deep",
    output_format="json"
)

scanner = cyberrazor.Scanner(config=config)
\`\`\`

## Features

### File Scanning
- **Malware Detection**: Advanced pattern matching using YARA rules
- **Vulnerability Analysis**: Static code analysis for security flaws
- **Hash Verification**: SHA-256 checksum validation
- **Metadata Extraction**: File information and properties analysis

### Network Monitoring
- **Real-time Traffic Analysis**: Monitor network packets in real-time
- **Threat Detection**: Identify suspicious network activities
- **Port Scanning**: Comprehensive port and service enumeration
- **Traffic Classification**: Categorize network traffic patterns

### CIA Security Audits
- **Confidentiality**: Data encryption and access control verification
- **Integrity**: Data integrity and tamper detection
- **Availability**: System uptime and service availability checks

### Wazuh Integration
- **Alert Processing**: Real-time security alert analysis
- **Log Correlation**: Cross-reference security events
- **Incident Response**: Automated response to security incidents

## API Reference

### Scanner Class
\`\`\`python
class Scanner:
    def __init__(self, config=None):
        """Initialize the CYBERRAZOR scanner"""
    
    def scan_file(self, file_path, options=None):
        """Scan a file for threats and vulnerabilities"""
    
    def monitor_network(self, interface=None, duration=None):
        """Monitor network traffic for threats"""
    
    def run_cia_audit(self, target, audit_type="full"):
        """Run CIA security audit on target"""
    
    def get_wazuh_alerts(self, time_range="24h"):
        """Retrieve Wazuh security alerts"""
\`\`\`

### Configuration Options
\`\`\`python
class Config:
    def __init__(
        self,
        threat_intelligence=True,
        real_time_monitoring=False,
        scan_depth="standard",
        output_format="json",
        log_level="INFO"
    ):
        """Configure scanner behavior"""
\`\`\`

## Integration Examples

### CI/CD Pipeline Integration
\`\`\`python
# GitHub Actions example
import cyberrazor

def security_scan():
    scanner = cyberrazor.Scanner()
    results = scanner.scan_file("./src/")
    
    if results.threats_found:
        raise Exception("Security threats detected!")
    
    return results
\`\`\`

### Docker Integration
\`\`\`dockerfile
FROM python:3.9-slim

RUN pip install cyberrazor

COPY . /app
WORKDIR /app

CMD ["python", "security_scan.py"]
\`\`\`

## Troubleshooting

### Common Issues

#### Installation Failures
- Ensure Python 3.8+ is installed
- Check system dependencies are met
- Verify internet connection for package downloads

#### Permission Errors
- Run with appropriate user permissions
- Check file/directory access rights
- Ensure network interface access permissions

#### Performance Issues
- Adjust scan depth for large files
- Use appropriate timeout values
- Monitor system resource usage

### Support
For technical support and bug reports:
- **Email**: support@cyberrazor.com
- **Documentation**: https://docs.cyberrazor.com
- **GitHub Issues**: https://github.com/cyberrazor/python-module/issues

## License
This module is licensed under the MIT License. See LICENSE file for details.

## Version History
- **v1.0.0**: Initial release with basic scanning capabilities
- **v1.1.0**: Added network monitoring and CIA audit features
- **v1.2.0**: Enhanced threat intelligence integration`


export default function CyberRazorLanding() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [showTargetCursor, setShowTargetCursor] = useState(false)
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    requirements: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "pricing", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            // Show target cursor only in services section
            setShowTargetCursor(section === "services")
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log("Form submitted:", contactForm)
      
      setSubmitStatus("success")
      setContactForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        requirements: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("min-h-screen bg-black text-white", orbitron.variable, isDarkMode ? "dark" : "")}>
      {/* Header */}
      {/* Resizable Navbar */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
            items={[
              { name: "Home", link: "#home" },
              { name: "About", link: "#about" },
              { name: "Services", link: "#services" },
              { name: "Pricing", link: "#pricing" },
              { name: "Contact", link: "#contact" },
            ]} 
            onItemClick={() => {
              // Handle navigation if needed
            }}
          />
          <div className="flex items-center relative z-[70]">
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Start button clicked!');
                router.push('/login');
              }}
              className="relative z-[70] pointer-events-auto"
            >
              Start
            </Button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
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
              { name: "Home", link: "#home" },
              { name: "About", link: "#about" },
              { name: "Services", link: "#services" },
              { name: "Pricing", link: "#pricing" },
              { name: "Contact", link: "#contact" },
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
                  console.log('Mobile Start button clicked!');
                  setIsMenuOpen(false);
                  router.push('/login');
                }}
                variant="outline"
                className="pointer-events-auto"
              >
                Start
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20">
        <GridBackgroundDemo className="absolute inset-0">
          <div className="relative z-20 container mx-auto px-4 text-center flex-1 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 animate-pulse">
                🔒 Next-Gen Cyber Defense
              </Badge>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight font-orbitron">
                  <div className="bg-gradient-to-b from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    <DecryptedText
                      text="CYBERRAZOR"
                      speed={30}
                      animateOn="view"
                      className="block tracking-wider"
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?{}[]|"
                      maxIterations={15}
                    />
                  </div>
                </h1>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold font-orbitron">
                  <div className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    <DecryptedText
                      text="Elite Cyber Defense"
                      speed={25}
                      animateOn="view"
                      className="block tracking-wide"
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?{}[]|"
                      maxIterations={12}
                    />
                  </div>
                </div>
              </div>

              <div className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-orbitron font-light mt-8 px-4 break-words hyphens-auto">
                <DecryptedText
                  text="AI-powered threat detection and real-time cyber defense"
                  speed={15}
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                  maxIterations={8}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center items-center mt-12 sm:mt-16 mb-16 sm:mb-20 px-4">
                <GlowingButton
                  size="lg"
                  className="text-sm sm:text-lg px-4 sm:px-10 py-3 sm:py-6 group font-orbitron font-bold tracking-wide w-full sm:w-auto"
                  onClick={() => router.push('/login')}
                >
                  <DecryptedText text="SECURE TOGETHER" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />
                </GlowingButton>
                <GlowingButton
                  size="lg"
                  variant="secondary"
                  className="text-sm sm:text-lg px-4 sm:px-10 py-3 sm:py-6 font-orbitron font-bold tracking-wide w-full sm:w-auto"
                  onClick={() => scrollToSection("services")}
                >
                  <DecryptedText text="EXPLORE ARSENAL" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />
                </GlowingButton>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mt-6 sm:mt-16 px-4">
                {[
                  {
                    icon: ShieldCheck,
                    label: "99.99% UPTIME",
                    desc: "Military-grade reliability",
                    color: "text-green-400",
                  },
                  {
                    icon: Radar,
                    label: "24/7 MONITORING",
                    desc: "Continuous threat surveillance",
                    color: "text-blue-400",
                  },
                  {
                    icon: Zap,
                    label: "< 2MIN RESPONSE",
                    desc: "Lightning-fast incident response",
                    color: "text-yellow-400",
                    hideOnMobile: true,
                  },
                ].map((stat, index) => (
                  <FloatingCard key={index} className={cn("p-4 sm:p-6 text-center bg-slate-900/30", stat.hideOnMobile && "hidden md:block")}>
                    <stat.icon className={cn("h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 sm:mb-3", stat.color)} />
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1 font-orbitron">
                      <DecryptedText text={stat.label} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%/" />
                    </div>
                    <div className="text-slate-400 font-orbitron font-light text-sm sm:text-base">{stat.desc}</div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </div>
        </GridBackgroundDemo>
      </section>

      {/* Developer Tools Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <DecryptedText text="Developer Arsenal" animateOn="view" />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto px-4 break-words hyphens-auto">
              Integrate CYBERRAZOR's powerful cybersecurity tools directly into your development workflow with our open-source modules and extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Python Module */}
            <FloatingCard className="group overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:scale-110">
                    <Terminal className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    <DecryptedText text="Python Module" />
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base leading-relaxed">
                  Install our powerful cybersecurity toolkit directly into your Python environment for automated threat detection and security analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-slate-400 font-mono">Terminal</span>
                    </div>
                    <code className="text-green-400 font-mono text-lg block">
                      pip install cyberrazor
                    </code>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Real-time threat scanning",
                      "Automated vulnerability detection", 
                      "Security code analysis",
                      "Integration with CI/CD pipelines"
                    ].map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <DocumentationModal 
                    title="Python Module Documentation" 
                    content={pythonModuleDoc}
                  >
                    <GlowingButton variant="secondary" className="w-full">
                      View Documentation
                    </GlowingButton>
                  </DocumentationModal>
                </div>
              </CardContent>
            </FloatingCard>

            {/* Mobile APK */}
            <FloatingCard className="group overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:scale-110">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    <DecryptedText text="Mobile APK" />
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base leading-relaxed">
                  Secure your mobile devices with our comprehensive Android security scanner and threat detection app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-slate-400 font-mono">Android APK</span>
                    </div>
                    <code className="text-blue-400 font-mono text-lg block">
                      CYBERRAZOR Mobile Security
                    </code>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Real-time mobile threat detection",
                      "App vulnerability scanning", 
                      "Network security monitoring",
                      "Device security assessment"
                    ].map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <GlowingButton 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => window.open('/downloads/cyberrazor-mobile.apk', '_blank')}
                  >
                    Download APK
                  </GlowingButton>
                </div>
              </CardContent>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent px-4">
              <DecryptedText text="About CyberRazor" animateOn="view" />
            </h2>
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed break-words hyphens-auto">
                CyberRazor is an AI-powered automated tool that scans files, detects threats, and executes SOAR (Security Orchestration, Automation, and Response) actions to enhance security and streamline incident response.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <Radar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Detection</h3>
                  <p className="text-slate-400">Advanced machine learning algorithms for accurate threat identification</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                    <Zap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Automated Response</h3>
                  <p className="text-slate-400">Instant SOAR actions to neutralize threats before they spread</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                    <ShieldCheck className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Enhanced Security</h3>
                  <p className="text-slate-400">Comprehensive protection with streamlined incident response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-cyan-900/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent px-4">
              <DecryptedText text="Cyber Arsenal" animateOn="view" />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto px-4 break-words hyphens-auto">
              Comprehensive cybersecurity solutions powered by AI, machine learning, and advanced threat intelligence to
              protect your digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Activity,
                title: "AI-Powered SOC",
                description:
                  "24/7 security operations center with machine learning threat detection and automated response capabilities.",
                features: [
                  "Real-time AI analysis",
                  "Automated threat response",
                  "Predictive analytics",
                  "Custom threat models",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Radar,
                title: "Threat Intelligence",
                description:
                  "Advanced threat hunting using AI-enhanced analytics and global intelligence networks.",
                features: [
                  "AI threat analysis",
                  "Global intel feeds",
                  "Behavioral profiling",
                  "Zero-day detection",
                ],
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: AlertTriangle,
                title: "Rapid Response",
                description: "Military-grade incident response with digital forensics and malware reverse engineering.",
                features: ["Sub-2min response", "Digital forensics", "Malware analysis", "Recovery protocols"],
                color: "from-blue-600 to-cyan-600",
              },
              {
                icon: Lock,
                title: "Compliance Shield",
                description:
                  "Automated compliance monitoring and reporting for global security standards and regulations.",
                features: ["Multi-framework support", "Automated reporting", "Risk scoring", "Audit trails"],
                color: "from-cyan-600 to-blue-600",
              },
              {
                icon: Network,
                title: "Penetration Testing",
                description:
                  "Advanced ethical hacking with AI-assisted vulnerability discovery and exploitation simulation.",
                features: ["AI-assisted testing", "Zero-day simulation", "Social engineering", "Remediation roadmaps"],
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "Security Architecture",
                description:
                  "Next-generation security architecture design with zero-trust principles and advanced encryption.",
                features: ["Zero-trust design", "Advanced encryption", "Micro-segmentation", "Cloud-native security"],
                color: "from-cyan-500 to-blue-500",
              },
            ].map((service, index) => (
              <FloatingCard key={index} className="group overflow-hidden cursor-target flex flex-col h-full">
                <CardHeader className="relative">
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={cn(
                        "p-4 rounded-xl bg-gradient-to-r transition-all duration-300 group-hover:scale-110",
                        service.color,
                      )}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">
                      <DecryptedText text={service.title} />
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-300 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent px-4">
              <DecryptedText text="Defense Packages" animateOn="view" />
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto px-4 break-words hyphens-auto">
              Choose your cybersecurity solution. From free basic scanning to enterprise-grade AI-powered security, 
              we have the perfect package for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto items-stretch">
            {[
              {
                name: "Free Tier",
                price: "$0",
                period: "",
                description: "CLI-based security tool with pro trial",
                features: [
                  "CLI Based tool (Free Version)",
                  "User portal",
                  "7 days free Pro trial",
                ],
                popular: false,
                color: "from-blue-500/20 to-cyan-500/20",
                buttonText: "Get Started",
                style: { bottom: '500px' },
              },
              {
                name: "Pro Tier",
                price: "$200",
                period: "/month",
                description: "Advanced AI-powered security with complete features",
                features: [
                  "CLI Based tool (Pro Version)",
                  "Pro admin portal",
                  "AI agent for file scanning",
                  "AI network scanning",
                  "Incident Response Report",
                  "Complete CIA according to ISO 27001",
                ],
                popular: true,
                color: "from-blue-600/30 to-cyan-600/30",
                buttonText: "Get Pro",
              },
              {
                name: "Enterprise Tier",
                price: "$1500",
                period: "/year",
                originalPrice: "$3000",
                description: "Fully customizable enterprise security solution",
                features: [
                  "All Pro features included",
                  "Customize dashboard",
                  "Customize tool tokens (+$200)",
                  "CIA Standardize",
                  "Customize API Key of AI",
                  "Dedicated support team",
                  "Priority support",
                  "On-site deployment",
                ],
                popular: false,
                color: "from-blue-700/20 to-cyan-700/20",
                buttonText: "Contact Us",
              },
            ].map((plan, index) => (
              <FloatingCard
                key={index}
                className={cn(
                  "relative group flex flex-col h-full min-h-[500px]",
                  plan.popular && "border-blue-400/50 scale-105 shadow-2xl shadow-blue-500/20",
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 rounded-lg", plan.color)} />
                <CardHeader className="text-center pb-8 relative z-10 flex-shrink-0">
                  <CardTitle className="text-3xl text-white mb-4">
                    <DecryptedText text={plan.name} />
                  </CardTitle>
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-2xl text-slate-400 line-through mb-1">{plan.originalPrice}{plan.period}</div>
                    )}
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-300 text-lg break-words hyphens-auto">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex-1 flex flex-col p-6 min-h-[300px]">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-slate-300 group-hover:text-white transition-colors"
                      >
                        <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0 mt-0.5" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 mt-auto">
                    <GlowingButton
                      className={cn("w-full text-lg py-4", plan.popular && "shadow-xl shadow-blue-500/30")}
                      onClick={() => {
                        if (plan.name === "Enterprise Tier") {
                          window.location.href = "/appointment";
                        } else if (plan.name === "Pro Tier") {
                          setIsPaymentModalOpen(true);
                        } else if (plan.name === "Free Tier") {
                          window.location.href = "/login";
                        } else {
                          scrollToSection("contact");
                        }
                      }}
                    >
                      <DecryptedText text={plan.buttonText} />
                    </GlowingButton>
                  </div>
                </CardContent>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Introduction and Social Media */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-2">Contact Section</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight break-words">
                  Get in touch
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-none break-words hyphens-auto">
                  Ready to explore how CyberRazor can secure your future? Our team is standing by and eager to help you get started. We commit to responding to all inquiries within 24 hours, ensuring you get the support and answers you need quickly.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
                <a href="https://www.instagram.com/cyber_razor123?igsh=N25mZ2p3c211bHpz" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors p-2 hover:bg-pink-400/10 rounded-lg" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1ABCuCb6vV/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-blue-400/10 rounded-lg" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://github.com/CyberRazor617" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors p-2 hover:bg-gray-400/10 rounded-lg" aria-label="GitHub">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/cyberrazor/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition-colors p-2 hover:bg-blue-600/10 rounded-lg" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Contact Methods Card */}
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
              <div className="space-y-6 sm:space-y-8">
                {/* Call us */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 break-words">Call us</h3>
                    <a href="tel:+923152754324" className="text-white underline hover:text-gray-300 transition-colors text-sm sm:text-base break-all">
                      +923152754324
                    </a>
                  </div>
                </div>

                {/* Write an email */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 break-words">Write an email</h3>
                    <a href="mailto:cyberrazor0123@gmail.com" className="text-white underline hover:text-gray-300 transition-colors text-sm sm:text-base break-all">
                      cyberrazor0123@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-blue-500/20 py-8 overflow-hidden">
        {/* Hyperspeed Background */}
        <div className="absolute inset-0 opacity-30">
          <Hyperspeed
            effectOptions={{
              colors: {
                roadColor: 0x001122,
                islandColor: 0x002244,
                background: 0x000000,
                shoulderLines: 0x00ffff,
                brokenLines: 0x0099ff,
                leftCars: [0x00ffff, 0x0099ff, 0x0066cc],
                rightCars: [0x00ccff, 0x0088ff, 0x0055aa],
                sticks: 0x00aaff,
              },
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <p className="text-slate-400 text-sm sm:text-lg font-orbitron font-light">
                AI-powered threat detection and real-time cyber defense
              </p>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-orbitron">Command</h4>
              <ul className="space-y-2 sm:space-y-3 text-slate-400 font-orbitron font-light text-sm sm:text-base">
                <li>
                  <Link href="#about" className="hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-blue-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-blue-400 transition-colors">
                    pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
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
                  <Link href="/compliance" className="hover:text-blue-400 transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
            <p className="text-slate-400 text-xs sm:text-sm font-orbitron font-light">
              &copy; {new Date().getFullYear()} CYBERRAZOR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Target Cursor - only show in services section */}
      {showTargetCursor && <TargetCursor targetSelector=".cursor-target" spinDuration={1.5} hideDefaultCursor={true} />}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={(txHash) => {
          console.log("Payment successful:", txHash);
          // You can add additional logic here, like redirecting to dashboard
        }}
      />

    </div>
  )
}
