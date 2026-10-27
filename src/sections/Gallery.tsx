import { useCallback, useEffect, useRef, useState } from 'react'
import { BUSINESS, GALLERY } from '../site'
import Icon from '../Icon'
import Reveal from '../Reveal'

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
  }, [])
  const step = useCallback((d: number) => setOpen((i) => (i == null ? i : (i + d + GALLERY.length) % GALLERY.length)), [])

  useEffect(() => {
    if (open == null) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  return (
    <section aria-label="Photo gallery" className="px-4 pb-24 pt-8 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-lg text-white/70">Tap any photo to see it full size.</p>
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noreferrer"
            className="label inline-flex h-12 items-center gap-2.5 rounded-full border border-white/30 px-5 transition-colors duration-200 hover:border-lime hover:text-lime"
          >
            <Icon name="instagram" size={16} /> More on Instagram
          </a>
        </div>

        <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <li key={g.src} className="mb-5 break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget
                    setOpen(i)
                  }}
                  aria-label={`Open photo: ${g.alt}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10"
                >
                  <img
                    src={g.src}
                    alt=""
                    loading="lazy"
                    width={g.w}
                    height={g.h}
                    className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {open != null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${open + 1} of ${GALLERY.length}`}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/95 p-4 backdrop-blur"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <img src={GALLERY[open].src} alt={GALLERY[open].alt} className="max-h-[82vh] max-w-full rounded-2xl object-contain" />
          <p className="label mt-4 text-white/60" aria-live="polite">
            {open + 1} / {GALLERY.length}
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/60 hover:border-lime"
          >
            <Icon name="close" size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/60 hover:border-lime sm:left-6"
          >
            <Icon name="chevL" size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/60 hover:border-lime sm:right-6"
          >
            <Icon name="chevR" size={20} />
          </button>
        </div>
      )}
    </section>
  )
}
