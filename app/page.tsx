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

const vscodeExtensionDoc = `# CYBERRAZOR VS Code Extension Documentation

## Overview
The CYBERRAZOR Security Scanner VS Code extension provides real-time security analysis, vulnerability detection, and automated security recommendations directly within your development environment. This extension helps developers identify and fix security issues before they reach production.

## Installation

### Prerequisites
Before installing the CYBERRAZOR VS Code extension, ensure your system meets the following requirements:

#### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+, CentOS 7+, RHEL 7+)
- **VS Code Version**: Visual Studio Code 1.70.0 or higher
- **Memory**: Minimum 4GB RAM (8GB recommended for large projects)
- **Storage**: At least 1GB free disk space
- **Network**: Internet connection for threat intelligence updates

#### Required VS Code Extensions
The following extensions are recommended for optimal functionality:
- **Python Extension**: Required for Python file analysis
- **JavaScript/TypeScript**: Required for web application scanning
- **Git Extension**: For repository-based security analysis

#### System Dependencies
- **Windows**:
  - PowerShell 5.1 or later
  - .NET Framework 4.7.2 or later
- **macOS**:
  - Xcode Command Line Tools
  - Homebrew (recommended)
- **Linux**:
  - curl or wget
  - unzip utility

### Installation Methods

#### Method 1: VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "CYBERRAZOR Security Scanner"
4. Click Install

#### Method 2: Command Line
\`\`\`bash
code --install-extension cyberrazor.security-scanner
\`\`\`

#### Method 3: Manual Installation
1. Download the .vsix file from the releases page
2. Open VS Code
3. Go to Extensions
4. Click "..." menu → "Install from VSIX..."
5. Select the downloaded file

## Configuration

### Initial Setup
1. After installation, the extension will prompt you to configure your API key
2. Sign up at https://cyberrazor.com to get your API key
3. Enter your API key in the extension settings

### Settings Configuration
Access settings via: File → Preferences → Settings → Extensions → CYBERRAZOR

#### Core Settings
\`\`\`json
{
  "cyberrazor.apiKey": "your-api-key-here",
  "cyberrazor.enableRealTimeScanning": true,
  "cyberrazor.scanOnSave": true,
  "cyberrazor.scanOnOpen": false,
  "cyberrazor.maxFileSize": "10MB",
  "cyberrazor.excludePatterns": [
    "node_modules/**",
    ".git/**",
    "*.min.js",
    "*.min.css"
  ]
}
\`\`\`

#### Advanced Settings
\`\`\`json
{
  "cyberrazor.threatIntelligence": true,
  "cyberrazor.dependencyScanning": true,
  "cyberrazor.secretDetection": true,
  "cyberrazor.vulnerabilityScanning": true,
  "cyberrazor.reportFormat": "detailed",
  "cyberrazor.autoFix": false
}
\`\`\`

## Features

### Real-time Code Security Analysis
- **Static Analysis**: Analyzes code for security vulnerabilities
- **Pattern Detection**: Identifies common security anti-patterns
- **Best Practices**: Suggests security improvements
- **Performance Impact**: Minimal overhead with intelligent caching

### Vulnerability Highlighting
- **Inline Annotations**: Security issues highlighted directly in code
- **Severity Levels**: Critical, High, Medium, Low classifications
- **Quick Fixes**: Automated fixes for common vulnerabilities
- **Documentation Links**: Direct links to security documentation

### Security Best Practices Suggestions
- **Code Review**: Automated security code review
- **Compliance Checks**: Industry standard compliance verification
- **Secure Coding**: Guidelines for secure development practices
- **Framework-specific**: Tailored recommendations for different frameworks

### Automated Dependency Scanning
- **Package Analysis**: Scans npm, pip, composer, and other package managers
- **Vulnerability Database**: Checks against known vulnerability databases
- **License Compliance**: Identifies license conflicts and restrictions
- **Update Recommendations**: Suggests secure package updates

## Usage

### Basic Scanning
1. Open a file or project
2. The extension automatically scans for security issues
3. View results in the Problems panel (Ctrl+Shift+M)
4. Click on issues to see detailed information and fixes

### Manual Scanning
1. Right-click in the editor
2. Select "CYBERRAZOR: Scan File" or "CYBERRAZOR: Scan Project"
3. View results in the CYBERRAZOR panel

### Security Dashboard
1. Open Command Palette (Ctrl+Shift+P)
2. Type "CYBERRAZOR: Open Security Dashboard"
3. View comprehensive security overview

### Command Palette Commands
- \`CYBERRAZOR: Scan Current File\`
- \`CYBERRAZOR: Scan Project\`
- \`CYBERRAZOR: Open Security Dashboard\`
- \`CYBERRAZOR: Generate Security Report\`
- \`CYBERRAZOR: Configure Settings\`

## Integration

### Git Integration
The extension integrates with Git to provide:
- **Pre-commit Hooks**: Automatic security scanning before commits
- **Branch Analysis**: Security comparison between branches
- **Commit History**: Track security improvements over time

### CI/CD Integration
\`\`\`yaml
# GitHub Actions example
name: Security Scan
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run CYBERRAZOR Security Scan
        uses: cyberrazor/vscode-action@v1
        with:
          api-key: \${{ secrets.CYBERRAZOR_API_KEY }}
\`\`\`

### Team Collaboration
- **Shared Settings**: Team-wide security configuration
- **Security Reports**: Exportable security assessment reports
- **Notification System**: Real-time security alerts for teams

## Supported Languages and Frameworks

### Languages
- **JavaScript/TypeScript**: Node.js, React, Vue, Angular
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot, Maven, Gradle
- **C#**: .NET Core, ASP.NET
- **PHP**: Laravel, Symfony, WordPress
- **Go**: Gin, Echo, Fiber
- **Ruby**: Rails, Sinatra

### Frameworks and Libraries
- **Web Frameworks**: Express, Koa, Hapi, Fastify
- **Database**: MongoDB, PostgreSQL, MySQL, Redis
- **Authentication**: JWT, OAuth, Passport
- **Security**: Helmet, CORS, Rate Limiting

## Troubleshooting

### Common Issues

#### Extension Not Loading
- Restart VS Code
- Check extension is enabled
- Verify VS Code version compatibility

#### API Key Issues
- Verify API key is correct
- Check internet connectivity
- Ensure account is active

#### Performance Issues
- Adjust scan frequency settings
- Exclude large files/directories
- Increase VS Code memory allocation

#### False Positives
- Configure custom rules
- Adjust sensitivity settings
- Report issues to support

### Debug Mode
Enable debug mode for detailed logging:
\`\`\`json
{
  "cyberrazor.debugMode": true,
  "cyberrazor.logLevel": "debug"
}
\`\`\`

### Support Channels
- **Email**: support@cyberrazor.com
- **Documentation**: https://docs.cyberrazor.com/vscode
- **GitHub Issues**: https://github.com/cyberrazor/vscode-extension/issues
- **Discord Community**: https://discord.gg/cyberrazor

## Security and Privacy

### Data Handling
- **Local Processing**: Most analysis happens locally
- **Encrypted Transmission**: All API communications are encrypted
- **No Code Storage**: Source code is never stored on our servers
- **GDPR Compliant**: Full compliance with data protection regulations

### Permissions
The extension requires the following permissions:
- **File System Access**: To read and analyze your code
- **Network Access**: To fetch threat intelligence updates
- **Workspace Access**: To provide project-wide security analysis

## License
This extension is licensed under the MIT License. See LICENSE file for details.

## Version History
- **v1.0.0**: Initial release with basic security scanning
- **v1.1.0**: Added real-time analysis and vulnerability highlighting
- **v1.2.0**: Enhanced dependency scanning and CI/CD integration
- **v1.3.0**: Added security dashboard and team collaboration features`

