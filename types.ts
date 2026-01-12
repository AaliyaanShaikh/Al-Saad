
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
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
