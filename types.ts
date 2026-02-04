/** Filter source for ClayGrid: Instagram or YouTube */
export type ContentSource = 'instagram' | 'youtube';

/** Single card/cell in the ClayGrid (img or text), with source for filtering */
export interface ClayGridFeature {
  id: string;
  source: ContentSource;
  type: 'img' | 'text';
  src?: string;
  title?: string;
  text?: string;
  span?: string;
  /** Optional URL — card becomes a link when set */
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
  /** Optional PDF path (in /public). When set, clicking the property opens the brochure in a popup instead of navigating. */
  brochure?: string;
  location?: string;
  price?: string;
  beds?: string;
  sqft?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum AppState {
  INTRO = 'INTRO',
  HOME = 'HOME',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}
