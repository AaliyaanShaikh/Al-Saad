
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum AppState {
  INTRO = 'INTRO',
  HOME = 'HOME'
}
