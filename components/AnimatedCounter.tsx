"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useMotionValue, useMotionValueEvent, useSpring } from "motion/react"

interface AnimatedCounterProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  delay?: number
  className?: string
}

export default function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  delay = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 22 })
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, to, { duration, delay, ease: "easeOut" })
    return () => controls.stop()
  }, [inView, motionValue, to, duration, delay])

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(`${prefix}${Math.round(latest)}${suffix}`)
  })

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
