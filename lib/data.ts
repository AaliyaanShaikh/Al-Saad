export type NavItem = { label: string; href: string };

export type Market = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Typology = {
  name: string;
  note?: string;
  area: string;
  price: string;
};

export type FloorBand = {
  name: string;
  floors: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  year: string;
  image: string;
  imagePosition?: string;
  location: string;
  price: string;
  beds: string;
  sqft: string;
  status: string;
  developer?: string;
  tagline?: string;
  brochureUrl?: string;
  highlights: string[];
  gallery?: string[];
  typologies?: Typology[];
  floorBands?: FloorBand[];
  amenities?: string[];
  rera?: string;
  link?: string;
};

export type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
};

export type ServiceItem = {
  title: string;
  desc: string;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export type SocialItem = {
  id: string;
  title: string;
  platform: string;
  image: string;
  href: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

export const site = {
  name: 'Al-Saad',
  wordmark: 'AL-SAAD',
  tagline: 'Honest property advisory across Mumbai’s western suburbs.',
  phone: '+91 87960 28980',
  email: 'muhdsaadpatel786@gmail.com',
  founder: 'Muhd Saad Patel',
  social: {
    instagram: 'https://www.instagram.com/alsaad.in/',
    youtube: 'https://www.youtube.com/@alsaad_in',
    whatsapp:
      'https://www.whatsapp.com/channel/0029Vb7A5K0BadmfcCLWAj2z',
  },
};

export const nav: NavItem[] = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const manifesto =
  'I help serious buyers and investors read Mumbai’s western suburbs with clarity — pricing without theatre, timing without pressure, and decisions that still make sense years later.';

export const markets: Market[] = [
  {
    id: '1',
    slug: 'bandra',
    name: 'Bandra',
    blurb: 'The premium apex — lifestyle depth, BKC access, limited land.',
    image: '/screenshot-jogeshwari-2.png',
  },
  {
    id: '2',
    slug: 'khar',
    name: 'Khar',
    blurb: 'Balanced demand, redevelopment energy, a quieter premium address.',
    image: '/screenshot-jogeshwari.png',
  },
  {
    id: '3',
    slug: 'santacruz',
    name: 'Santacruz',
    blurb: 'Connectivity and growth — one of the corridor’s most dynamic belts.',
    image: '/WhatsApp Image 2026-01-25 at 13.07.14.jpeg',
  },
  {
    id: '4',
    slug: 'andheri',
    name: 'Andheri',
    blurb: 'A wider ladder of mid-to-premium stock with metro gravity.',
    image: '/screenshot-bandivali.png',
  },
  {
    id: '5',
    slug: 'versova',
    name: 'Versova',
    blurb: 'Coastal character with infrastructure upside along the sea link.',
    image: '/screenshot-2026-01-30.png',
  },
  {
    id: '6',
    slug: 'jogeshwari',
    name: 'Jogeshwari',
    blurb: 'Value and growth within the same western belt — read carefully.',
    image: '/screenshot-2026-01-31-jogeshwari.png',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'autograph-residency',
    title: 'The A-List Residences',
    developer: 'Multistar Builders',
    tagline: 'Where Luxury Bears Your Signature.',
    brochureUrl: '/brochures/Noor A3 presenter Final_compressed.pdf',
    description:
      'The Chosen Address of Cinema Icons: Ultra-Exclusive 3 Bed Premium & Luxe Homes, 4 & 5 Bed Duplexes, and Sky-High Penthouses in Andheri West Defined by A-List Privacy, Star-Studded Neighborhood Covenants, and Monolithic Scale.',
    body: 'The A-List Residences is an iconic G+37 storey tower with dedicated surface parking, basement + ground + 6-level podium parking, exclusive lifestyle amenities on the 7th floor, and residences from the 8th floor to the 37th floor. A 10-ft wide grand passage, four high-speed elevators including a stretcher lift, rooftop lifestyle amenities, and 30+ world-class premium amenities designed for elevated living. Exclusive residences include 3 BHKs, sky mansions, jodi apartments, and signature penthouses. Premium 3 bed homes start from ₹3.80 Cr all inclusive. The 3rd floor band is opening soon.',
    category: 'exclusive',
    year: '2026',
    image: '/positions/g37-oshiwara.jpg',
    imagePosition: 'object-[50%_18%]',
    gallery: ['/positions/g37-oshiwara.jpg', '/positions/oshiwara-g37-tower.jpg'],
    location: 'Andheri West – Oshiwara',
    price: 'From ₹3.80 Cr all incl.',
    beds: '3 BHK to penthouse',
    sqft: '968.6–2518 carpet',
    status: '3rd band opening soon',
    rera: 'PR1180002501853',
    highlights: [
      'Iconic G+37 storey tower with dedicated surface parking',
      'Basement + Ground + 6-level podium parking',
      'Exclusive lifestyle amenities on the 7th floor',
      'Residences from the 8th floor to the 37th floor',
      '10-ft wide grand passage',
      '4 high-speed elevators, including a stretcher lift',
      'Rooftop lifestyle amenities',
      '30+ world-class premium amenities',
    ],
    typologies: [
      { name: '3 BHK Residences', note: '3 Bed Premium', area: '968.6', price: '₹3.80 Cr' },
      { name: '3 BHK Premium Residences', note: '3 Bed Luxe', area: '1243.5', price: '₹4.90 Cr' },
      { name: 'Sky Mansion', note: '4 Bed Duplex', area: '1789.5', price: '₹7.55 Cr' },
      { name: 'Sky Mansion', note: '5 Bed Duplex', area: '2223.5', price: '₹9.20 Cr' },
      { name: 'Jodi / Signature Penthouse', note: 'Crafted for the truly elite', area: '2518', price: '₹9.45 Cr' },
    ],
    floorBands: [
      { name: '1st band', floors: '8th to 17th floor' },
      { name: '2nd band', floors: '18th to 27th floor' },
      { name: '3rd band', floors: 'Opening soon' },
    ],
  },
  {
    id: '2',
    slug: 'Aksa-residences',
    title: 'Designer residences by the JVLR corridor',
    description:
      'Carefully finished homes along the Jogeshwari–Vikhroli link — for buyers who care how a plan lives, not what it is called.',
    body: 'The JVLR corridor is a connectivity thesis: metro gravity, east–west movement, and a widening set of addresses that still feel residential. These designer residences are shortlisted for layout discipline and finish quality. Names are withheld. The question is whether the corridor, the light, and the ticket still make sense in five years.',
    category: 'editorial',
    year: '2026',
    image: '/screenshot-2026-02-04-sayba.png',
    location: 'JVLR corridor',
    price: 'Private',
    beds: '2 & 3 BHK',
    sqft: 'Considered plans',
    status: 'Private brief',
    highlights: [
      'JVLR connectivity as the primary read',
      'Designer-led interiors, not marketing finishes',
      '2 & 3 BHK for families and careful investors',
      'Shared only when the brief matches',
    ],
  },
  {
    id: '3',
    slug: 'monolithic-residence',
    title: 'Monolithic 3 & 6 BHKs in Andheri West',
    description:
      'Large-format residences with a single architectural line — Andheri West for those who need scale, not a label.',
    body: 'Andheri West still has a thin supply of truly large homes. These monolithic 3 and 6 BHK plates are for families who have outgrown the typical tower product: one architectural language, generous rooms, and a micro-market that remains the western suburb’s work-and-life hinge. Identity stays editorial until you are in the room.',
    category: 'editorial',
    year: '2026',
    image: '/screenshot-roswalt.png',
    location: 'Andheri West',
    price: 'Private',
    beds: '3 & 6 BHK',
    sqft: 'Large-format',
    status: 'Private brief',
    highlights: [
      'Monolithic 3 & 6 BHK plates',
      'Andheri West as the lifestyle hinge',
      'Scale without a developer headline',
      'Introduced by conversation only',
    ],
  },
  {
    id: '4',
    slug: 'oshiwara seashore',
    title: '30:70 financial architectures in Oshiwara',
    description:
      'Structures built for how capital actually moves — Oshiwara for buyers who want the payment plan as considered as the plan.',
    body: 'Oshiwara sits in a band where ticket size and cash-flow both matter. These residences are positioned around a 30:70 architecture: enough commitment to be serious, enough deferred capital to stay rational. The product is secondary to whether the structure still looks intelligent after possession. No board. No campaign. A private read.',
    category: 'editorial',
    year: '2026',
    image: '/paradigm-alaya-replacement.png',
    location: 'Oshiwara',
    price: 'Private',
    beds: 'Flexible formats',
    sqft: 'Structure-led',
    status: 'Private brief',
    highlights: [
      '30:70 payment architecture',
      'Oshiwara micro-market, western belt',
      'Capital timing treated as part of the product',
      'Details released after a fit is clear',
    ],
  },
  {
    id: '5',
    slug: 'boutique-tower',
    title: 'G+31 boutique towers opposite Café Safar',
    description:
      'A tall, tight address with neighbourhood character — opposite Café Safar, for those who buy the street before the skyline.',
    body: 'Boutique height only works when the street underneath is already a life. Opposite Café Safar, these G+31 towers offer a vertical, limited-inventory read: fewer neighbours than a mass tower, more sky than a mid-rise, and a western-suburb pocket you can actually walk. The name on the gate is irrelevant. The corner is not.',
    category: 'editorial',
    year: '2026',
    image: '/Screenshot-Dream india.png',
    location: 'Opposite Café Safar',
    price: 'Private',
    beds: 'Boutique formats',
    sqft: 'G+31',
    status: 'Private brief',
    highlights: [
      'G+31 boutique vertical',
      'Street-level character opposite Café Safar',
      'Limited inventory, not a campus',
      'Address shared in a private briefing',
    ],
  },
];

export const showcaseProjects: ShowcaseItem[] = [
  {
    id: 'showcase-1',
    title: 'Awarded Excellence',
    description:
      'Honored in recognition of professional excellence — a milestone that reflects dedication, consistency, and growth.',
    category: 'showcase',
    year: '2024',
    image: '/IMG_4653.jpg',
    tags: ['Recognition', 'Award Moment', 'Excellence'],
  },
  {
    id: 'showcase-2',
    title: 'Team Achievement',
    description:
      'A proud moment of collective success—recognizing teamwork, leadership, and the shared commitment that drives meaningful results.',
    category: 'showcase',
    year: '2025',
    image: '/teamedit.png',
    tags: ['Teamwork', 'Leadership', 'Collaboration'],
  },
  {
    id: 'showcase-3',
    title: 'Industry Appreciation',
    description:
      'Recognised for consistent performance, collaborative execution, and a shared commitment to quality and excellence.',
    category: 'showcase',
    year: '2025',
    image: '/Gemini_Generated_Image_mr7czrmr7czrmr7c.png',
    tags: ['Industry Recognition', 'Excellence', 'Craft'],
  },
];

export const services: ServiceItem[] = [
  {
    title: 'Strategic Property Buying',
    desc: 'Helping end-users and investors choose the right property at the right time.',
  },
  {
    title: 'Honest Property Consultation',
    desc: 'Clear answers about pricing, risks, future prospects, and suitability—without sales pressure.',
  },
  {
    title: 'Local Market Intelligence',
    desc: 'Deep understanding of Bandra, Khar, Santacruz, Andheri, Versova & Jogeshwari—micro-markets most outsiders miss.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: '1',
    number: '01',
    title: 'Listen first',
    body: 'Budget, timing, family needs, and long-term plans — before any brochure.',
  },
  {
    id: '2',
    number: '02',
    title: 'Read the micro-market',
    body: 'Street by street: pricing, risks, redevelopment signals, and what outsiders miss.',
  },
  {
    id: '3',
    number: '03',
    title: 'Shortlist with honesty',
    body: 'Only properties I’d recommend to my own family — correctly priced, rightly suited.',
  },
  {
    id: '4',
    number: '04',
    title: 'Decide without theatre',
    body: 'Clear counsel on whether to buy now, wait, or walk away. No manufactured urgency.',
  },
];

export const socialItems: SocialItem[] = [
  {
    id: '1',
    title: 'Jogeshwari market take',
    platform: 'Instagram',
    image: '/screenshot-jogeshwari-2.png',
    href: 'https://www.instagram.com/reel/DMJ2kYwzvhe/',
  },
  {
    id: '2',
    title: 'Western suburb walkthrough',
    platform: 'Instagram',
    image: '/screenshot-jogeshwari.png',
    href: 'https://www.instagram.com/reel/DHYHtWMiL2z/',
  },
  {
    id: '3',
    title: 'Honest property notes',
    platform: 'YouTube',
    image: '/WhatsApp Image 2026-01-25 at 13.07.14.jpeg',
    href: 'https://www.youtube.com/@alsaad_in',
  },
  {
    id: '4',
    title: 'Buyer clarity',
    platform: 'Instagram',
    image: '/screenshot-2026-01-30.png',
    href: 'https://www.instagram.com/reel/DN5pZSpAn3Q/',
  },
  {
    id: '5',
    title: 'Pricing without pressure',
    platform: 'Instagram',
    image: '/screenshot-2026-01-30-1147.png',
    href: 'https://www.instagram.com/reel/DO8cPGXE131/',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'He talked me out of a flat that looked perfect on paper. Six months later, I understood why.',
    name: 'Private client',
    detail: 'Andheri West',
  },
  {
    id: '2',
    quote:
      'No theatre. Just clear numbers, clear risks, and enough quiet to think.',
    name: 'Investor',
    detail: 'Bandra corridor',
  },
];

export function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}

export function publicSrc(path: string) {
  if (!path.startsWith('/')) return path;
  const parts = path.slice(1).split('/');
  return '/' + parts.map(encodeURIComponent).join('/');
}
