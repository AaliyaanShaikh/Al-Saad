
export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: 'Villa' | 'Penthouse' | 'Mansion' | 'Estate';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum AppState {
  INTRO = 'INTRO',
  HOME = 'HOME'
}
