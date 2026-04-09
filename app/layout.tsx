import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LARAIB SILVER'S",
  description: "Premium Silver & Gold Jewelry Collection - Artisanal Craftsmanship",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;600;700&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <style>{`
          html { font-family: 'Outfit', sans-serif; scroll-behavior: smooth; }
        `}</style>
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}

