/*
  Scroll choreography.

  The timeline is the Marlin reference's 20,000ms prototype, divided by 20,000
  so every phase is a fraction of the scroll stage:

      hold 3000ms   -> services cards arrive (instant)
      hold 5000ms   -> transition 1, 6000ms
      hold 1500ms   -> transition 2, 4500ms

  The hero's words keep the reference's stagger (0 / 75 / 150ms, body lines at
  200 / 275 / 350ms), and the three content groups travel as a parallax
  filmstrip, each at its own rate.

  Where Marlin scrubs two video clips, this scrubs three photographs: each one
  owns a third of the stage and drifts in a slow push-in while it is on screen,
  crossfading to the next across the two transitions.
*/

export const TOTAL_MS = 20000
export const SCROLL_VH = 620

const at = (ms: number) => ms / TOTAL_MS

/** Phase windows as scroll progress. */
export const P = {
  word: [at(0), at(300)],
  word2: [at(75), at(375)],
  word3: [at(150), at(450)],
  body1: [at(200), at(500)],
  body2: [at(275), at(575)],
  body3: [at(350), at(650)],
  /* the "everything under one roof" card */
  stat: [at(200), at(2284)],
  /* the service cards arrive */
  g2In: [at(3000), at(3600)],
  move1: [at(8000), at(14000)],
  /* compressed to land at 0.90 so the settled composition holds before the
     sections below take over */
  move2: [at(15500), 0.9],
} as const

/*
  Two artboards. The desktop one is the reference's 1440x810; the phone one is
  390x740, short enough that a phone with its browser chrome showing still fits
  the whole composition.
*/
export type Layout = 'desktop' | 'mobile'

export const STAGE = {
  desktop: { w: 1440, h: 810 },
  mobile: { w: 390, h: 740 },
} as const

/** Where each group sits at rest, at the midpoint, and after it leaves. */
export const G = {
  desktop: {
    g1: { start: 186, end: -774 },
    g2: { enter: 1050, mid: 105, end: -1115 },
    g3: { enter: 1400, mid: 740, end: 144 },
  },
  mobile: {
    g1: { start: 96, end: -820 },
    g2: { enter: 900, mid: 110, end: -1000 },
    g3: { enter: 1200, mid: 760, end: 200 },
  },
} as const

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
