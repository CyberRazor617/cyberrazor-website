"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary"
  onClick?: () => void
  size?: "sm" | "default" | "lg"
}

export default function GlowingButton({
  children,
  className,
  variant = "primary",
  onClick,
  size = "default",
  ...props
}: GlowingButtonProps) {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={cn(
        "relative overflow-hidden transition-all duration-300 group",
        variant === "primary" && [
          "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
          "shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40",
          "border border-blue-400/50 hover:border-blue-300/70",
        ],
        variant === "secondary" && [
          "bg-transparent border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10",
          "hover:border-blue-400/70 hover:text-blue-300",
          "shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20",
        ],
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
    </Button>
  )
}
