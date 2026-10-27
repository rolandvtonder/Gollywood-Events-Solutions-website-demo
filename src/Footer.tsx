import { BUSINESS, HREF, NAV, SERVICES, whatsappLink } from './site'
import Icon from './Icon'
import Wordmark from './Wordmark'

/*
  Footer, structured after the reference: a CTA band, a rule, the brand column
  beside link columns, a legal bar, and the oversized wordmark fading out at
  the bottom. Ordinary responsive flow, outside the scroll stage.
*/
export default function Footer() {
  const year = new Date().getFullYear()
  const cols = [
    { head: 'Explore', links: NAV.map((n) => ({ t: n.t, href: n.href })) },
    { head: 'Services', links: SERVICES.map((s) => ({ t: s.title, href: HREF.services })) },
    {
      head: 'Contact',
      links: [
        { t: BUSINESS.officePhone, href: `tel:${BUSINESS.officeTel}` },
        { t: 'WhatsApp', href: whatsappLink("Hi Gollywood, I'd like to ask about an event.") },
        { t: 'Instagram', href: BUSINESS.instagram },
      ],
    },
  ]

  return (
    <footer className="bg-ink px-4 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-panel to-ink px-6 pt-12 sm:px-14 sm:pt-14">
        {/* ---- CTA band ---- */}
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-xl">
            <span className="label inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              Now booking
            </span>
            <h2 className="display mt-5 text-4xl sm:text-5xl">
              Your celebration, <em className="text-white/75">our craft</em>
            </h2>
            <p className="mt-3 text-white/60">Weddings, birthdays and corporate functions — styled, furnished and catered.</p>
          </div>
          <a
            href={HREF.contact}
            className="label inline-flex h-13 items-center gap-2.5 rounded-full bg-lime px-7 py-4 font-bold text-ink transition-transform duration-200 hover:scale-[1.03]"
          >
            Get a quote <Icon name="arrow" size={14} />
          </a>
        </div>

        <div className="my-10 h-px bg-white/10" />

        {/* ---- brand + link columns ---- */}
        <div className="flex flex-wrap gap-12">
          <div className="min-w-[240px] flex-[1_1_320px]">
            <Wordmark size={26} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Catering, equipment hire, wedding décor and event planning — one team, from first idea to final toast.
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.head} aria-label={c.head} className="flex-[0_1_170px]">
              <h3 className="label mb-4 text-white/50">{c.head}</h3>
              <ul>
                {c.links.map((l) => (
                  <li key={l.t}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : null)}
                      className="inline-block py-1.5 text-sm text-white/80 transition-colors duration-200 hover:text-lime"
                    >
                      {l.t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-white/50">
          <span>© {year} {BUSINESS.name}. All rights reserved.</span>
          <span>{BUSINESS.website}</span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          aria-hidden="true"
          className="mark select-none text-center leading-none"
          style={{
            fontSize: 'clamp(56px, 15vw, 210px)',
            background: 'linear-gradient(180deg, rgba(165,214,74,0.4) 0%, rgba(165,214,74,0.02) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: -8,
          }}
        >
          GOLLYWOOD
        </div>
      </div>
      <div className="h-6" />
    </footer>
  )
}
