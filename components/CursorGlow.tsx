"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export default function CursorGlow() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const springX = useSpring(x, { stiffness: 80, damping: 25 })
  const springY = useSpring(y, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [x, y])

  return (
    <motion.div
      className="fixed z-[3] pointer-events-none w-[600px] h-[600px] rounded-full"
      style={{
        x: "-50%",
        y: "-50%",
        left: springX,
        top: springY,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(168,85,247,0.05) 35%, transparent 70%)",
      }}
    />
  )
}
