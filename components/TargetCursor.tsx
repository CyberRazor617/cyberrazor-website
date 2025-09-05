"use client"

import type React from "react"
import { useEffect, useRef, useCallback, useMemo } from "react"

export interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null)
  const spinTl = useRef<any>(null)

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    [],
  )

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return

    // Simple CSS transform instead of GSAP
    cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }, [])

  useEffect(() => {
    if (!cursorRef.current) return

    const originalCursor = document.body.style.cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none"
    }

    const cursor = cursorRef.current
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner")

    let activeTarget: Element | null = null
    let currentTargetMove: ((ev: Event) => void) | null = null
    let currentLeaveHandler: (() => void) | null = null
    let isAnimatingToTarget = false
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null
    let animationId: number | null = null

    const cleanupTarget = (target: Element) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove)
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler)
      }
      currentTargetMove = null
      currentLeaveHandler = null
    }

    // Set initial position
    cursor.style.transform = `translate(${window.innerWidth / 2}px, ${window.innerHeight / 2}px) translate(-50%, -50%)`

    // Create spin animation
    const createSpinAnimation = () => {
      let rotation = 0
      const animate = () => {
        if (!activeTarget && cursorRef.current) {
          rotation += 360 / (spinDuration * 60) // 60fps
          cursorRef.current.style.transform = `translate(${cursorRef.current.style.transform.match(/translate$$([^)]+)$$/)?.[1] || "0px, 0px"}) translate(-50%, -50%) rotate(${rotation}deg)`
        }
        animationId = requestAnimationFrame(animate)
      }
      animationId = requestAnimationFrame(animate)
    }

    createSpinAnimation()

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY)
    window.addEventListener("mousemove", moveHandler)

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return

      const rect = cursorRef.current.getBoundingClientRect()
      const mouseX = rect.left + rect.width / 2
      const mouseY = rect.top + rect.height / 2

      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY)
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget)

      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler()
        }
      }
    }

    window.addEventListener("scroll", scrollHandler, { passive: true })

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element
      const allTargets: Element[] = []
      let current = directTarget
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current)
        }
        current = current.parentElement!
      }

      const target = allTargets[0] || null
      if (!target || !cursorRef.current || !cornersRef.current) return
      if (activeTarget === target) return

      if (activeTarget) {
        cleanupTarget(activeTarget)
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTarget = target

      // Stop spinning
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      cursorRef.current.style.transform = cursorRef.current.style.transform.replace(/rotate$$[^)]*$$/, "rotate(0deg)")

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect()
        const cursorRect = cursorRef.current!.getBoundingClientRect()
        const cursorCenterX = cursorRect.left + cursorRect.width / 2
        const cursorCenterY = cursorRect.top + cursorRect.height / 2

        const corners = Array.from(cornersRef.current!)
        const { borderWidth, cornerSize, parallaxStrength } = constants

        const tlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        }
        const trOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        }
        const brOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        }
        const blOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        }

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2
          const targetCenterY = rect.top + rect.height / 2
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength

          tlOffset.x += mouseOffsetX
          tlOffset.y += mouseOffsetY
          trOffset.x += mouseOffsetX
          trOffset.y += mouseOffsetY
          brOffset.x += mouseOffsetX
          brOffset.y += mouseOffsetY
          blOffset.x += mouseOffsetX
          blOffset.y += mouseOffsetY
        }

        const offsets = [tlOffset, trOffset, brOffset, blOffset]
        corners.forEach((corner, index) => {
          const element = corner as HTMLElement
          element.style.transition = "transform 0.2s ease-out"
          element.style.transform = `translate(${offsets[index].x}px, ${offsets[index].y}px)`
        })
      }

      isAnimatingToTarget = true
      updateCorners()
      setTimeout(() => {
        isAnimatingToTarget = false
      }, 1)

      let moveThrottle: number | null = null
      const targetMove = (ev: Event) => {
        if (moveThrottle || isAnimatingToTarget) return
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent
          updateCorners(mouseEvent.clientX, mouseEvent.clientY)
          moveThrottle = null
        })
      }

      const leaveHandler = () => {
        activeTarget = null
        isAnimatingToTarget = false

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current)
          const { cornerSize } = constants
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ]

          corners.forEach((corner, index) => {
            const element = corner as HTMLElement
            element.style.transition = "transform 0.3s ease-out"
            element.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`
          })
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current) {
            createSpinAnimation()
          }
          resumeTimeout = null
        }, 50)

        cleanupTarget(target)
      }

      currentTargetMove = targetMove
      currentLeaveHandler = leaveHandler
      target.addEventListener("mousemove", targetMove)
      target.addEventListener("mouseleave", leaveHandler)
    }

    window.addEventListener("mouseover", enterHandler, { passive: true })

    return () => {
      window.removeEventListener("mousemove", moveHandler)
      window.removeEventListener("mouseover", enterHandler)
      window.removeEventListener("scroll", scrollHandler)
      if (activeTarget) {
        cleanupTarget(activeTarget)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      document.body.style.cursor = originalCursor
    }
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute left-1/2 top-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/50"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-blue-400 transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 shadow-lg shadow-blue-400/30"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-blue-400 transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 shadow-lg shadow-blue-400/30"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-blue-400 transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 shadow-lg shadow-blue-400/30"
        style={{ willChange: "transform" }}
      />
      <div
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 border-[3px] border-blue-400 transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 shadow-lg shadow-blue-400/30"
        style={{ willChange: "transform" }}
      />
    </div>
  )
}

export default TargetCursor
