import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner";

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
    icon: "https://www.google.com/imgres?q=codeiiest%20iiest%20shibpur&imgurl=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FC4D0BAQG-KyN1mhcriw%2Fcompany-logo_200_200%2Fcompany-logo_200_200%2F0%2F1630526391291%3Fe%3D2147483647%26v%3Dbeta%26t%3D209daXI6hwAdKdN05P1uefz7Midm4175uG9yYxMNd_0&imgrefurl=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fcodeiiest-iiest&docid=olqkksHQ4BUmDM&tbnid=o2agvZ0wkEwPpM&vet=12ahUKEwij_fX-iZyRAxU1yqACHVxZAM4QM3oECBkQAA..i&w=200&h=200&hcb=2&ved=2ahUKEwij_fX-iZyRAxU1yqACHVxZAM4QM3oECBkQAA",
  },
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


