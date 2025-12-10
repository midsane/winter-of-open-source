"use client";
import { AlarmClock, Check, Gift, Star, Ticket } from 'lucide-react'
import { JSX } from 'react'
import Image from 'next/image'
import gdscImg from "@/public/gdsc.png"

export interface BadgeType {
  text: string
  icon?: 'clock' | 'check' | 'star' | 'gift' | 'ticket' | 'codeiiest' | "gdsc"
  variant?: 'pink' | 'green' | 'gray' | 'purple' | 'red' | "blue" | "darkGreen"
}

const icons: Record<string, JSX.Element> = {
  clock: <AlarmClock fill='green' size={16} />,
  check: <Check size={16} />,
  star: <Star fill='yellow' size={16} />,
  gift: <Gift fill='pink' size={16} />,
  ticket: <Ticket fill='red' size={16} />,
  codeiiest: <Image width={18} height={18} alt='codeiiest'
    src="https://www.codeiiest.in/assets/logo/codeiiest-logo.png" />,
  gdsc: <Image width={20} height={20} alt='codeiiest'
    src={gdscImg} />

}
const badgeColors: Record<string, string> = {
  pink: 'from-pink-500 to-pink-400',
  green: 'from-[#ffe500] to-[#d1fe17]',
  purple: 'from-purple-600 to-violet-500',
  red: "from-[#f30055ef] to-[#ff005b]",
  gray: 'from-muted/40 to-muted/20',

  // NEW
  blue: 'from-[#3b82f6] to-[#2563eb]',         // bright → deep blue
  darkGreen: 'from-[#065f46] to-[#064e3b]',    // rich deep green gradient
}


export function BannerBadges({ badges }: { badges: BadgeType[] }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center mb-6">
      {badges.map((b, i) => (
        <div
          key={i}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1 justify-center
            rounded-full text-[10px] font-bold uppercase
            bg-gradient-to-r ${badgeColors[b.variant ?? 'gray']}
            text-black shadow shadow-black border border-black
            shadow-sm
          `}
        >
          {b.icon && icons[b.icon]}
          {b.text}
        </div>
      ))}
    </div>
  )
}
