import { ClayGridFeature } from './types';

/**
 * Single source of truth for the Social / ClayGrid section.
 * Edit only this file to add, remove, or change grid cards.
 * - type: 'img' or 'text'
 * - span: 'col-span-1 row-span-1' (small) or 'col-span-2 row-span-1' / 'col-span-2 row-span-2' (large)
 * - source: 'instagram' | 'youtube' — which filter shows this card
 */
export const CLAY_GRID_FEATURES: ClayGridFeature[] = [
  {
    id: '1',
    source: 'instagram',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '2',
    source: 'instagram',
    type: 'text',
    title: 'RAW DATA',
    text: 'Instagram Content.',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '3',
    source: 'instagram',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-2',
  },
  {
    id: '4',
    source: 'youtube',
    type: 'img',
    src: 'WhatsApp Image 2026-01-25 at 13.07.14.jpeg',
    span: 'col-span-2 row-span-1',
  },
  {
    id: '5',
    source: 'youtube',
    type: 'text',
    title: 'SYSTEM',
    text: 'Youtube Content.',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '6',
    source: 'youtube',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-1',
  },
  {
    id: '7',
    source: 'instagram',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-2',
  }, 
  {
    id: '8',
    source: 'instagram',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-2',
  },
  {
    id: '9',
    source: 'youtube',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-2 row-span-2',
  },
  {
    id: '10',
    source: 'instagram',
    type: 'img',
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-1 row-span-1',
  },
];
