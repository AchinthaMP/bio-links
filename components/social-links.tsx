"use client"

import { motion } from "motion/react"
import { SocialButton } from "@/components/ui/social-button"
import { Github } from "lucide-react"
import { FaSteam, FaSpotify, FaYoutube, FaTiktok } from "react-icons/fa"
import Magnetic from "@/components/Magnetic"

interface SocialLinksProps {
  links?: {
    github?: string
    steam?: string
    spotify?: string
    youtube?: string
    tiktok?: string
  }
  delay?: number
}

const defaultLinks = {
  github: "https://github.com/AchinthaMP",
  steam: "https://steamcommunity.com/profiles/76561199754955028/",
  spotify: "https://open.spotify.com/user/31achqhcnx22advke36lszbn2bka?si=d0e3f1c1d4aa47f0",
  youtube: "https://www.youtube.com/@Mahiru_Edits",
  tiktok: "https://www.tiktok.com/@mahiru_e",
}

export function SocialLinks({ links = defaultLinks, delay = 1 }: SocialLinksProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="flex justify-center flex-wrap gap-3"
    >
      {links.github && (
        <Magnetic strength={0.3}>
          <SocialButton href={links.github} icon={Github} label="GitHub" variant="github" />
        </Magnetic>
      )}

      {links.steam && (
        <Magnetic strength={0.3}>
          <SocialButton href={links.steam} icon={FaSteam} label="Steam" variant="steam" />
        </Magnetic>
      )}

      {links.spotify && (
        <Magnetic strength={0.3}>
          <SocialButton href={links.spotify} icon={FaSpotify} label="Spotify" variant="spotify" />
        </Magnetic>
      )}

      {links.youtube && (
        <Magnetic strength={0.3}>
          <SocialButton href={links.youtube} icon={FaYoutube} label="YouTube" variant="youtube" />
        </Magnetic>
      )}

      {links.tiktok && (
        <Magnetic strength={0.3}>
          <SocialButton href={links.tiktok} icon={FaTiktok} label="TikTok" variant="tiktok" />
        </Magnetic>
      )}
    </motion.div>
  )
}