export default function CyberRazorLanding() {
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
          <div className="flex items-center">
            <div className="relative group">
              <Button 
                variant="secondary" 
                size="icon" 
                className="size-8"
                onClick={() => window.location.href = '/login'}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Let's Secure
              </div>
            </div>
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
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full justify-center">
              <div className="relative group">
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/login';
                  }}
                  variant="secondary"
                  size="icon"
                  className="size-8"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </Button>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Let's Secure
                </div>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-20">
        <GridBackgroundDemo className="absolute inset-0">
          <div className="relative z-20 container mx-auto px-4 text-center flex-1 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto space-y-8">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 animate-pulse">
                🔒 Next-Gen Cyber Defense
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-tight font-orbitron">
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

              <div className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-orbitron font-light mt-8">
                <DecryptedText
                  text="AI-powered threat detection and real-time cyber defense"
                  speed={15}
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,- "
                  maxIterations={8}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16 mb-20">
                <GlowingButton
                  size="lg"
                  className="text-lg px-10 py-6 group font-orbitron font-bold tracking-wide"
                  onClick={() => scrollToSection("contact")}
                >
                  <DecryptedText text="DEPLOY DEFENSE" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />
                </GlowingButton>
                <GlowingButton
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-6 font-orbitron font-bold tracking-wide"
                  onClick={() => scrollToSection("services")}
                >
                  <DecryptedText text="EXPLORE ARSENAL" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />
                </GlowingButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
                  },
                ].map((stat, index) => (
                  <FloatingCard key={index} className="p-6 text-center bg-slate-900/30">
                    <stat.icon className={cn("h-10 w-10 mx-auto mb-3", stat.color)} />
                    <div className="text-2xl font-bold text-white mb-1 font-orbitron">
                      <DecryptedText text={stat.label} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%/" />
                    </div>
                    <div className="text-slate-400 font-orbitron font-light">{stat.desc}</div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </div>
        </GridBackgroundDemo>
      </section>

      {/* Developer Tools Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <DecryptedText text="Developer Arsenal" animateOn="view" />
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Integrate CYBERRAZOR's powerful cybersecurity tools directly into your development workflow with our open-source modules and extensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

            {/* VS Code Extension */}
            <FloatingCard className="group overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:scale-110">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    <DecryptedText text="VS Code Extension" />
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base leading-relaxed">
                  Enhance your coding security with real-time threat detection, vulnerability scanning, and automated security recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-slate-400 font-mono">VS Code Marketplace</span>
                    </div>
                    <code className="text-blue-400 font-mono text-lg block">
                      CYBERRAZOR Security Scanner
                    </code>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Real-time code security analysis",
                      "Vulnerability highlighting", 
                      "Security best practices suggestions",
                      "Automated dependency scanning"
                    ].map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-400 group-hover:text-slate-300 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <DocumentationModal 
                    title="VS Code Extension Documentation" 
                    content={vscodeExtensionDoc}
                  >
                    <GlowingButton variant="secondary" className="w-full">
                      View Documentation
                    </GlowingButton>
                  </DocumentationModal>
                </div>
              </CardContent>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-slate-900/50 to-black">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <DecryptedText text="Elite Cyber Warriors" animateOn="view" />
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Our certified cybersecurity specialists combine decades of experience in advanced persistent threat
              hunting, digital forensics, and next-generation defense strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Hiba Sharif",
                role: "Cybersecurity Specialist",
                expertise: "Advanced penetration testing and vulnerability discovery",
                linkedin: "https://www.linkedin.com/in/hiba-s-257a25264/",
                specialIcon: Shield,
              },
              {
                name: "Nisa Iqbal",
                role: "Backend Developer",
                expertise: "Security infrastructure and database management",
                linkedin: "https://www.linkedin.com/in/nisa-iqbal/",
                specialIcon: Shield,
              },
              {
                name: "Ramla Junaid",
                role: "Frontend Developer",
                expertise: "Security dashboard and user experience design",
                linkedin: "https://www.linkedin.com/in/ramla-junaid-42626127a/",
                specialIcon: Shield,
              },
              {
                name: "Vira Siddiqui",
                role: "Content and Technical Developer",
                expertise: "Documentation & Research",
                linkedin: "https://www.linkedin.com/in/vira-siddiqui-523b90265/",
                specialIcon: Shield,
              },
            ].map((member, index) => (
              <SpotlightCard key={index} className="text-center group" spotlightColor="rgba(59, 130, 246, 0.2)">
                <h3 className="text-xl font-bold text-white mb-1">
                  <DecryptedText text={member.name} />
                </h3>
                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-slate-400 text-sm mb-4">{member.expertise}</p>
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-cyan-900/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <DecryptedText text="Cyber Arsenal" animateOn="view" />
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Comprehensive cybersecurity solutions powered by AI, machine learning, and advanced threat intelligence to
              protect your digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-12">
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
                  "Advanced threat hunting using quantum-enhanced analytics and global intelligence networks.",
                features: [
                  "Quantum threat analysis",
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
                  "Next-generation security architecture design with zero-trust principles and quantum-ready encryption.",
                features: ["Zero-trust design", "Quantum encryption", "Micro-segmentation", "Cloud-native security"],
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <DecryptedText text="Defense Packages" animateOn="view" />
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Choose your cybersecurity solution. From free basic scanning to enterprise-grade AI-powered security, 
              we have the perfect package for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Free Tier",
                price: "$0",
                period: "",
                description: "Basic security scanning for individual users",
                features: [
                  "Run File Scan",
                  "Run Network Monitoring",
                  "Run Limited CIA Audit",
                  "Wazuh Alerts",
                ],
                popular: false,
                color: "from-blue-500/20 to-cyan-500/20",
                buttonText: "Get Started",
              },
              {
                name: "Pro Tier",
                price: "$100",
                period: "/month",
                description: "Advanced AI-powered security for professionals",
                features: [
                  "AI File Scanning (can do playbook thing)",
                  "AI Network Analysis (can block IP too)",
                  "CIA Security Audits (complete)",
                  "Export Scan Summary",
                ],
                popular: true,
                color: "from-blue-600/30 to-cyan-600/30",
                buttonText: "Get Pro",
              },
              {
                name: "Custom",
                price: "Contact",
                period: "",
                description: "Enterprise solutions tailored to your needs",
                features: [
                  "Custom security solutions",
                  "Dedicated support team",
                  "Advanced integrations",
                  "White-label options",
                  "Custom reporting",
                  "Priority support",
                  "On-site deployment",
                  "Training & consultation",
                ],
                popular: false,
                color: "from-blue-700/20 to-cyan-700/20",
                buttonText: "Contact Us",
              },
            ].map((plan, index) => (
              <FloatingCard
                key={index}
                className={cn(
                  "relative group flex flex-col h-full",
                  plan.popular && "border-blue-400/50 scale-105 shadow-2xl shadow-blue-500/20",
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 rounded-lg", plan.color)} />
                <CardHeader className="text-center pb-8 relative z-10">
                  <CardTitle className="text-3xl text-white mb-4">
                    <DecryptedText text={plan.name} />
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-300 text-lg">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10 flex-1 flex flex-col">
                  <ul className="space-y-4 flex-1">
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
                  <div className="mt-6">
                    <GlowingButton
                      className={cn("w-full text-lg py-4", plan.popular && "shadow-xl shadow-blue-500/30")}
                      onClick={() => {
                        if (plan.name === "Custom") {
                          window.location.href = "/appointment";
                        } else if (plan.name === "Pro Tier") {
                          window.location.href = "/checkout";
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
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Introduction and Social Media */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-400 mb-2">Contact Section</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Get in touch
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Write one or two welcoming sentences that encourage contact. Include your response time commitment and highlight your team's readiness to help.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.83 1.466 2.98 3.09 3.343 3.586 2.829-4.048 2.622-7.119 2.622-7.119.268-.422.84-.958.84-.958s-1.794-.05-3.9 1.478c-1.105-2.88-2.73-4.08-4.95-4.32-2.52-.3-4.846.422-6.337 1.8-1.491 1.378-2.43 3.24-2.43 5.4 0 1.174.315 2.16.315 2.16s2.7-.28 5.827-2.547c3.127-2.267 5.827-5.4 5.827-5.4s-1.794 1.174-3.9 1.478c-2.106.304-4.95-.15-6.337-1.8-1.387-1.65-2.43-3.24-2.43-5.4 0-2.16 1.174-4.32 3.9-5.827 2.726-1.507 5.827-1.478 5.827-1.478s.84.536 1.174.958c0 0 .201 3.07 2.622 7.119.363-.496 1.513-2.12 3.343-3.586-3.214-.515-6.034.328-6.384.438-.35.11-.715.2-.715.2s.365-.09.715-.2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Contact Methods Card */}
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="space-y-8">
                {/* Call us */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Call us</h3>
                    <a href="tel:+923152754324" className="text-white underline hover:text-gray-300 transition-colors">
                      +923152754324
                    </a>
                  </div>
                </div>

                {/* Write an email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Write an email</h3>
                    <a href="mailto:cyberrazor0123@gmail.com" className="text-white underline hover:text-gray-300 transition-colors">
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
      <footer className="relative bg-black border-t border-blue-500/20 py-12 overflow-hidden">
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/logo.jpg"
                    alt="CYBERRAZOR Logo"
                    width={40}
                    height={24}
                    className="rounded-lg"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent font-orbitron">
                  <DecryptedText text="CYBERRAZOR" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" />
                </span>
              </div>
              <p className="text-slate-400 text-lg font-orbitron font-light">
                AI-powered threat detection and real-time cyber defense
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-6 font-orbitron">Defense Arsenal</h4>
              <ul className="space-y-3 text-slate-400 font-orbitron font-light">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    AI-Powered SOC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Threat Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Rapid Response
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Penetration Testing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-6 font-orbitron">Command</h4>
              <ul className="space-y-3 text-slate-400 font-orbitron font-light">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    About Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Join Forces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Threat Blog
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
              <h4 className="text-xl font-semibold text-white mb-6 font-orbitron">Security</h4>
              <ul className="space-y-3 text-slate-400 font-orbitron font-light">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Shield
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Terms of Defense
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Security Protocols
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 mt-12 pt-8 text-center">
            <p className="text-slate-400 text-sm font-orbitron font-light">
              &copy; {new Date().getFullYear()} CYBERRAZOR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Target Cursor - only show in services section */}
      {showTargetCursor && <TargetCursor targetSelector=".cursor-target" spinDuration={1.5} hideDefaultCursor={true} />}

    </div>
  )
}
