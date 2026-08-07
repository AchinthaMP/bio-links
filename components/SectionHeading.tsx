"use client"

import { motion } from "motion/react"

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
  align?: "left" | "center"
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignCls =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`flex flex-col ${alignCls} mb-12`}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-purple-300/80"
      >
        <span className="w-6 h-px bg-gradient-to-r from-purple-400 to-transparent" />
        {kicker}
        {align === "center" && (
          <span className="w-6 h-px bg-gradient-to-l from-purple-400 to-transparent" />
        )}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mt-3"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/50 max-w-xl mt-3 text-sm md:text-base leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
