"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { gsap } from "@/lib/gsap"

const links = [
  { id: "home", label: "Home" },
  { id: "stats", label: "Stats" },
  { id: "arsenal", label: "Arsenal" },
  { id: "activity", label: "Activity" },
]

export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (id: string) => {
    setActive(id)
    gsap.to(window, {
      duration: 0.9,
      scrollTo: { y: `#${id}`, offsetY: 76 },
      ease: "power2.inOut",
    })
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <button onClick={() => go("home")} className="flex items-center gap-3 group cursor-pointer">
          <span className="w-9 h-9 rounded-xl bg-white/5 border border-purple-400/50 flex items-center justify-center font-display font-bold text-white text-sm shadow-[0_0_22px_rgba(168,85,247,0.4)] backdrop-blur-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
            AM
          </span>
          <span className="font-display text-white font-semibold tracking-tight hidden sm:block">
            Achintha&nbsp;Manodhara
          </span>
        </button>

        <div className="flex items-center gap-0 sm:gap-1 overflow-x-auto no-scrollbar mask-edge-fade">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 whitespace-nowrap rounded-full text-xs sm:text-sm transition-all cursor-pointer ${
                active === link.id
                  ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(168,85,247,0.55),0_0_18px_rgba(168,85,247,0.3)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}
