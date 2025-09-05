"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
}

export default function FloatingCard({ children, className }: FloatingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-slate-900/50 border-blue-500/20 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/20 group",
        className,
      )}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </Card>
  )
}
