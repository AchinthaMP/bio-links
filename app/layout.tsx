import type React from "react"
import type { Metadata, Viewport } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: {
    default: "Achintha Manodhara - AMV/MV Editor",
    template: "%s | Achintha Manodhara",
  },
  description:
    "Creative video editor specialized in Anime Music Videos and Music Visuals. Bringing stories to life through rhythm, flow, and visual effects.",
  keywords: [
    "Achintha Manodhara",
    "AMV Editor",
    "MV Editor",
    "Video Editing",
    "Anime Music Videos",
    "Visual Effects",
    "Adobe After Effects",
    "Premiere Pro",
    "Motion Graphics",
    "Video Production",
    "Creative Editor",
  ],
  authors: [{ name: "Achintha Manodhara", url: "https://github.com/" }],
  creator: "Achintha Manodhara",
  publisher: "Achintha Manodhara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Achintha Manodhara - AMV/MV Editor",
    description:
      "Creative video editor specialized in Anime Music Videos and Music Visuals. Bringing stories to life through rhythm, flow, and visual effects.",
    siteName: "Achintha Manodhara Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achintha Manodhara - AMV/MV Editor",
    description: "Creative video editor specialized in Anime Music Videos and Music Visuals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e2f" },
  ],
  colorScheme: "dark light",
  category: "technology",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e2f" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
