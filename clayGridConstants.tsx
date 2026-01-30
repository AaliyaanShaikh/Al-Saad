import { ClayGridFeature } from './types';

/**
 * Single source of truth for the Social / ClayGrid section.
 * Edit only this file to add, remove, or change grid cards.
 * - type: 'img' or 'text'
 * - span: 'col-span-1 row-span-1' (small) or 'col-span-2 row-span-1' / 'col-span-2 row-span-2' (large)
 * - source: 'instagram' | 'youtube' — which filter shows this card
 * - link: optional URL — card is clickable and opens in new tab when set
 */
export const CLAY_GRID_FEATURES: ClayGridFeature[] = [
  {
    id: '1',
    source: 'instagram',
    type: 'img',
    src: '/screenshot-jogeshwari-2.png',
    span: 'col-span-1 row-span-1',
    link: 'https://www.instagram.com/reel/DMJ2kYwzvhe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    id: '2',
    source: 'instagram',
    type: 'text',
    title: 'RAW DATA',
    text: 'Instagram Content.',
    span: 'col-span-1 row-span-1',
    link: 'https://www.instagram.com/alsaad.in/',
  },
  {
    id: '3',
    source: 'instagram',
    type: 'img',
    src: '/screenshot-jogeshwari.png',
    span: 'col-span-1 row-span-2',
    link: 'https://www.instagram.com/reel/DHYHtWMiL2z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    id: '4',
    source: 'youtube',
    type: 'img',
    src: '/WhatsApp Image 2026-01-25 at 13.07.14.jpeg',
    span: 'col-span-2 row-span-1',
    link: 'https://www.youtube.com/@alsaad_in',
  },
  {
    id: '5',
    source: 'youtube',
    type: 'text',
    title: 'SYSTEM',
    text: 'Youtube Content.',
    span: 'col-span-1 row-span-1',
    link: 'https://www.youtube.com/@alsaad_in',
  },
  {
    id: '6',
    source: 'youtube',
    type: 'img',
    src: '/screenshot-bandivali.png',
    span: 'col-span-1 row-span-1',
    link: 'https://youtube.com/shorts/KnDG2KEuRyk?si=RLMddiEz71JO4bjT',
  },
  {
    id: '7',
    source: 'instagram',
    type: 'img',
    src: '/screenshot-2026-01-30.png',
    span: 'col-span-1 row-span-2',
    link: 'https://www.instagram.com/reel/DN5pZSpAn3Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    id: '8',
    source: 'instagram',
    type: 'img',
    src: '/screenshot-2026-01-30-1147.png',
    span: 'col-span-1 row-span-2',
    link: 'https://www.instagram.com/reel/DO8cPGXE131/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
  {
    id: '9',
    source: 'youtube',
    type: 'img',
    src: '/Gemini_Generated_Image_xuouayxuouayxuou.jpeg',
    span: 'col-span-2 row-span-2',
    link: 'https://www.youtube.com/@alsaad_in',
  },
  {
    id: '10',
    source: 'instagram',
    type: 'img',
    src: '/screenshot-2026-01-31-jogeshwari.png',
    span: 'col-span-1 row-span-1',
    link: 'https://www.instagram.com/reel/DTQLG-kE7KX/?utm_source=ig_web_copy_link',
  },
];
