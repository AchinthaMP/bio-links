"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface GsapRevealProps {
  children: React.ReactNode
  stagger?: number
  y?: number
  className?: string
}

export default function GsapReveal({ children, stagger = 0.12, y = 44, className = "" }: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = Array.from(el.children)
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y })
      ScrollTrigger.batch(items as Element[], {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger,
            overwrite: true,
          }),
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
