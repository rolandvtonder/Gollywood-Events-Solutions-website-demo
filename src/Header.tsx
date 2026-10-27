import { useEffect, useState } from 'react'
import { HREF, NAV } from './site'
import Icon from './Icon'
import Wordmark from './Wordmark'

/*
  The navbar sits outside the scaled artboard, at natural size, so it stays
  readable at any width. Unlike the reference it is fixed rather than part of
  the stage, because every page shares it.
  Under 768px the links fold into a menu button.
*/

/** Whether a nav link is the page being viewed. */
const here = (href: string) => window.location.pathname.replace(/\/?$/, '/') === href
export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* A gradient rather than a bar, so the header never draws a hard seam
          across the photography. The same gradient masks the blur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px]"
        style={{
          background: 'linear-gradient(180deg, rgba(8,12,9,0.82) 0%, rgba(8,12,9,0.45) 50%, rgba(8,12,9,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 45%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 45%, transparent 100%)',
        }}
      />
      <nav aria-label="Main" className="relative flex items-center gap-8 px-4 pt-4 sm:px-10 sm:pt-6">
        <a href={HREF.home} className="shrink-0 rounded-md" aria-label="Gollywood Events Solutions, home">
          <Wordmark size={22} />
        </a>
        <ul className="hidden flex-1 justify-center gap-12 md:flex">
          {NAV.map((n) => (
            <li key={n.t}>
              <a
                href={n.href}
                aria-current={here(n.href) ? 'page' : undefined}
                className={`label border-b py-2 transition-colors duration-200 hover:text-lime ${
                  here(n.href) ? 'border-lime text-lime' : 'border-transparent text-white/80'
                }`}
              >
                {n.t}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={HREF.contact}
          className="label ml-auto hidden h-11 items-center gap-2 rounded-full bg-lime px-5 text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] md:inline-flex md:ml-0"
        >
          Get a quote
        </a>
        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="relative mx-4 mt-3 rounded-3xl border border-white/15 bg-ink-2/95 p-3 backdrop-blur md:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.t}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={here(n.href) ? 'page' : undefined}
                  className={`flex h-12 items-center justify-between rounded-2xl px-4 text-base hover:bg-white/5 ${
                    here(n.href) ? 'bg-white/5 text-lime' : 'text-white/90'
                  }`}
                >
                  {n.t}
                  <Icon name="arrow" size={16} className="text-lime" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={HREF.contact}
            onClick={() => setOpen(false)}
            className="label mt-2 flex h-12 items-center justify-center rounded-full bg-lime text-ink"
          >
            Get a quote
          </a>
        </div>
      )}
    </header>
  )
}
