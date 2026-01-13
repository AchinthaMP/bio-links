"use client"

import { motion } from "framer-motion"

export default function ProfileRing() {
  return (
    <div className="absolute inset-[-10px] pointer-events-none">
      {/* Decorative Rotating Ring */}
      <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="0.5"
          strokeDasharray="10 5"
          className="opacity-40"
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Smaller Counter-Rotating Ring */}
      <svg className="absolute inset-[-5px] w-full h-full animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="0.2"
          strokeDasharray="2 10"
          className="opacity-30"
        />
      </svg>
    </div>
  )
}
