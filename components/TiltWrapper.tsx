"use client"

import React, { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"

interface TiltWrapperProps {
    children: React.ReactNode
    className?: string
    maxTilt?: number
    radius?: string
}

export default function TiltWrapper({ children, className = "", maxTilt = 5, radius = "1.75rem" }: TiltWrapperProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 180, damping: 18 })
    const mouseY = useSpring(y, { stiffness: 180, damping: 18 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`])

    const glarePosX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])
    const glarePosY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])
    const glare = useMotionTemplate`radial-gradient(circle at ${glarePosX} ${glarePosY}, rgba(255,255,255,0.12), transparent 60%)`

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        x.set(mouseXFromCenter / width)
        y.set(mouseYFromCenter / height)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                willChange: "transform",
                borderRadius: radius,
            }}
            className={`relative ${className}`}
        >
            {children}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: glare, borderRadius: radius }}
            />
        </motion.div>
    )
}
