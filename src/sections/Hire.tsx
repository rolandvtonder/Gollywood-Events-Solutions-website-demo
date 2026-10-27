import { useState } from 'react'
import { HIRE, HIRE_CATEGORIES, HREF, type HireCategory } from '../site'
import { useQuoteItems } from '../quoteItems'
import Icon from '../Icon'
import Reveal from '../Reveal'

/*
  The hire catalogue. Items added here are remembered (see quoteItems.ts) and
  listed on the contact page, which carries them into the WhatsApp message.
*/
export default function Hire() {
  const { items: selected, toggle: onToggle } = useQuoteItems()
  const [filter, setFilter] = useState<HireCategory | 'All'>('All')
  const items = filter === 'All' ? HIRE : HIRE.filter((h) => h.cat === filter)

  return (
    <section aria-label="Hire catalogue" className="px-4 pb-24 pt-8 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-7xl">

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2.5">
          {(['All', ...HIRE_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`h-11 cursor-pointer rounded-full border px-5 text-sm font-semibold transition-colors duration-200 ${
                filter === c ? 'border-lime bg-lime text-ink' : 'border-white/20 text-white/80 hover:border-white/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((h) => {
            const on = selected.includes(h.id)
            return (
              <li key={h.id}>
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-panel transition-colors duration-300 ${
                    on ? 'border-lime/70' : 'border-white/10'
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={h.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="label absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] text-white/90 backdrop-blur">
                      {h.cat}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold">{h.name}</h2>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/65">{h.note}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xs text-white/55">Price on request</span>
                      <button
                        type="button"
                        aria-pressed={on}
                        aria-label={on ? `Remove ${h.name} from quote` : `Add ${h.name} to quote`}
                        onClick={() => onToggle(h.id)}
                        className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
                          on ? 'bg-lime text-ink' : 'border border-white/30 text-white hover:border-lime hover:text-lime'
                        }`}
                      >
                        <Icon name={on ? 'check' : 'plus'} size={16} />
                        {on ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <Reveal>
          <div
            aria-live="polite"
            className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-panel px-6 py-5"
          >
            <p className="text-white/80">
              {selected.length === 0
                ? 'Need something not listed? Ask us — we stock far more than fits on a page.'
                : `${selected.length} item${selected.length > 1 ? 's' : ''} added to your quote.`}
            </p>
            <a
              href={HREF.contact}
              className="label inline-flex h-12 items-center gap-2 rounded-full bg-lime px-6 font-bold text-ink transition-transform duration-200 hover:scale-[1.03]"
            >
              {selected.length ? 'Continue to quote' : 'Ask about hire'} <Icon name="arrow" size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
