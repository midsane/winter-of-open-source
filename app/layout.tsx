import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner";
import { Footer } from "@/components/footer"
import favicon from "@/public/images/favicon.png"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "winter of open source",
  icons: {
    icon: favicon.src
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${figtree.variable} ${geistMono.variable} font-sans antialiased`}>
        <Toaster theme="dark" richColors position="top-center" />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__app_id = '${process.env.NEXT_PUBLIC_APP_ID}';
            `,
          }} />
        <Analytics />
      </body>
    </html>
  )
}


