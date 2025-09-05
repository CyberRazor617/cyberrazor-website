"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: "hover" | "view"
  revealDirection?: "left" | "right" | "center"
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  revealDirection = "left",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const scrambleText = () => {
    if (isAnimating) return

    setIsAnimating(true)
    let iterations = 0

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (iterations > index) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      })

      iterations += 1

      if (iterations > text.length + maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setDisplayText(text)
        setIsAnimating(false)
      }
    }, speed)
  }

  useEffect(() => {
    if (animateOn === "view" && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            scrambleText()
            setHasAnimated(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => observer.disconnect()
    }
  }, [animateOn, hasAnimated])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleInteraction = () => {
    if (animateOn === "hover") {
      scrambleText()
    }
  }

  return (
    <span
      ref={elementRef}
      className={cn(parentClassName)}
      onMouseEnter={handleInteraction}
      style={{ cursor: animateOn === "hover" ? "pointer" : "default" }}
    >
      <span className={cn(className, isAnimating && encryptedClassName)}>{displayText}</span>
    </span>
  )
}
