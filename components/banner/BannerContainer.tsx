import { CSSProperties, ReactNode } from 'react'

type Props = {
  backgroundImage?: string
  children: ReactNode
}

export function BannerContainer({ backgroundImage, children }: Props) {
  const style: CSSProperties = {
    backgroundImage: backgroundImage
      ? `url(${backgroundImage})`
      : 'radial-gradient(circle at top, rgba(70,30,120,0.55), rgba(10,10,16,0.95))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div
      className="
        relative w-full rounded-2xl sm:rounded-[2rem] overflow-hidden
        shadow-[0_0_35px_-10px_rgba(137,88,255,0.35)]
      "
    >
      <div
        className="
          relative rounded-2xl sm:rounded-[1.9rem] overflow-hidden
          backdrop-blur-xl
          shadow-[inset_0_0_30px_rgba(0,0,0,0.35)]
          px-5 sm:px-8 py-10 sm:py-14
        "
        style={style}
      >
        <div className="absolute inset-0 bg-primary/50 dark:bg-sidebar/60" />

        {!backgroundImage && (
          <>
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/30 blur-3xl rounded-full" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/30 blur-3xl rounded-full" />
          </>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
