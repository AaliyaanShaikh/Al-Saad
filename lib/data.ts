export type NavItem = { label: string; href: string };

export type Market = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  location: string;
  price: string;
  beds: string;
  sqft: string;
  link?: string;
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
  { label: 'Markets', href: '/#markets' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
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
    slug: 'vision-heights',
    title: 'Vision Heights',
    description: 'Freehold land, nearing possession — Jogeshwari West, western suburbs.',
    category: 'exclusive',
    year: '2026',
    image: '/screenshot-2026-02-04-vision.png',
    location: 'Jogeshwari West',
    price: '1.57 – 2 Cr',
    beds: '2 & Grand 2',
    sqft: '500–900',
  },
  {
    id: '2',
    slug: 'aksa',
    title: 'Aksa',
    description: 'Modern residences on Aqsa Masjid Road with careful pricing.',
    category: 'exclusive',
    year: '2026',
    image: '/screenshot-2026-02-04-sayba.png',
    location: 'Aqsa Masjid Road',
    price: 'From 1.75 Cr',
    beds: '2 & 3',
    sqft: '621–1200',
  },
  {
    id: '3',
    slug: 'dream-india',
    title: 'Dream India',
    description: 'Residential stock with strong connectivity on Relief Road.',
    category: 'exclusive',
    year: '2026',
    image: '/Screenshot-Dream india.png',
    location: 'Relief Road',
    price: '1.11 – 1.77 Cr',
    beds: '2 & 3',
    sqft: '530–860',
  },
  {
    id: '4',
    slug: 'paradigm-alaya',
    title: 'Paradigm Alaya',
    description: 'Elegant 1 & 2 BHK living with measured amenities.',
    category: 'exclusive',
    year: '2026',
    image: '/paradigm-alaya-replacement.png',
    location: 'Relief Road',
    price: '1.29 – 1.81 Cr',
    beds: '1 & 2',
    sqft: '2,800',
  },
  {
    id: '5',
    slug: 'roswalt-zaiden',
    title: 'Roswalt Zaiden',
    description: 'Spacious 1, 2 & 3 BHK formats for long-term living.',
    category: 'featured',
    year: '2026',
    image: '/screenshot-roswalt.png',
    location: 'Upcoming',
    price: '1.80 – 3.90 Cr',
    beds: '1, 2 & 3',
    sqft: '400–1200',
    link: 'https://www.youtube.com/watch?v=C4tyDdTRhmM',
  },
  {
    id: '6',
    slug: 'sayba-noor-2',
    title: 'Sayba Noor 2.0',
    description: 'Thoughtful inventory on Sahankar Road for end-users and investors.',
    category: 'featured',
    year: '2026',
    image: '/Screenshot-sayba.png',
    location: 'Sahankar Road',
    price: '1.28 – 2.41 Cr',
    beds: '1, 2 & 3',
    sqft: '460–1000',
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
