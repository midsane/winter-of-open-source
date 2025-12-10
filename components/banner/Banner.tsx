import { useEffect, useState } from 'react'
import { BadgeType, BannerBadges } from './BannerBadges'
import { BannerContainer } from './BannerContainer'
import { RollingNumber } from './RollingNumber'
import { Button } from '../button'

export interface BannerProps {
  serverNow: number
  deadline: number
  title: string
  subtitle: string
  backgroundImage?: string
  badges: BadgeType[]
}

export function Banner({
  serverNow,
  deadline,
  title,
  subtitle,
  backgroundImage,
  badges,
}: BannerProps) {
  const initialRemaining = deadline - serverNow

  const [remaining, setRemaining] = useState(initialRemaining)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1000))
    }, 1000)

    return () => clearInterval(id)
  }, [deadline])

  const totalSeconds = Math.max(0, Math.floor(remaining / 1000))

  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600) % 24
  const days = Math.floor(totalSeconds / 86400)

  return (
    <div className="relative mx-auto w-full max-w-[90%] xl:max-w-[1250px] mt-6">
      <BannerContainer backgroundImage={backgroundImage}>
        <BannerBadges badges={badges} />

        <h1
          className="
          text-center font-black uppercase leading-tight text-2xl sm:text-4xl
          bg-gradient-to-r from-[#d1fe17] via-[#ffe500] to-[#53c546]
          text-transparent bg-clip-text
        "
        >
          {title}
        </h1>
        <div className='justify-center mt-2 items-center flex w-full'>
          <Button text='Checkout out the Repos' link='/repos' />
        </div>
        <h2 className="text-white text-center font-medium tracking-wide mt-2 text-sm sm:text-lg">
          {subtitle}
        </h2>

        <div
          className="
            flex gap-4 justify-center 
            overflow-x-auto no-scrollbar 
            w-full mt-4
          "
        >
          {[
            { label: 'days', value: days },
            { label: 'hours', value: hours },
            { label: 'minutes', value: minutes },
            { label: 'seconds', value: seconds },
          ].map((t) => (
            <div
              key={t.label}
              className="
                flex flex-col items-center justify-center 
                w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-xl backdrop-blur-xl bg-white/5
                border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            >
              <div className="flex gap-1 font-bold text-white text-xl sm:text-3xl">
                {String(t.value)
                  .padStart(2, '0')
                  .split('')
                  .map((d, i) => (
                    <RollingNumber key={i} value={Number(d)} />
                  ))}
              </div>

              <div className="text-[#d1fe17] font-bold uppercase tracking-wide text-[10px] mt-1">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </BannerContainer>
    </div>
  )
}
