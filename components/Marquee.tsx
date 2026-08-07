"use client"

import React from "react"
import { motion } from "motion/react"

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  reverse?: boolean
  className?: string
}

export default function Marquee({ children, speed = 22, reverse = false, className = "" }: MarqueeProps) {
  const content = React.Children.toArray(children)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  )
}
