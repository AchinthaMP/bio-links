"use client"

import { motion, useScroll, useSpring } from "motion/react"

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-white via-purple-300 to-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.9)]"
    />
  )
}
