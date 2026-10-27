import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { SCROLL_VH, TOTAL_MS, P, G, STAGE, span, ramp, lerp, type Layout } from './scroll'
import { HREF, LIME, u } from './site'
import Icon from './Icon'

/*
  The scroll stage: one pinned scene that scrolling drives like a timeline.

  As in the Marlin reference, the composition is drawn on a fixed artboard at
  design coordinates and scaled, and the photography and scrims are
  viewport-level layers so they always run full-bleed. One deliberate
  difference: the artboard is scaled to FIT (min of width and height) and
  centred, rather than width-locked. The artboard itself is transparent, so
  fitting never shows bars; it only guarantees that no copy or button is
  pushed below the fold on a short laptop window or a phone with its browser
  chrome showing.
*/

const SAFE_L = { desktop: 96, mobile: 24 }

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

const SCENES = [
  { src: u('assets/scene-2.webp'), pos: '50% 38%' },
  { src: u('assets/scene-1.webp'), pos: '50% 50%' },
  { src: u('assets/scene-3.webp'), pos: '50% 45%' },
]

const WORDS = ['Elegant.', 'Effortless.', 'Unforgettable.']

const BODY = {
  desktop: [
    'Weddings, birthdays and corporate functions —',
    'styled, furnished and catered by one team,',
    'from the first chair to the final toast.',
  ],
  mobile: [
    'Weddings, birthdays and corporate',
    'functions — styled, furnished and',
    'catered by one team, from the first',
    'chair to the final toast.',
  ],
}

const ROOF = ['Catering', 'Equipment hire', 'Décor & styling', 'Event planning']

const CARD_LABELS = [
  ['Dream', 'weddings'],
  ['Birthday', 'parties'],
  ['Corporate', 'functions'],
  ['Catering', '& buffets'],
]
const CARD_ART = ['svc-weddings', 'svc-birthdays', 'svc-corporate', 'svc-catering']

/* Layout tables. Desktop keeps the reference's card corners on its 1248px
   group; mobile stacks the cards two by two. */
const L = {
  desktop: {
    word: { size: 96, step: 84, w: 760, h: 112 },
    body: { top: 300, step: 28, size: 18, w: 520 },
    buttons: 410,
    /* x is measured from the group's right edge on desktop */
    roof: { x: 0, y: 250, w: 440, h: 300, r: 48, row: 46 },
    card: { w: 255, h: 215, r: 46, label: 28, dot: 56 },
    cards: (gw: number) => [
      { x: 0, y: 0 },
      { x: gw - 255, y: 0 },
      { x: 116, y: 240 },
      { x: gw - 371, y: 240 },
    ],
    h2: { top: 470, size: 84 },
    sub: { top: 566, size: 20, w: 700 },
    g3: { rule: 404, h: 430, hSize: 64, hW: 640, pX: (gw: number) => gw - 520, pTop: 434, pW: 420, link: 600 },
  },
  mobile: {
    word: { size: 50, step: 52, w: 342, h: 66 },
    body: { top: 190, step: 24, size: 16, w: 342 },
    buttons: 306,
    roof: { x: 0, y: 378, w: 342, h: 214, r: 32, row: 34 },
    card: { w: 163, h: 130, r: 28, label: 21, dot: 40 },
    cards: () => [
      { x: 0, y: 0 },
      { x: 179, y: 0 },
      { x: 0, y: 146 },
      { x: 179, y: 146 },
    ],
    h2: { top: 300, size: 48 },
    sub: { top: 408, size: 16, w: 342 },
    g3: { rule: 0, h: 24, hSize: 42, hW: 342, pX: () => 0, pTop: 214, pW: 342, link: 406 },
  },
}

