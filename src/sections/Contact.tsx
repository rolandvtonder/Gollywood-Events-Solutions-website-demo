import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { BUSINESS, EVENT_TYPES, HIRE, HREF, whatsappLink } from '../site'
import { useQuoteItems } from '../quoteItems'
import Icon from '../Icon'
import Reveal from '../Reveal'

/*
  The quote request. Nothing is sent to a server: on submit the details are
  written into a WhatsApp message to the business, and the visitor only has to
  press send.
*/

type Errors = Partial<Record<'name' | 'type', string>>

const inputCls =
  'h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-base text-white placeholder:text-white/35 transition-colors duration-200 focus:border-lime focus:outline-none aria-[invalid=true]:border-red-400'

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/85">
        {label}
        {required && <span className="text-lime"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

/* "Enquire about weddings" on the services page arrives as ?event=Wedding */
function initialEventType() {
  const t = new URLSearchParams(window.location.search).get('event') ?? ''
  return EVENT_TYPES.includes(t) ? t : ''
}

export default function Contact() {
  const { items: selected, toggle: onToggle } = useQuoteItems()
  const [eventType, setEventType] = useState(initialEventType)
  const uid = useId()
  const f = (k: string) => `${uid}-${k}`
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const typeRef = useRef<HTMLSelectElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const name = String(d.get('name') ?? '').trim()
    const next: Errors = {}
    if (!name) next.name = 'Please tell us your name so we know who to reply to.'
    if (!eventType) next.type = 'Choose the kind of event, or "Other".'
    setErrors(next)
    if (next.name) return nameRef.current?.focus()
    if (next.type) return typeRef.current?.focus()

    const items = HIRE.filter((h) => selected.includes(h.id)).map((h) => h.name)
    const lines = [
      `Hi Gollywood, I'd like a quote.`,
      ``,
      `Name: ${name}`,
      `Event: ${eventType}`,
      d.get('date') && `Date: ${d.get('date')}`,
      d.get('guests') && `Guests: ${d.get('guests')}`,
      d.get('venue') && `Venue / area: ${d.get('venue')}`,
      items.length > 0 && `Hire items: ${items.join(', ')}`,
      d.get('message') && `\n${d.get('message')}`,
    ].filter(Boolean)
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section aria-label="Request a quote" className="px-4 pb-24 pt-8 sm:px-10 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">
              Talk to <em>us</em>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">
              Fill in the form and WhatsApp opens with your details ready to send, or reach us directly.
            </p>
            <ul className="mt-8 grid gap-3">
              <li>
                <a
                  href={`tel:${BUSINESS.officeTel}`}
                  className="flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors duration-200 hover:border-lime/60"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
                    <Icon name="phone" size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/55">Office</span>
                    <span className="font-semibold">{BUSINESS.officePhone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hi Gollywood, I'd like to ask about an event.")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors duration-200 hover:border-lime/60"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
                    <Icon name="chat" size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/55">WhatsApp</span>
                    <span className="font-semibold">Chat with us</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors duration-200 hover:border-lime/60"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
                    <Icon name="instagram" size={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/55">Instagram</span>
                    <span className="font-semibold">@gollywoodevents</span>
                  </span>
                </a>
              </li>
              {BUSINESS.email && (
                <li>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex min-h-16 items-center gap-4 rounded-2xl border border-white/10 bg-panel px-5 transition-colors duration-200 hover:border-lime/60"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
                      <Icon name="globe" size={18} />
                    </span>
                    <span>
                      <span className="block text-xs text-white/55">Email</span>
                      <span className="font-semibold">{BUSINESS.email}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <form noValidate onSubmit={onSubmit} className="glass grid gap-5 rounded-[32px] p-6 sm:grid-cols-2 sm:p-10">
            <Field id={f('name')} label="Your name" required error={errors.name}>
              <input
                ref={nameRef}
                id={f('name')}
                name="name"
                autoComplete="name"
                className={inputCls}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${f('name')}-err` : undefined}
              />
            </Field>
            <Field id={f('type')} label="Type of event" required error={errors.type}>
              <select
                ref={typeRef}
                id={f('type')}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className={`${inputCls} cursor-pointer appearance-none bg-[length:16px] bg-[right_16px_center] bg-no-repeat`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a5d64a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? `${f('type')}-err` : undefined}
              >
                <option value="" className="bg-ink">
                  Choose one…
                </option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={f('date')} label="Event date">
              <input id={f('date')} name="date" type="date" className={`${inputCls} [color-scheme:dark]`} />
            </Field>
            <Field id={f('guests')} label="Number of guests">
              <input id={f('guests')} name="guests" type="number" inputMode="numeric" min={1} placeholder="e.g. 120" className={inputCls} />
            </Field>
            <div className="sm:col-span-2">
              <Field id={f('venue')} label="Venue or area">
                <input id={f('venue')} name="venue" autoComplete="address-level2" placeholder="Venue name or suburb" className={inputCls} />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-semibold text-white/85">Hire items</p>
              {selected.length === 0 ? (
                <p className="text-sm text-white/55">
                  None yet —{' '}
                  <a href={HREF.hire} className="text-lime underline underline-offset-4">
                    add items from the catalogue
                  </a>
                  .
                </p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {HIRE.filter((h) => selected.includes(h.id)).map((h) => (
                    <li key={h.id}>
                      <button
                        type="button"
                        onClick={() => onToggle(h.id)}
                        aria-label={`Remove ${h.name}`}
                        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-lime/50 bg-lime/10 pl-4 pr-3 text-sm hover:bg-lime/20"
                      >
                        {h.name}
                        <Icon name="close" size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="sm:col-span-2">
              <Field id={f('message')} label="Anything else?">
                <textarea
                  id={f('message')}
                  name="message"
                  rows={4}
                  placeholder="Theme, colours, menu ideas, budget…"
                  className={`${inputCls} h-auto py-3`}
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                className="label inline-flex h-13 cursor-pointer items-center gap-2.5 rounded-full bg-lime px-7 py-4 font-bold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Icon name="chat" size={16} /> Send on WhatsApp
              </button>
              <p role="status" className="text-sm text-white/70">
                {sent ? 'WhatsApp opened with your details — just press send.' : 'Opens WhatsApp with your details filled in.'}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
