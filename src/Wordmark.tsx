/*
  The Gollywood logotype, rebuilt as live type so it stays crisp on the dark
  page: the lime GOLLYWOOD over a widely tracked EVENTS SOLUTIONS, as on the
  flyer.
*/
export default function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="inline-flex flex-col leading-none" aria-label="Gollywood Events Solutions">
      <span aria-hidden="true" className="mark text-lime" style={{ fontSize: size, letterSpacing: '0.06em' }}>
        GOLLYWOOD
      </span>
      <span
        aria-hidden="true"
        className="text-white/80"
        style={{ fontSize: size * 0.3, letterSpacing: '0.52em', marginTop: size * 0.18, fontWeight: 600 }}
      >
        EVENTS SOLUTIONS
      </span>
    </span>
  )
}
