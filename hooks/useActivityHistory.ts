"use client"

import { useState, useEffect } from "react"

export interface HistoryItem {
  id: string
  appId?: string
  name: string
  details?: string
  state?: string
  timestamp: string
  type: "activity" | "spotify"
  icon?: string
}

export function useActivityHistory(currentActivity: any, spotify: any) {
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("activity-history")
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load history", e)
      }
    }
  }, [])

  // Update history when activity changes
  useEffect(() => {
    if (!currentActivity && !spotify) return

    const newItem: HistoryItem = spotify 
      ? {
          id: spotify.track_id,
          name: spotify.song,
          details: spotify.artist,
          timestamp: new Date().toISOString(),
          type: "spotify",
          icon: spotify.album_art_url
        }
      : {
          id: currentActivity.id || currentActivity.name,
          appId: currentActivity.application_id,
          name: currentActivity.name,
          details: currentActivity.details,
          state: currentActivity.state,
          timestamp: new Date().toISOString(),
          type: "activity",
          icon: currentActivity.assets?.large_image
        }

    setHistory(prev => {
      // Don't add if it's the same as the most recent one (optimization)
      if (prev.length > 0 && prev[0].name === newItem.name && prev[0].details === newItem.details) {
        return prev
      }

      let updated: HistoryItem[]
      
      if (newItem.type === 'spotify') {
        // If it's spotify, remove any previous spotify entries
        const filtered = prev.filter(item => item.type !== 'spotify')
        updated = [newItem, ...filtered]
      } else {
        // For other activities, remove any previous entry with the same name (e.g. "Visual Studio Code")
        const filtered = prev.filter(item => item.name !== newItem.name)
        updated = [newItem, ...filtered]
      }

      const final = updated.slice(0, 3)
      localStorage.setItem("activity-history", JSON.stringify(final))
      return final
    })
  }, [currentActivity, spotify])

  return history
}
