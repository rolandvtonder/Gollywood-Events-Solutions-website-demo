import { SERVICES, quoteFor } from '../site'
import Icon from '../Icon'
import Reveal from '../Reveal'

const EVENT_TYPE: Record<string, string> = {
  weddings: 'Wedding',
  birthdays: 'Birthday',
  corporate: 'Corporate function',
  catering: 'Catering only',
}

export default function Services() {
  return (
    <section aria-label="Our services" className="px-4 pb-24 pt-8 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-panel">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" aria-hidden="true" />
                  <span className="label absolute left-6 top-6 rounded-full bg-ink/70 px-3 py-1.5 text-white/90 backdrop-blur">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 pt-2 sm:p-9 sm:pt-3">
                  <h2 className="display text-4xl sm:text-5xl">{s.title}</h2>
                  <p className="mt-4 leading-relaxed text-white/75">{s.blurb}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-3 text-sm text-white/85 sm:grid-cols-2">
                    {s.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5">
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-lime" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={quoteFor(EVENT_TYPE[s.id])}
                    className="label mt-8 inline-flex h-12 w-fit items-center gap-3 rounded-full border border-white/35 pl-5 pr-2 transition-colors duration-200 hover:border-lime hover:text-lime"
                  >
                    Enquire about {s.title.toLowerCase()}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                      <Icon name="arrow" size={14} />
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
