/*
  Everything the business owns lives here: contact details, services, the
  hire catalogue and the gallery. Edit this file to change the site's content;
  the components only lay it out.
*/

export const BUSINESS = {
  name: 'Gollywood Events Solutions',
  /* TODO: confirm. The flyer only shows "...re@gmail.com" and a partial cell number. */
  email: '',
  /* International format, digits only, e.g. 2774724xxxx. Quote requests open
     WhatsApp to this number; while it is empty WhatsApp lets the visitor pick
     a contact instead. */
  whatsapp: '',
  officePhone: '010 109 4591',
  officeTel: '+27101094591',
  instagram: 'https://www.instagram.com/gollywoodevents/',
  website: 'www.gollywoodevents.co.za',
}

export const LIME = '#a5d64a'

export function whatsappLink(text: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`
}

/** A path inside the site, prefixed with wherever the site is hosted: '/' in
    development, the repository's folder on GitHub Pages (see vite.config.ts). */
export const u = (path: string) => import.meta.env.BASE_URL + path

/* Each section is its own page. Folder URLs with a trailing slash, so they
   resolve to <folder>/index.html on any static host. */
export const HREF = {
  home: u(''),
  services: u('services/'),
  hire: u('hire/'),
  gallery: u('gallery/'),
  contact: u('contact/'),
}

export const NAV = [
  { t: 'Services', href: HREF.services },
  { t: 'Hire', href: HREF.hire },
  { t: 'Gallery', href: HREF.gallery },
  { t: 'Contact', href: HREF.contact },
]

/** Link to the quote form with an event type already chosen. */
export const quoteFor = (eventType: string) => `${HREF.contact}?event=${encodeURIComponent(eventType)}`

export const SERVICES = [
  {
    id: 'weddings',
    title: 'Weddings',
    img: u('assets/svc-weddings.webp'),
    alt: 'Outdoor wedding ceremony with a floral arch and rows of chairs',
    blurb:
      'From the ceremony arch to the last dance, we style, furnish and cater your day so you can simply be there for it.',
    includes: ['Ceremony & reception décor', 'Draping, arches & backdrops', 'Tables, chairs & linen', 'Catering & service staff'],
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    img: u('assets/svc-birthdays.webp'),
    alt: 'Birthday celebration decorated with balloons',
    blurb:
      'First birthdays to milestone 50ths: themed décor, balloon styling and a set-up that makes the guest of honour feel it.',
    includes: ['Themed décor & balloons', 'Dessert & cake tables', 'Kids and adult set-ups', 'Catering on request'],
  },
  {
    id: 'corporate',
    title: 'Corporate functions',
    img: u('assets/svc-corporate.webp'),
    alt: 'Guests seated at a formal dinner with floral centrepieces',
    blurb:
      'Year-end functions, launches and gala dinners delivered on time, on brief and on budget, with a polished finish.',
    includes: ['Gala & banquet set-ups', 'Conference furniture', 'Branded styling', 'Full-service catering'],
  },
  {
    id: 'catering',
    title: 'Catering',
    img: u('assets/svc-catering.webp'),
    alt: 'Buffet table lined with silver chafing dishes',
    blurb:
      'Buffets, plated menus and platters prepared fresh and served warm, with the chafing dishes and crockery to match.',
    includes: ['Buffet & plated menus', 'Platters & canapés', 'Serving equipment', 'Waitrons & clean-up'],
  },
]

export type HireCategory = 'Seating' | 'Tableware' | 'Catering' | 'Décor & lighting'

export const HIRE_CATEGORIES: HireCategory[] = ['Seating', 'Tableware', 'Catering', 'Décor & lighting']

export const HIRE = [
  { id: 'chairs', name: 'Gold & Tiffany chairs', cat: 'Seating', img: u('assets/hire-chairs.webp'), note: 'Gold, white and clear finishes with cushioned seats.' },
  { id: 'acrylic', name: 'Ghost (acrylic) chairs', cat: 'Seating', img: u('assets/hire-acrylic.webp'), note: 'Clear Phoenix and ghost chairs for a light, modern look.' },
  { id: 'settings', name: 'Linen & place settings', cat: 'Tableware', img: u('assets/hire-settings.webp'), note: 'Tablecloths, runners, napkins, cutlery and glassware.' },
  { id: 'chargers', name: 'Charger plates', cat: 'Tableware', img: u('assets/hire-chargers.webp'), note: 'Gold, rose-gold, beaded and glass-rim chargers.' },
  { id: 'chafing', name: 'Chafing dishes', cat: 'Catering', img: u('assets/hire-chafing.webp'), note: 'Gold and silver roll-top chafers that keep the buffet warm.' },
  { id: 'candles', name: 'Candle centrepieces', cat: 'Décor & lighting', img: u('assets/hire-candles.webp'), note: 'Pillar candles, holders and greenery for every table.' },
  { id: 'lights', name: 'Fairy & festoon lights', cat: 'Décor & lighting', img: u('assets/hire-lights.webp'), note: 'Warm string lighting for marquees, gardens and halls.' },
  { id: 'arch', name: 'Arches & backdrops', cat: 'Décor & lighting', img: u('assets/hire-arch.webp'), note: 'Floral arches and backdrops for ceremonies and photos.' },
] as const satisfies readonly { id: string; name: string; cat: HireCategory; img: string; note: string }[]

export type HireId = (typeof HIRE)[number]['id']

export const GALLERY = [
  { src: u('assets/g-1.webp'), alt: 'Long dinner table dressed with flowers and candles', w: 1200, h: 800 },
  { src: u('assets/g-4.webp'), alt: 'Table setting with floral arrangements and gold cutlery', w: 1200, h: 1599 },
  { src: u('assets/g-2.webp'), alt: 'Banquet table set with white plates, candles and glassware', w: 1200, h: 800 },
  { src: u('assets/g-6.webp'), alt: 'Reception table with white cloth beneath a chandelier', w: 1200, h: 1204 },
  { src: u('assets/g-3.webp'), alt: 'Party table styled with candles and flowers', w: 1200, h: 800 },
  { src: u('assets/g-7.webp'), alt: 'Bouquets of flowers hung on a wooden backdrop', w: 1200, h: 801 },
  { src: u('assets/g-5.webp'), alt: 'Decorated table with a lit candle and flowers', w: 1200, h: 800 },
  { src: u('assets/g-8.webp'), alt: 'Dining table set with orange flowers and candles', w: 1200, h: 800 },
]

export const EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate function', 'Catering only', 'Equipment hire only', 'Other']
