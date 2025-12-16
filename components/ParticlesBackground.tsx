"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export default function ParticlesBackground() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        // Generate random particles
        const particleCount = 20
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            y: Math.random() * 100, // percentage
            size: Math.random() * 4 + 1, // 1-5px
            duration: Math.random() * 10 + 10, // 10-20s - slower is more ambient
            delay: Math.random() * 5,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white/20 blur-[1px]"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{
                        top: "105%",
                        opacity: 0
                    }}
                    animate={{
                        top: "-5%",
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Additional ambient gradient orbs */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
    )
}
