"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ExitFullscreenButton from "@/components/ExitFullscreenButton";
import DiscordStatusIndicator from "@/components/DiscordStatusIndicator";
import MediaControls from "@/components/MediaControls";
import { SocialLinks } from "@/components/social-links";
import { useDiscordStatus } from "@/hooks/useDiscordStatus";
import { EntryGate } from "@/components/ui/entry-gate";
import Badges from "@/components/Badges";
import TechStack from "@/components/TechStack";
import ActivityHistory from "@/components/ActivityHistory";
import ParticlesBackground from "@/components/ParticlesBackground";
import TiltWrapper from "@/components/TiltWrapper";
import VFXOverlay from "@/components/VFXOverlay";
import GlitchText from "@/components/GlitchText";
import ProfileRing from "@/components/ProfileRing";
import ShinyButton from "@/components/ShinyButton";
import { Clock, Zap, Target, Star, Layers, Activity } from "lucide-react";

export default function ProfileLanding() {
  const [hasEntered, setHasEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { status } = useDiscordStatus(30000);
  const user = status?.user;

  const handleEnter = async () => {
    setHasEntered(true);
    
    try {
      const container = document.documentElement;

      if (container.requestFullscreen) {
        await container.requestFullscreen();
      }

      // Try to play video and audio
      if (videoRef.current) {
        videoRef.current.muted = false; // UNMUTE after interaction
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
      }
    } catch (error) {
      console.log("Interaction side-effects failed:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.15;
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover brightness-[0.55] -z-10"
        autoPlay
        loop
        muted // Muted by default for autoplay
        playsInline
        poster="/placeholder.jpg"
      >
        <source
          src="/bg_video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Gradient Overlay for seamless bottom */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none -z-[5]" />

      {/* Ambient Visuals */}
      <ParticlesBackground />
      <VFXOverlay />

      {/* Media Controls */}
      <MediaControls
        videoRef={videoRef}
        audioRef={videoRef}
        hasEntered={hasEntered}
      />

      {/* Main Content Transition */}
      <AnimatePresence>
        {!hasEntered && (
          <EntryGate
            key="entry-gate"
            show={true}
            onEnter={handleEnter}
            title="Click To Enter..."
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasEntered && (
          <motion.div
            key="profile-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 min-h-screen py-12 px-4 md:px-8 lg:px-12 flex items-center justify-center overflow-y-auto"
          >
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              
              {/* Left Column: Bio & Socials (Primary Focus) */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-12 xl:col-span-5 flex flex-col items-center xl:items-start space-y-6"
              >
                <TiltWrapper>
                  <Card className="w-full max-w-md !bg-black/30 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[2.5rem] border-t-white/20">
                    <div className="p-8 text-center space-y-6">
                      {/* Discord-style Profile Picture */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative mx-auto w-28 h-28 mb-2 pt-2"
                      >
                        <div className="relative w-full h-full">
                          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                            <Image
                              src={user?.avatar || "/placeholder.svg"}
                              alt={`${user?.username || 'User'}'s Avatar`}
                              fill
                              className="rounded-full object-cover z-0"
                              unoptimized
                            />
                          </div>

                          <motion.div 
                            className="absolute inset-0 pointer-events-none z-10 scale-[1.18]"
                            animate={{ scale: [1.18, 1.22, 1.18] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Image src="/spirit_embers.png" alt="Decoration" fill className="object-contain" unoptimized />
                          </motion.div>

                          <div className="absolute bottom-1 right-1 z-20">
                            <div className={`w-6 h-6 rounded-full border-4 border-[#1a1b2e] ${status?.presence.status === 'online' ? 'bg-[#43b581]' : status?.presence.status === 'idle' ? 'bg-[#faa61a]' : 'bg-[#747f8d]'} shadow-lg relative`}>
                              {status?.presence.status === 'online' && (
                                <motion.div 
                                  className="absolute inset-0 rounded-full bg-[#43b581]"
                                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <div className="space-y-2">
                        <Badges />
                        <h1 className="text-4xl font-black">
                          <GlitchText 
                            text="Achintha Manodhara" 
                            className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent [text-shadow:0_0_15px_rgba(255,255,255,0.4)]" 
                          />
                        </h1>
                        <p className="text-white/90 text-sm tracking-[0.2em] font-bold uppercase py-1 px-4 bg-white/5 rounded-full inline-block border border-white/5 backdrop-blur-sm">
                          AMV/MV Editor
                        </p>
                      </div>

                      <p className="text-white/60 text-sm leading-relaxed max-w-[280px] mx-auto">
                        Bringing stories to life through rhythm, flow, and visual effects in the world of AMV & MV.
                      </p>

                      <SocialLinks />
                    </div>
                  </Card>
                </TiltWrapper>
              </motion.div>

              {/* Right Column: Dashboard (Status, Metrics, History) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="lg:col-span-12 xl:col-span-7 space-y-6 lg:mt-0 mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status & Metrics combined for a cleaner look */}
                  <div className="flex flex-col gap-6">
                    <Card className="!bg-black/20 backdrop-blur-xl border-white/5 p-5 md:p-6 rounded-[2rem] space-y-6 h-fit transition-all duration-300">
                      <div className="flex items-center gap-3 text-white/50 border-b border-white/5 pb-4">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Real-time Pulse</span>
                      </div>
                      <DiscordStatusIndicator />
                    </Card>

                    <Card className="!bg-black/20 backdrop-blur-xl border-white/5 p-5 md:p-6 rounded-[2rem] space-y-6">
                      <div className="flex items-center gap-3 text-white/50 border-b border-white/5 pb-4">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Performance Engine</span>
                      </div>
                      <div className="space-y-5">
                        {[
                          { label: "Rendering", value: "94%", color: "bg-blue-500" },
                          { label: "VFX Flow", value: "88%", color: "bg-purple-500" },
                          { label: "Syncing", value: "100%", color: "bg-pink-500" }
                        ].map((stat) => (
                          <div key={stat.label} className="space-y-2">
                            <div className="flex justify-between text-[10px] text-white/40 font-mono">
                              <span>{stat.label}</span>
                              <span className="text-white/80">{stat.value}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} animate={{ width: stat.value }}
                                transition={{ delay: 1, duration: 1.5 }}
                                className={`h-full ${stat.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right side of Dashboard: History & Arsenal */}
                  <div className="flex flex-col gap-6">
                    <Card className="!bg-black/20 backdrop-blur-xl border-white/5 p-5 md:p-6 rounded-[2rem] h-fit">
                      <ActivityHistory />
                    </Card>

                    <Card className="!bg-black/20 backdrop-blur-xl border-white/5 p-5 md:p-6 rounded-[2rem] h-fit">
                      <TechStack />
                    </Card>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Exit Fullscreen Button */}
      <ExitFullscreenButton />
    </div>
  );
}
