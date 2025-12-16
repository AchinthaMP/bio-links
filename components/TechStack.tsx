"use client"

import { motion } from "framer-motion"
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiBlender,
    SiSony,
    SiDavinciresolve
} from "react-icons/si"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const tools = [
    {
        name: "After Effects",
        icon: SiAdobeaftereffects,
        color: "text-[#9999FF] hover:bg-[#9999FF]/20",
        description: "VFX & Motion Graphics"
    },
    {
        name: "Premiere Pro",
        icon: SiAdobepremierepro,
        color: "text-[#9999FF] hover:bg-[#9999FF]/20",
        description: "Video Editing"
    },
    {
        name: "Photoshop",
        icon: SiAdobephotoshop,
        color: "text-[#31A8FF] hover:bg-[#31A8FF]/20",
        description: "Image Manipulation"
    },
    {
        name: "Blender",
        icon: SiBlender,
        color: "text-[#F5792A] hover:bg-[#F5792A]/20",
        description: "3D Modeling & Animation"
    },
    {
        name: "DaVinci Resolve",
        icon: SiDavinciresolve,
        color: "text-[#F1F1F1] hover:bg-[#F1F1F1]/20",
        description: "Color Grading"
    },
]

export default function TechStack() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 my-6">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/40 text-xs uppercase tracking-widest font-medium"
            >
                Software Arsenal
            </motion.p>

            <TooltipProvider delayDuration={100}>
                <div className="flex flex-wrap gap-4 justify-center">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.9 + (index * 0.1),
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={`
                    p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md
                    transition-all duration-300 hover:scale-110 hover:-translate-y-1
                    ${tool.color} cursor-pointer group
                  `}>
                                        <tool.icon className="w-6 h-6" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="text-center">
                                        <p className="font-bold">{tool.name}</p>
                                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    ))}
                </div>
            </TooltipProvider>
        </div>
    )
}