/** Reveals behind a clip mask, rising. Spans, so it can live inside an h1. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 810 })
  useLayoutEffect(() => {
    const fit = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return vp
}

export default function Stage() {
  const wrap = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const reduce = useReducedMotion() ?? false
  const vp = useViewport()

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  /*
    The hero's entrance plays on the real clock at load, at the prototype's own
    speed (progress = ms / TOTAL_MS), so the opening frame is never blank while
    the page waits for a first scroll. Scrolling takes over from there.
  */
  const [intro, setIntro] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const v = Math.min((now - t0) / TOTAL_MS, P.stat[1])
      setIntro(v)
      if (v < P.stat[1]) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const hp = Math.max(p, intro)

  const layout: Layout = vp.w < 768 ? 'mobile' : 'desktop'
  const S = STAGE[layout]
  const g = G[layout]
  const l = L[layout]
  const safe = SAFE_L[layout]
  const GW = S.w - safe * 2
  const scale = Math.min(vp.w / S.w, vp.h / S.h)
  const offX = (vp.w - S.w * scale) / 2

  /* with reduced motion, entrances land at their final state */
  const sp = (w: readonly [number, number]) => (reduce ? 1 : span(p, w))
  /** the same, for the hero, whose entrance also runs on the load clock */
  const hsp = (w: readonly [number, number]) => (reduce ? 1 : span(hp, w))

  /* group positions, interpolated across the four frames */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const y1 = lerp(g.g1.start, g.g1.end, m1)
  const y2 = lerp(lerp(g.g2.enter, g.g2.mid, m1), g.g2.end, m2)
  const y3 = lerp(lerp(g.g3.enter, g.g3.mid, m1), g.g3.end, m2)

  /* photographs: each crossfades to the next mid-transition */
  const fadeA = ramp(p, [0.47, 0.6])
  const fadeB = ramp(p, [0.79, 0.86])
  const life = [ramp(p, [0, 0.6]), ramp(p, [0.4, 0.86]), ramp(p, [0.75, 1])]
  const opacity = [1 - fadeA, 1 - fadeB, 1]

  /* keep keyboard focus out of groups that are off stage */
  const live1 = m1 < 0.6
  const live2 = p >= P.g2In[0] && m2 < 0.6
  const live3 = m1 > 0.6

  const stat = hsp(P.stat)

  return (
    <div id="top" ref={wrap} style={{ height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
      <div className="h-svh" style={{ position: 'sticky', top: 0, overflow: 'hidden' }}>
        {/* ---- photography, bottom scene first ---- */}
        {[2, 1, 0].map((i) => (
          <img
            key={i}
            src={SCENES[i].src}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'auto'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: SCENES[i].pos,
              opacity: opacity[i],
              transform: `scale(${reduce ? 1.04 : lerp(1.16, 1.0, life[i])})`,
              transformOrigin: '50% 60%',
              willChange: 'transform, opacity',
            }}
          />
        ))}
        {/* one ink wash over every shot, so three photographs read as one film */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,11,0.28)', pointerEvents: 'none' }} />

        {/* ---- section scrims, viewport-wide ---- */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              layout === 'desktop'
                ? 'linear-gradient(90deg, rgba(6,10,7,0.9) 0%, rgba(6,10,7,0.6) 36%, rgba(6,10,7,0.05) 66%)'
                : 'linear-gradient(180deg, rgba(6,10,7,0.55) 0%, rgba(6,10,7,0.82) 40%, rgba(6,10,7,0.7) 100%)',
            opacity: 1 - m1,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(70% 60% at 50% 74%, rgba(6,10,7,0.9) 0%, rgba(6,10,7,0.45) 60%, rgba(6,10,7,0.1) 100%)',
            opacity: m1 * (1 - m2),
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6,10,7,0.1) 20%, rgba(6,10,7,0.8) 62%, rgba(6,10,7,0.92) 100%)',
            opacity: m2,
            pointerEvents: 'none',
          }}
        />
        {/* the bottom of the stage dissolves into the page, so the sections
            below continue the scene instead of starting on a hard edge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: 160,
            background: 'linear-gradient(180deg, rgba(10,15,11,0) 0%, var(--color-ink) 100%)',
            opacity: ramp(p, [0.9, 1]),
            pointerEvents: 'none',
          }}
        />

        {/* ---- the artboard ---- */}
        <div
          style={{
            position: 'absolute',
            left: offX,
            top: Math.max(0, (vp.h - S.h * scale) / 2),
            width: px(S.w),
            height: px(S.h),
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* index rail */}
          {layout === 'desktop' && (
            <div aria-hidden="true" style={box(S.w - safe - 40, 451, 40, 272)}>
              {['01', '02', '03', '04', '05'].map((n, i) => (
                <div
                  key={n}
                  className="label"
                  style={{
                    position: 'absolute',
                    top: px(i * 64),
                    right: 0,
                    fontSize: px(15),
                    transition: 'color 0.3s',
                    color: i === Math.min(4, Math.floor(p * 5)) ? LIME : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          )}

          {/* ================= GROUP 1 — the hero ================= */}
          <div inert={!live1} style={{ ...box(safe, 0, GW, 700), transform: `translateY(${y1}px)`, willChange: 'transform' }}>
            <div
              className="label"
              style={{
                position: 'absolute',
                left: 0,
                top: px(layout === 'desktop' ? -40 : -30),
                fontSize: px(layout === 'desktop' ? 12 : 10),
                color: LIME,
                opacity: hsp(P.word),
              }}
            >
              Weddings · Birthdays · Corporate · Catering
            </div>
            <h1 style={{ margin: 0 }} aria-label="Elegant. Effortless. Unforgettable.">
              {WORDS.map((w, i) => (
                <Mask
                  key={w}
                  t={hsp([P.word, P.word2, P.word3][i])}
                  style={{ position: 'absolute', left: 0, top: px(i * l.word.step - 10), width: px(l.word.w), height: px(l.word.h) }}
                >
                  <span
                    aria-hidden="true"
                    className="display"
                    style={{
                      display: 'block',
                      fontSize: px(l.word.size),
                      lineHeight: px(l.word.h),
                      fontStyle: i === 2 ? 'italic' : 'normal',
                    }}
                  >
                    {w.slice(0, -1)}
                    <span style={{ color: LIME }}>.</span>
                  </span>
                </Mask>
              ))}
            </h1>

            <p style={{ margin: 0 }}>
              {BODY[layout].map((line, i) => (
                <Mask
                  key={line}
                  t={hsp([P.body1, P.body2, P.body3, P.body3][i])}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: px(l.body.top + i * l.body.step),
                    width: px(l.body.w),
                    height: px(l.body.step + 4),
                  }}
                >
                  <span style={{ display: 'block', fontSize: px(l.body.size), lineHeight: px(l.body.step), color: 'rgba(255,255,255,0.86)' }}>
                    {line}
                  </span>
                </Mask>
              ))}
            </p>

            {/* the two buttons */}
            <div style={{ position: 'absolute', left: 0, top: px(l.buttons), opacity: hsp(P.body3), display: 'flex', gap: px(12) }}>
              <a
                href={HREF.contact}
                className="label transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  height: px(50),
                  padding: `0 ${px(layout === 'desktop' ? 30 : 22)}`,
                  borderRadius: 999,
                  background: LIME,
                  color: 'var(--color-ink)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                }}
              >
                Plan my event
              </a>
              <a
                href={HREF.hire}
                className="label transition-colors duration-200 hover:bg-white/10"
                style={{
                  height: px(50),
                  padding: `0 ${px(8)} 0 ${px(20)}`,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: px(12),
                }}
              >
                Browse hire
                <span
                  style={{
                    width: px(34),
                    height: px(34),
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Icon name="arrow" size={14} />
                </span>
              </a>
            </div>

            {/* "everything under one roof" — four services tick on in turn */}
            <div
              className="glass"
              style={{
                position: 'absolute',
                left: px(layout === 'desktop' ? GW - l.roof.w : l.roof.x),
                top: px(l.roof.y),
                width: px(l.roof.w),
                height: px(l.roof.h),
                borderRadius: px(l.roof.r),
                opacity: stat,
                transform: `translateY(${(1 - stat) * 28}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: layout === 'desktop' ? '34px 38px' : '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div className="display" style={{ fontSize: px(layout === 'desktop' ? 30 : 24), fontStyle: 'italic' }}>
                    Everything under one roof
                  </div>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', margin: layout === 'desktop' ? '18px 0 8px' : '12px 0 4px' }} />
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {ROOF.map((r, i) => {
                    const on = stat > (i + 1) / (ROOF.length + 1)
                    return (
                      <li
                        key={r}
                        style={{
                          height: px(l.roof.row),
                          display: 'flex',
                          alignItems: 'center',
                          gap: px(14),
                          fontSize: px(layout === 'desktop' ? 16 : 15),
                          color: on ? '#fff' : 'rgba(255,255,255,0.55)',
                          transition: 'color 0.3s',
                        }}
                      >
                        <span
                          style={{
                            width: px(22),
                            height: px(22),
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            border: `1px solid ${on ? LIME : 'rgba(255,255,255,0.35)'}`,
                            background: on ? LIME : 'transparent',
                            color: 'var(--color-ink)',
                            boxShadow: on ? `0 0 14px ${LIME}80` : 'none',
                            transition: 'all 0.3s',
                          }}
                        >
                          {on && <Icon name="check" size={13} />}
                        </span>
                        {r}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* ================= GROUP 2 — services ================= */}
          <div inert={!live2} style={{ ...box(safe, 0, GW, 640), transform: `translateY(${y2}px)`, willChange: 'transform' }}>
            {l.cards(GW).map((c, i) => {
              const t = sp([P.g2In[0] + i * 0.004, P.g2In[1]])
              return (
                <a
                  key={i}
                  href={HREF.services}
                  aria-label={`${CARD_LABELS[i].join(' ')} — see services`}
                  className="group"
                  style={{ position: 'absolute', left: px(c.x), top: px(c.y), width: px(l.card.w), height: px(l.card.h), opacity: t, borderRadius: px(l.card.r) }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(l.card.r), overflow: 'hidden' }}>
                    <img
                      src={u(`assets/${CARD_ART[i]}.webp`)}
                      alt=""
                      loading="lazy"
                      className="transition-transform duration-500 group-hover:scale-[1.06]"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* the label sits on a photograph, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(150deg, rgba(6,10,7,0.82) 0%, rgba(6,10,7,0.35) 55%, rgba(6,10,7,0.08) 100%)',
                      }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(l.card.r), border: '1px solid rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
                  <div
                    aria-hidden="true"
                    className="display"
                    style={{ position: 'absolute', left: px(layout === 'desktop' ? 24 : 16), top: px(layout === 'desktop' ? 28 : 18), fontSize: px(l.card.label), lineHeight: 1.02 }}
                  >
                    {CARD_LABELS[i][0]}
                    <br />
                    <span style={{ fontStyle: 'italic' }}>{CARD_LABELS[i][1]}</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="transition-colors duration-300 group-hover:bg-lime group-hover:text-ink"
                    style={{
                      position: 'absolute',
                      right: px(layout === 'desktop' ? 16 : 10),
                      bottom: px(layout === 'desktop' ? 16 : 10),
                      width: px(l.card.dot),
                      height: px(l.card.dot),
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.22)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                    }}
                  >
                    <Icon name="arrowUpRight" size={layout === 'desktop' ? 18 : 15} />
                  </div>
                </a>
              )
            })}

            <h2
              className="display"
              style={{ position: 'absolute', left: 0, width: px(GW), top: px(l.h2.top), fontSize: px(l.h2.size), textAlign: 'center', margin: 0 }}
            >
              Every detail, <span style={{ fontStyle: 'italic' }}>styled</span>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px((GW - l.sub.w) / 2),
                top: px(l.sub.top),
                width: px(l.sub.w),
                fontSize: px(l.sub.size),
                lineHeight: 1.55,
                textAlign: 'center',
                margin: 0,
                color: 'rgba(255,255,255,0.86)',
              }}
            >
              Décor, furniture, catering and planning for celebrations of every size — set up before you
              arrive and cleared away after you leave.
            </p>
          </div>

          {/* ================= GROUP 3 — hire ================= */}
          <div inert={!live3} style={{ ...box(safe, 0, GW, 810), transform: `translateY(${y3}px)`, willChange: 'transform' }}>
            <div style={{ position: 'absolute', left: 0, top: px(l.g3.rule), width: px(56), height: px(2), background: LIME }} />
            <h2
              className="display"
              style={{ position: 'absolute', left: 0, top: px(l.g3.h), width: px(l.g3.hW), fontSize: px(l.g3.hSize), lineHeight: 1.02, margin: 0 }}
            >
              From the first chair to the <span style={{ fontStyle: 'italic' }}>last candle</span>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px(l.g3.pX(GW)),
                top: px(l.g3.pTop),
                width: px(l.g3.pW),
                fontSize: px(layout === 'desktop' ? 16 : 15),
                lineHeight: 1.65,
                margin: 0,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              Gold and ghost chairs, charger plates, linen, chafing dishes, candles, lights and arches —
              delivered, set up and collected. Hire on its own, or let us style the whole room.
            </p>
            <a
              href={HREF.hire}
              className="label hover:text-lime"
              style={{
                position: 'absolute',
                left: px(l.g3.pX(GW)),
                top: px(l.g3.link),
                height: px(44),
                display: 'inline-flex',
                alignItems: 'center',
                gap: px(10),
                color: '#fff',
                borderBottom: `1px solid ${LIME}`,
              }}
            >
              Browse the hire catalogue <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
