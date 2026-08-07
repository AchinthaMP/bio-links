"use client"

import React from "react"
import { motion } from "motion/react"

interface GlowBorderProps {
  children: React.ReactNode
  className?: string
}

export default function GlowBorder({ children, className = "" }: GlowBorderProps) {
  return (
    <div className={`relative p-[2px] group overflow-hidden ${className}`}>
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-[-100%] z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Blurred version for the glow effect */}
      <motion.div
        className="absolute inset-[-100%] z-0 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content wrapper - no background, just structure */}
      <div className="relative z-10 rounded-[inherit]">
        {children}
      </div>
    </div>
  )
}
