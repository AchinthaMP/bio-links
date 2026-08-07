"use client"

import { motion } from "motion/react"
import Magnetic from "@/components/Magnetic"

interface EntryGateProps {
    show: boolean
    onEnter: () => void
    title?: string
    subtitle?: string
}

export function EntryGate({ show, onEnter, title = "Click To Enter...", subtitle }: EntryGateProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md cursor-pointer overflow-hidden"
            onClick={onEnter}
        >
            {/* Ambient gradient orbs */}
            <motion.div
                className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-r from-purple-600/20 to-purple-800/25 blur-[120px]"
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-40 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-white/5 to-purple-600/15 blur-[120px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative text-center px-6">
                <motion.h2
                    className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(6px)" }}
                    animate={{ opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    {title}
                </motion.h2>

                {subtitle && (
                    <motion.p
                        className="text-white/60 text-sm mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {subtitle}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-10 flex justify-center"
                >
                    <Magnetic strength={0.5}>
                        <div className="relative w-24 h-24">
                            {/* Pulsing rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                                animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                                animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                            />
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                className="absolute inset-3 rounded-full bg-white/5 backdrop-blur-xl border border-purple-400/40 deep-glow flex items-center justify-center"
                            >
                                <svg
                                    className="w-8 h-8 text-white translate-x-[2px]"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>
                        </div>
                    </Magnetic>
                </motion.div>
            </div>
        </motion.div>
    )
}
