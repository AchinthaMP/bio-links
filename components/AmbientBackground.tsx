"use client"

import { useEffect, useRef } from "react"

interface AmbientBackgroundProps {
    enabled?: boolean
    className?: string
}

interface Star {
    x: number
    y: number
    vx: number
    vy: number
    r: number
    twinkle: number
    phase: number
    hue: "white" | "purple"
}

export default function AmbientBackground({ enabled = true, className = "" }: AmbientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        let width = window.innerWidth
        let height = window.innerHeight
        let raf = 0
        let stars: Star[] = []
        const mouse = { x: -9999, y: -9999 }

        const count = Math.min(110, Math.floor((width + height) / 20))

        const init = () => {
            stars = Array.from({ length: count }).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.6 + 0.4,
                twinkle: Math.random() * 0.03 + 0.01,
                phase: Math.random() * Math.PI * 2,
                hue: Math.random() > 0.75 ? "purple" : "white",
            }))
        }

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            init()
        }

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        const onLeave = () => {
            mouse.x = -9999
            mouse.y = -9999
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < stars.length; i++) {
                // Constellation lines between nearby stars
                for (let j = i + 1; j < stars.length; j++) {
                    const a = stars[i]
                    const b = stars[j]
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const dist = Math.hypot(dx, dy)
                    if (dist < 140) {
                        const opacity = (1 - dist / 140) * 0.22
                        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`
                        ctx.lineWidth = 0.6
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                }

                // Line toward cursor when near
                const mDist = Math.hypot(stars[i].x - mouse.x, stars[i].y - mouse.y)
                if (mDist < 160) {
                    const opacity = (1 - mDist / 160) * 0.35
                    ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`
                    ctx.lineWidth = 0.8
                    ctx.beginPath()
                    ctx.moveTo(stars[i].x, stars[i].y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            }

            for (const s of stars) {
                s.x += s.vx
                s.y += s.vy
                s.phase += s.twinkle
                if (s.x < -10) s.x = width + 10
                if (s.x > width + 10) s.x = -10
                if (s.y < -10) s.y = height + 10
                if (s.y > height + 10) s.y = -10

                const alpha = 0.2 + (Math.sin(s.phase) * 0.5 + 0.5) * 0.5
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
                ctx.fillStyle =
                    s.hue === "purple" ? `rgba(192, 132, 252, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
                ctx.fill()
            }

            raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseout", onLeave)

        if (enabled) {
            raf = requestAnimationFrame(draw)
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseout", onLeave)
        }
    }, [enabled])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
                enabled ? "opacity-100" : "opacity-0"
            } ${className}`}
        />
    )
}
