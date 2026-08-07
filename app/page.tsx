"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ExitFullscreenButton from "@/components/ExitFullscreenButton";
import DiscordStatusIndicator from "@/components/DiscordStatusIndicator";
import MediaControls from "@/components/MediaControls";
import { SocialLinks } from "@/components/social-links";
import { useDiscordStatus } from "@/hooks/useDiscordStatus";
import { EntryGate } from "@/components/ui/entry-gate";
import Badges from "@/components/Badges";
import ActivityHistory from "@/components/ActivityHistory";
import AmbientBackground from "@/components/AmbientBackground";
import TiltWrapper from "@/components/TiltWrapper";
import VFXOverlay from "@/components/VFXOverlay";
import GlitchText from "@/components/GlitchText";
import ProfileRing from "@/components/ProfileRing";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorGlow from "@/components/CursorGlow";
import AnimatedCounter from "@/components/AnimatedCounter";
import Marquee from "@/components/Marquee";
import GlassNavbar from "@/components/GlassNavbar";
import SectionHeading from "@/components/SectionHeading";
import GsapReveal from "@/components/GsapReveal";
import { gsap } from "@/lib/gsap";
import {
  Clock,
  Zap,
  Activity,
  Sparkles,
  Film,
  Scissors,
  Layers,
  Wand2,
  ArrowDown,
} from "lucide-react";
import {
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiAdobephotoshop,
  SiBlender,
  SiDavinciresolve,
} from "react-icons/si";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

const stats = [
  { label: "Years Editing", value: 3, suffix: "+", icon: Clock, text: "text-white/70", glow: "rgba(168,85,247,0.28)" },
  { label: "Edits Delivered", value: 100, suffix: "+", icon: Scissors, text: "text-white/70", glow: "rgba(168,85,247,0.22)" },
  { label: "AMVs Crafted", value: 50, suffix: "+", icon: Film, text: "text-white/70", glow: "rgba(168,85,247,0.26)" },
  { label: "Styles Mastered", value: 4, suffix: "", icon: Layers, text: "text-white/70", glow: "rgba(192,132,252,0.18)" },
];

const tools = [
  { name: "After Effects", icon: SiAdobeaftereffects, color: "#9999FF", desc: "VFX, compositing & motion graphics", tag: "VFX" },
  { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF", desc: "Edit, assemble & timeline flow", tag: "Edit" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF", desc: "Thumbnails & scene compositing", tag: "Design" },
  { name: "Blender", icon: SiBlender, color: "#F5792A", desc: "3D scenes & procedural animation", tag: "3D" },
  { name: "DaVinci Resolve", icon: SiDavinciresolve, color: "#F1F1F1", desc: "Color grading & finishing", tag: "Grade" },
];

const ribbonItems = [
  "After Effects",
  "Premiere Pro",
  "Photoshop",
  "Blender",
  "DaVinci Resolve",
  "VFX",
  "Motion Graphics",
  "Color Grading",
  "Sound Sync",
  "Anime Edits",
];

const perfStats = [
  { label: "Rendering", value: 94, color: "bg-white" },
  { label: "VFX Flow", value: 88, color: "bg-purple-400" },
  { label: "Syncing", value: 100, color: "bg-white/70" },
];

