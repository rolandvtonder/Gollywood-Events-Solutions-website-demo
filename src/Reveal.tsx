import type { ReactNode } from 'react'
import { motion } from 'motion/react'

/** Fades a block up once as it enters view. Reduced motion is handled by the
    MotionConfig in App, which drops the transform and keeps the fade. */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Section heading: lime rule + eyebrow, then the display title. */
export function SectionHead({ eyebrow, title, intro, id }: { eyebrow: string; title: ReactNode; intro?: string; id: string }) {
  return (
    <Reveal className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-0.5 w-10 bg-lime" aria-hidden="true" />
        <span className="label text-lime">{eyebrow}</span>
      </div>
      <h2 id={id} className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{intro}</p>}
    </Reveal>
  )
}
