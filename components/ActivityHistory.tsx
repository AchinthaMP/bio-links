"use client"

import { motion } from "framer-motion"
import { useActivityHistory, HistoryItem } from "@/hooks/useActivityHistory"
import { useDiscordStatus } from "@/hooks/useDiscordStatus"
import { Music, History, ExternalLink, Hash, Gamepad2, Zap, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

export default function ActivityHistory() {
  const { status } = useDiscordStatus()
  const history = useActivityHistory(
    status?.presence.primaryActivity,
    status?.presence.spotify
  )

  if (history.length <= 1) return null

  return (
    <div className="space-y-4">
      <div className="px-1">
        <h2 className="text-white font-bold text-sm tracking-tight">Recent activity</h2>
        <p className="text-white/40 text-[10px]">
          You&apos;ll see your activity from the last 30 days here.
        </p>
      </div>

      <div className="space-y-2">
        {history.slice(1, 3).map((item, index) => (
          <motion.div
            key={`${item.id}-${item.timestamp}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex items-center gap-4 p-4 rounded-xl bg-[#1e1f22]/60 border border-white/5 hover:bg-[#2b2d31]/80 transition-all duration-200"
          >
            {/* Large Activity Icon */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
              {item.icon ? (
                <Image
                  src={
                    item.icon.startsWith('http') 
                      ? item.icon 
                      : item.icon.startsWith('mp:external/')
                        ? `https://media.discordapp.net/external/${item.icon.replace('mp:external/', '')}`
                        : `https://cdn.discordapp.com/app-assets/${item.appId || (item.name === 'Visual Studio Code' ? '383226320970055681' : '')}/${item.icon}.png`
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    // Hide the image if it still fails
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {item.type === "spotify" ? <Music className="w-6 h-6 text-green-400" /> : <Gamepad2 className="w-6 h-6 text-white/20" />}
                </div>
              )}
            </div>

            {/* Activity Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-white text-[13px] font-bold uppercase tracking-wide truncate">
                  {item.name}
                </p>
                <button className="text-white/20 hover:text-white/60 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              {item.details && (
                <p className="text-white/70 text-[11px] truncate leading-tight mb-1">
                  {item.details}
                </p>
              )}

              <div className="flex items-center gap-2 text-white/40 text-[10px] mt-1">
                {item.type === "spotify" ? (
                  <Music className="w-3 h-3" />
                ) : (
                  <Gamepad2 className="w-3 h-3" />
                )}
                <span>
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }).replace('about ', '')}
                </span>
                
                {/* Mock Streak for visual accuracy to screenshot */}
                {index === 0 && item.type === "activity" && (
                   <div className="flex items-center gap-1 ml-1 text-yellow-500/80">
                      <Zap className="w-3 h-3 fill-yellow-500" />
                      <span className="font-bold">5x Streak</span>
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
