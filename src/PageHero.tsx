import type { ReactNode } from 'react'
import { motion } from 'motion/react'

/*
  The banner that opens every inner page: a photograph with the same ink
  scrims as the home stage, a slow push-in on load, and the page's h1. It is
  the home page's opening scene in miniature, so moving between pages feels
  like one site.
*/
export default function PageHero({
  eyebrow,
  title,
  intro,
  img,
  pos = '50% 50%',
}: {
  eyebrow: string
  title: ReactNode
  intro: string
  img: string
  pos?: string
}) {
  return (
    <header className="relative isolate flex min-h-[460px] items-end overflow-hidden px-4 pb-14 pt-36 sm:min-h-[560px] sm:px-10 sm:pb-20 lg:min-h-[64vh]">
      <motion.img
        src={img}
        alt=""
        fetchPriority="high"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: pos }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,10,7,0.88) 0%, rgba(6,10,7,0.55) 45%, rgba(6,10,7,0.2) 100%), linear-gradient(180deg, rgba(10,15,11,0.3) 0%, rgba(10,15,11,0) 40%, var(--color-ink) 100%)',
        }}
      />
      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-10 bg-lime" aria-hidden="true" />
          <span className="label text-lime">{eyebrow}</span>
        </div>
        <h1 className="display mt-5 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
      </motion.div>
    </header>
  )
}
