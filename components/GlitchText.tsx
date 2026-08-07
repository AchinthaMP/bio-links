"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative inline-block cursor-default group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Text */}
      <span className={`relative z-10 block ${className}`}>{text}</span>
      
      {/* Glitch Layers */}
      <span className={`absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-70 z-0 text-purple-400 pointer-events-none translate-x-[2px] translate-y-[-1px] transition-opacity duration-200 ${className} !bg-none !text-purple-400`}>
        {text}
      </span>
      <span className={`absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-70 z-0 text-white/70 pointer-events-none translate-x-[-2px] translate-y-[1px] transition-opacity duration-200 ${className} !bg-none !text-white/70`}>
        {text}
      </span>

      {/* Animated Glitch Layers (Visible only on hover) */}
      {isHovered && (
        <>
          <motion.span
            className={`absolute top-0 left-0 w-full h-full opacity-50 z-[1] !bg-none text-purple-300`}
            animate={{
              x: [-1, 2, -2, 1, 0],
              y: [1, -1, 1, 0, -1],
              clipPath: [
                "inset(10% 0 80% 0)",
                "inset(40% 0 40% 0)",
                "inset(70% 0 10% 0)",
                "inset(0% 0 0% 0)",
              ]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {text}
          </motion.span>
          <motion.span
            className={`absolute top-0 left-0 w-full h-full opacity-50 z-[1] !bg-none text-white/60`}
            animate={{
              x: [1, -2, 2, -1, 0],
              y: [-1, 1, -1, 0, 1],
              clipPath: [
                "inset(80% 0 10% 0)",
                "inset(40% 0 40% 0)",
                "inset(10% 0 80% 0)",
                "inset(0% 0 0% 0)",
              ]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  )
}
