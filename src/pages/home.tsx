import { mountPage } from '../Layout'
import Stage from '../Stage'
import Reveal, { SectionHead } from '../Reveal'
import Icon from '../Icon'
import { HREF, u } from '../site'

/*
  Home: the scroll-choreographed stage, then one row that hands visitors on
  to the four section pages.
*/

const EXPLORE = [
  { t: 'Services', d: 'Weddings, birthdays, corporate functions and catering.', href: HREF.services, img: u('assets/svc-weddings.webp') },
  { t: 'Equipment hire', d: 'Chairs, tableware, chafing dishes, lights and arches.', href: HREF.hire, img: u('assets/hire-chairs.webp') },
  { t: 'Gallery', d: 'Table settings, décor and venue styling ideas.', href: HREF.gallery, img: u('assets/g-4.webp') },
  { t: 'Get a quote', d: 'Tell us about your event and we’ll reply on WhatsApp.', href: HREF.contact, img: u('assets/g-1.webp') },
]

function Explore() {
  return (
    <section aria-labelledby="explore-title" className="px-4 pb-8 pt-20 sm:px-10 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          id="explore-title"
          eyebrow="Explore"
          title={
            <>
              Where would you like <em>to start?</em>
            </>
          }
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPLORE.map((e, i) => (
            <li key={e.t}>
              <Reveal delay={i * 0.06} className="h-full">
                <a
                  href={e.href}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[32px] border border-white/10 p-6"
                >
                  <img
                    src={e.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/5"
                  />
                  <span className="display text-4xl">{e.t}</span>
                  <span className="mt-2 text-sm leading-relaxed text-white/75">{e.d}</span>
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/15 backdrop-blur transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink"
                  >
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

mountPage(<Explore />, <Stage />)
