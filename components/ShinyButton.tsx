"use client"

import { motion } from "framer-motion"
import React from "react"

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-6 py-2 rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium transition-all hover:bg-white/20 hover:border-white/40 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 z-0 bg- gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "linear" }}
      />
    </motion.button>
  )
}
