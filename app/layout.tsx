import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "CYBERRAZOR - Elite Cyber Defense",
  description: "Advanced cybersecurity solutions with military-grade protection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
