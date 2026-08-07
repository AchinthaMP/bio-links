"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useDragControls } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Volume2, VolumeX, Settings, Monitor, Sparkles, RotateCcw, Play, Pause, Image as ImageIcon, GripVertical, Menu, X } from "lucide-react"

interface MediaControlsProps {
    videoRef: React.RefObject<HTMLVideoElement>
    audioRef: React.RefObject<HTMLMediaElement>
    hasEntered: boolean
    isPlaying: boolean
    isMuted: boolean
    volume: number
    bgMode: "video" | "still"
    showAmbient: boolean
    onTogglePlay: () => void
    onToggleMute: () => void
    onVolumeChange: (value: number) => void
    onToggleBgMode: () => void
    onToggleAmbient: () => void
}

interface SettingsState {
    brightness: number
    contrast: number
    saturation: number
    blur: number
    autoplay: boolean
    hasSeenStillImage: boolean
}

const defaultSettings: SettingsState = {
    brightness: 50,
    contrast: 100,
    saturation: 100,
    blur: 0,
    autoplay: true,
    hasSeenStillImage: false,
}

export default function MediaControls({
    videoRef,
    hasEntered,
    isPlaying,
    isMuted,
    volume,
    bgMode,
    showAmbient,
    onTogglePlay,
    onToggleMute,
    onVolumeChange,
    onToggleBgMode,
    onToggleAmbient,
}: MediaControlsProps) {
    const [showSettings, setShowSettings] = useState(false)
    const [isExpanded, setIsExpanded] = useState(true)
    const [settings, setSettings] = useState<SettingsState>(defaultSettings)
    const dragControls = useDragControls()

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("profile-settings")
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings)
                setSettings({ ...defaultSettings, ...parsed })
            } catch (error) {
                console.error("Failed to parse saved settings:", error)
            }
        }
    }, [])

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("profile-settings", JSON.stringify(settings))
    }, [settings])

    // Apply video effects
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current
            video.style.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) blur(${settings.blur}px)`
        }
    }, [settings.brightness, settings.contrast, settings.saturation, settings.blur, videoRef])

    const resetSettings = () => {
        setSettings(defaultSettings)
    }

    const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }))
    }

    const handleToggleBgMode = () => {
        onToggleBgMode()
        if (!settings.hasSeenStillImage) {
            updateSetting("hasSeenStillImage", true)
        }
    }

    if (!hasEntered) return null

    const dockBtn = "rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300"

    return (
        <>
            {/* Control Dock */}
            <motion.div
                layout
                drag
                dragControls={dragControls}
                dragListener={false}
                dragMomentum={false}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-40 flex flex-row items-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-2.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
                {/* Drag Handle & Expand Toggle */}
                <div className="flex items-center">
                    <div 
                        className="flex items-center justify-center w-6 h-8 text-white/30 hover:text-white/70 cursor-grab active:cursor-grabbing touch-none"
                        onPointerDown={(e) => dragControls.start(e)}
                    >
                        <GripVertical className="w-4 h-4" />
                    </div>
                    <Button onClick={() => setIsExpanded(!isExpanded)} variant="ghost" size="sm" className={dockBtn} title={isExpanded ? "Collapse" : "Expand"}>
                        {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </Button>
                </div>

                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                            animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                            exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-row items-center gap-1 sm:gap-1.5 overflow-hidden whitespace-nowrap"
                        >
                            {/* Play / Pause */}
                            <Button onClick={onTogglePlay} variant="ghost" size="sm" title={isPlaying ? "Pause" : "Play"} className={dockBtn}>
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>

                            {/* Mute */}
                            <Button onClick={onToggleMute} variant="ghost" size="sm" title={isMuted ? "Unmute" : "Mute"} className={dockBtn}>
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </Button>

                            {/* Horizontal Volume */}
                            <div className="flex w-16 sm:w-24 items-center justify-center mx-0.5 sm:mx-1">
                                <Slider
                                    value={[volume]}
                                    onValueChange={([value]) => onVolumeChange(value)}
                                    max={100}
                                    step={1}
                                    className="w-full"
                                />
                            </div>

                            {/* Background: Video / Still toggle */}
                            <div className="relative">
                                {bgMode === "video" && !settings.hasSeenStillImage && (
                                    <span className="absolute top-0.5 right-0.5 flex h-2 w-2 z-10 pointer-events-none">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                    </span>
                                )}
                                <Button onClick={handleToggleBgMode} variant="ghost" size="sm" title={bgMode === "video" ? "Show still image" : "Show video"} className={`${dockBtn} ${bgMode === "still" ? "bg-purple-500/15 border-purple-400/50 text-white" : "hover:border-purple-400/50 hover:text-purple-300"}`}>
                                    {bgMode === "video" ? <ImageIcon className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                                </Button>
                            </div>

                            {/* Ambient toggle */}
                            <Button onClick={onToggleAmbient} variant="ghost" size="sm" title={showAmbient ? "Hide ambient effects" : "Show ambient effects"} className={`${dockBtn} ${showAmbient ? "bg-purple-500/15 border-purple-400/50 text-white" : ""}`}>
                                <Sparkles className="w-4 h-4" />
                            </Button>

                            {/* Settings */}
                            <Popover open={showSettings} onOpenChange={setShowSettings}>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" title="Settings" className={`${dockBtn} ${showSettings ? "bg-purple-500/15 border-purple-400/50 text-white" : ""}`}>
                                        <Settings className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent 
                                    side="top" 
                                    align="end" 
                                    sideOffset={24}
                                    className="p-0 border-none bg-transparent shadow-none w-[22rem] max-w-[calc(100vw-2rem)]"
                                >
                                    <Card className="rounded-2xl border-purple-500/25 bg-black/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.12)]">
                                        <div className="p-6 space-y-6">
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                                                        <Settings className="w-4 h-4 text-white" />
                                                    </span>
                                                    <h3 className="font-display text-lg font-semibold text-white tracking-tight">Settings</h3>
                                                </div>
                                                <Button
                                                    onClick={resetSettings}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-white/50 hover:text-white hover:bg-white/10"
                                                >
                                                    <RotateCcw className="w-4 h-4 mr-1" />
                                                    Reset
                                                </Button>
                                            </div>

                                            {/* Audio Settings */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Volume2 className="w-4 h-4 text-blue-400" />
                                                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Audio</span>
                                                </div>

                                                <div className="space-y-3 pl-6">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <label className="text-white/80 text-sm">Volume</label>
                                                            <span className="font-mono text-white/60 text-xs tabular-nums">{volume}%</span>
                                                        </div>
                                                        <Slider
                                                            value={[volume]}
                                                            onValueChange={([value]) => onVolumeChange(value)}
                                                            max={100}
                                                            step={1}
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <label className="text-white/80 text-sm">Autoplay</label>
                                                        <Switch
                                                            checked={settings.autoplay}
                                                            onCheckedChange={(checked) => updateSetting("autoplay", checked)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Video Settings */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Monitor className="w-4 h-4 text-purple-400" />
                                                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Video</span>
                                                </div>

                                                <div className="space-y-3 pl-6">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <label className="text-white/80 text-sm">Brightness</label>
                                                            <span className="font-mono text-white/60 text-xs tabular-nums">{settings.brightness}%</span>
                                                        </div>
                                                        <Slider
                                                            value={[settings.brightness]}
                                                            onValueChange={([value]) => updateSetting("brightness", value)}
                                                            max={200}
                                                            min={10}
                                                            step={5}
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <label className="text-white/80 text-sm">Contrast</label>
                                                            <span className="font-mono text-white/60 text-xs tabular-nums">{settings.contrast}%</span>
                                                        </div>
                                                        <Slider
                                                            value={[settings.contrast]}
                                                            onValueChange={([value]) => updateSetting("contrast", value)}
                                                            max={200}
                                                            min={50}
                                                            step={5}
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <label className="text-white/80 text-sm">Saturation</label>
                                                            <span className="font-mono text-white/60 text-xs tabular-nums">{settings.saturation}%</span>
                                                        </div>
                                                        <Slider
                                                            value={[settings.saturation]}
                                                            onValueChange={([value]) => updateSetting("saturation", value)}
                                                            max={200}
                                                            min={0}
                                                            step={5}
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <label className="text-white/80 text-sm">Blur</label>
                                                            <span className="font-mono text-white/60 text-xs tabular-nums">{settings.blur}px</span>
                                                        </div>
                                                        <Slider
                                                            value={[settings.blur]}
                                                            onValueChange={([value]) => updateSetting("blur", value)}
                                                            max={10}
                                                            min={0}
                                                            step={0.5}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    )
}