export default function ProfileLanding() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(15);
  const [bgMode, setBgMode] = useState<"video" | "still">("video");
  const [showAmbient, setShowAmbient] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { status } = useDiscordStatus(30000);
  const user = status?.user;

  const handleEnter = async () => {
    setHasEntered(true);

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      video.volume = volume / 100;
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Video play failed:", err);
      }
    }

    try {
      const container = document.documentElement;
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      }
    } catch (error) {
      console.log("Interaction side-effects failed:", error);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch((err) => console.log("Video play failed:", err));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const changeVolume = (value: number) => {
    const next = Math.max(0, Math.min(100, value));
    setVolume(next);
    const video = videoRef.current;
    if (video) {
      video.volume = next / 100;
      if (next > 0) {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleBgMode = () => {
    setBgMode((prev) => (prev === "video" ? "still" : "video"));
  };

  const toggleAmbient = () => {
    setShowAmbient((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile-settings");
      const parsed = saved ? JSON.parse(saved) : {};
      if (typeof parsed.showAmbient === "boolean") setShowAmbient(parsed.showAmbient);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile-settings");
      const parsed = saved ? JSON.parse(saved) : {};
      localStorage.setItem("profile-settings", JSON.stringify({ ...parsed, showAmbient }));
    } catch {}
  }, [showAmbient]);

  // GSAP hero parallax + ambient orb drift
  useEffect(() => {
    if (!hasEntered) return

    const ctx = gsap.context(() => {
      gsap.to(".hero-avatar", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".hero-text", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      })
      gsap.to(".orb-1", {
        y: -160,
        ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: 1 },
      })
      gsap.to(".orb-2", {
        y: 160,
        ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: 1 },
      })
    })

    return () => ctx.revert()
  }, [hasEntered])

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 0.9,
      scrollTo: { y: `#${id}`, offsetY: 76 },
      ease: "power2.inOut",
    })
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`fixed inset-0 w-full h-full object-cover brightness-[0.5] -z-10 transition-opacity duration-700 ${
          bgMode === "still" ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/placeholder.jpg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/bg_video.mp4" type="video/mp4" />
      </video>

      {/* Background Still Image (separate asset, used in still mode) */}
      <div
        className={`fixed inset-0 -z-10 transition-opacity duration-700 ${
          bgMode === "still" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Image src="/Still image.jpg" alt="Background" fill className="object-cover brightness-[0.5]" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none -z-[5]" />

      {/* Ambient Visuals */}
      <AmbientBackground enabled={showAmbient} />
      <VFXOverlay />
      <CursorGlow />
      <ScrollProgressBar />

      {/* Media Controls */}
      <MediaControls
        videoRef={videoRef}
        audioRef={videoRef}
        hasEntered={hasEntered}
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        bgMode={bgMode}
        showAmbient={showAmbient}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onVolumeChange={changeVolume}
        onToggleBgMode={toggleBgMode}
        onToggleAmbient={toggleAmbient}
      />

      {/* Entry Gate */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <GlassNavbar />

            {/* ===================== HERO ===================== */}
            <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
              <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                {/* Left: intro copy */}
                <motion.div
                  variants={heroContainer}
                  initial="hidden"
                  animate="visible"
                  className="hero-text text-center lg:text-left flex flex-col items-center lg:items-start"
                >
                  <motion.span
                    variants={heroItem}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.3em] text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    AMV / MV Editor
                  </motion.span>

                  <motion.h1
                    variants={heroItem}
                    className="mt-6 font-display font-bold text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
                  >
                    <GlitchText
                      text="Achintha"
                      className="block bg-gradient-to-b from-white via-white to-purple-200 bg-clip-text text-transparent deep-glow-text"
                    />
                    <GlitchText
                      text="Manodhara"
                      className="block text-white/60"
                    />
                  </motion.h1>

                  <motion.p
                    variants={heroItem}
                    className="mt-6 text-white/55 text-base md:text-lg leading-relaxed max-w-md"
                  >
                    Bringing stories to life through rhythm, flow, and visual effects — one frame at a time in the world of AMV &amp; MV.
                  </motion.p>

                  <motion.div variants={heroItem} className="mt-8">
                    <SocialLinks />
                  </motion.div>

                  <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <button
                      onClick={() => scrollToSection("arsenal")}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm deep-glow deep-glow-hover hover:scale-[1.04] active:scale-95 transition-all cursor-pointer"
                    >
                      <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Explore the arsenal
                    </button>
                    <button
                      onClick={() => scrollToSection("activity")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/10 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                    >
                      <Activity className="w-4 h-4" />
                      Live activity
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right: avatar card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.9, ease: easeOutExpo }}
                  className="hero-avatar flex justify-center"
                >
                  <TiltWrapper maxTilt={7} radius="2.5rem" className="w-full max-w-sm">
                    <Card className="!bg-black/30 backdrop-blur-2xl border-white/10 overflow-hidden rounded-[2.5rem] border-t-white/20 deep-glow-card">
                      <div className="p-8 text-center space-y-6">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 180, damping: 14 }}
                          className="relative mx-auto w-32 h-32"
                        >
                          <div className="relative w-full h-full">
                            <ProfileRing />

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
                              animate={{
                                scale: [1.18, 1.22, 1.18],
                                rotate: [0, 360],
                              }}
                              transition={{
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                              }}
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

                        <Badges />

                        <div>
                          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                            Currently
                          </p>
                          <p className="text-white/80 text-sm mt-1">
                            {status?.presence.spotify?.song
                              ? `Listening to ${status.presence.spotify.song}`
                              : status?.presence.primaryActivity?.name
                                ? `Playing ${status.presence.primaryActivity.name}`
                                : "Editing the next banger"}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </TiltWrapper>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                onClick={() => scrollToSection("stats")}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 text-white/35 hover:text-white/70 transition-colors"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </section>

            {/* ===================== SKILLS RIBBON ===================== */}
            <div className="relative py-6 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <Marquee speed={34}>
                {ribbonItems.map((item) => (
                  <span key={item} className="flex items-center gap-8 mx-4 whitespace-nowrap font-display text-white/50 uppercase tracking-widest text-sm">
                    {item}
                    <Sparkles className="w-4 h-4 text-purple-400/60" />
                  </span>
                ))}
              </Marquee>
            </div>

            {/* ===================== STATS ===================== */}
            <section id="stats" className="py-16 sm:py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <SectionHeading
                  kicker="Track record"
                  title="The numbers behind the edits"
                  description="Every cut, transition and color pass adds up. Here's the state of the craft."
                />
                <GsapReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {stats.map((stat) => (
                    <TiltWrapper key={stat.label} maxTilt={5} className="h-full">
                      <Card className="relative h-full !bg-black/25 backdrop-blur-xl border-white/10 p-6 rounded-[1.75rem] hover:border-purple-400/40 transition-colors overflow-hidden">
                        <div
                          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none"
                          style={{ background: stat.glow }}
                        />
                        <stat.icon className={`w-6 h-6 mb-4 ${stat.text}`} />
                        <AnimatedCounter
                          to={stat.value}
                          suffix={stat.suffix}
                          duration={2}
                          className="font-display text-4xl font-bold text-white tabular-nums"
                        />
                        <p className="text-white/45 text-[11px] uppercase tracking-widest font-mono mt-2">
                          {stat.label}
                        </p>
                      </Card>
                    </TiltWrapper>
                  ))}
                </GsapReveal>
              </div>
            </section>

            {/* ===================== ARSENAL ===================== */}
            <section id="arsenal" className="py-16 sm:py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <SectionHeading
                  kicker="Toolkit"
                  title="Software Arsenal"
                  description="The tools behind every frame — from first cut to final grade."
                />
                <GsapReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                  {tools.map((tool) => (
                    <TiltWrapper key={tool.name} maxTilt={6} className="h-full">
                      <Card className="h-full !bg-black/25 backdrop-blur-xl border-white/10 p-5 rounded-[1.75rem] hover:border-purple-400/40 transition-colors group">
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                            <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                          </div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-2 py-0.5">
                            {tool.tag}
                          </span>
                        </div>
                        <h3 className="font-display text-white font-semibold leading-tight">
                          {tool.name}
                        </h3>
                        <p className="text-white/40 text-xs mt-1.5 leading-relaxed">
                          {tool.desc}
                        </p>
                      </Card>
                    </TiltWrapper>
                  ))}
                </GsapReveal>
              </div>
            </section>

            {/* ===================== ACTIVITY ===================== */}
            <section id="activity" className="py-16 sm:py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <SectionHeading
                  kicker="Live dashboard"
                  title="What I'm up to right now"
                  description="Real-time presence, engine metrics and recent activity — all in one glance."
                />
                <GsapReveal className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Real-time Pulse */}
                  <TiltWrapper maxTilt={3} className="h-full">
                    <Card className="h-full !bg-black/25 backdrop-blur-xl border-white/10 p-6 rounded-[1.75rem] hover:border-purple-400/40 transition-colors space-y-5">
                      <div className="flex items-center gap-3 text-white/50 border-b border-white/10 pb-4">
                        <Activity className="w-4 h-4 text-white/60" />
                        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Real-time Pulse</span>
                        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE
                        </span>
                      </div>
                      <DiscordStatusIndicator />
                    </Card>
                  </TiltWrapper>

                  {/* Performance Engine */}
                  <TiltWrapper maxTilt={3} className="h-full">
                    <Card className="h-full !bg-black/25 backdrop-blur-xl border-white/10 p-6 rounded-[1.75rem] hover:border-purple-400/40 transition-colors space-y-5">
                      <div className="flex items-center gap-3 text-white/50 border-b border-white/10 pb-4">
                        <Zap className="w-4 h-4 text-white/60" />
                        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Performance Engine</span>
                      </div>
                      <div className="space-y-5">
                        {perfStats.map((stat) => (
                          <div key={stat.label} className="space-y-2">
                            <div className="flex justify-between text-[10px] text-white/40 font-mono">
                              <span>{stat.label}</span>
                              <AnimatedCounter
                                to={stat.value}
                                suffix="%"
                                duration={1.8}
                                className="text-white/80 tabular-nums"
                              />
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${stat.value}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 1.5, ease: easeOutExpo }}
                                className={`h-full ${stat.color} shadow-[0_0_12px_rgba(168,85,247,0.45)]`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TiltWrapper>

                  {/* Recent Activity */}
                  <TiltWrapper maxTilt={3} className="h-full">
                    <Card className="h-full !bg-black/25 backdrop-blur-xl border-white/10 p-6 rounded-[1.75rem] hover:border-purple-400/40 transition-colors">
                      <div className="flex items-center gap-3 text-white/50 border-b border-white/10 pb-4 mb-4">
                        <Scissors className="w-4 h-4 text-purple-300/80" />
                        <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Recent Activity</span>
                      </div>
                      <ActivityHistory />
                      <p className="text-white/30 text-[11px] font-mono leading-relaxed mt-4">
                        {"> Live Discord activity appears here when you're online."}
                      </p>
                    </Card>
                  </TiltWrapper>
                </GsapReveal>
              </div>
            </section>

            {/* ===================== FOOTER ===================== */}
            <footer className="py-12 px-4">
              <div className="max-w-6xl mx-auto text-center space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Crafted with Next.js <span className="text-purple-400">·</span> Motion <span className="text-purple-400">·</span> GSAP
                </p>
                <p className="text-white/40 text-xs">
                  © {new Date().getFullYear()} Achintha Manodhara — AMV / MV Editor
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-1/4 left-1/4 w-[34rem] h-[34rem] bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] bg-white/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Exit Fullscreen Button */}
      <ExitFullscreenButton />
    </div>
  );
}
