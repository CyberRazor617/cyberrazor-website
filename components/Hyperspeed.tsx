"use client"

import { useEffect, useRef, type FC } from "react"

// Since we can't import Three.js and postprocessing in this environment,
// I'll create a simplified version that mimics the effect
interface HyperspeedProps {
  effectOptions?: {
    colors?: {
      roadColor?: number
      islandColor?: number
      background?: number
      shoulderLines?: number
      brokenLines?: number
      leftCars?: number[]
      rightCars?: number[]
      sticks?: number
    }
  }
}

const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create a CSS-based hyperspeed effect since we can't use Three.js
    const container = containerRef.current
    if (!container) return

    // Create animated lines and particles
    const createLine = (delay: number, duration: number, side: "left" | "right") => {
      const line = document.createElement("div")
      line.className = `absolute w-1 bg-gradient-to-b ${
        side === "left" ? "from-cyan-400 to-transparent" : "from-blue-400 to-transparent"
      } opacity-60`
      line.style.height = "200px"
      line.style.left = side === "left" ? "20%" : "80%"
      line.style.top = "-200px"
      line.style.animationDelay = `${delay}s`
      line.style.animation = `hyperspeed-line ${duration}s linear infinite`

      container.appendChild(line)

      setTimeout(
        () => {
          if (container.contains(line)) {
            container.removeChild(line)
          }
        },
        (duration + delay) * 1000,
      )
    }

    // Create particles
    const createParticle = (delay: number) => {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-blue-400 rounded-full opacity-80"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = "-10px"
      particle.style.animationDelay = `${delay}s`
      particle.style.animation = "hyperspeed-particle 3s linear infinite"

      container.appendChild(particle)

      setTimeout(
        () => {
          if (container.contains(particle)) {
            container.removeChild(particle)
          }
        },
        (3 + delay) * 1000,
      )
    }

    // Create continuous effect
    const interval = setInterval(() => {
      createLine(0, 2, "left")
      createLine(0.5, 2, "right")
      createParticle(Math.random() * 2)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes hyperspeed-line {
          0% {
            transform: translateY(0) scaleY(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 200px)) scaleY(2);
            opacity: 0;
          }
        }
        
        @keyframes hyperspeed-particle {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 20px));
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,20,40,0.8) 50%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        {/* Static road lines */}
        <div className="absolute left-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
        <div className="absolute right-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-400/20 to-transparent" />
      </div>
    </>
  )
}

export default Hyperspeed
