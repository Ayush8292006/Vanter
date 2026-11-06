export type FragranceSize = '30ml' | '50ml' | '100ml';

export interface NoteItem {
  name: string;
  origin?: string;
  description?: string;
  image?: string;
}

export interface FragranceNotes {
  top: NoteItem[];
  heart: NoteItem[];
  base: NoteItem[];
}

export interface Product {
  id: string;
  number: string; // e.g. "N°01"
  name: string; // e.g. "NOIR ABSOLU"
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  gender: 'Unisex' | 'For Her' | 'For Him';
  family: 'Woody' | 'Oriental' | 'Floral' | 'Fresh' | 'Amber';
  price100ml: number;
  mood: string;
  moodTint: string; // CSS hex or rgba color
  gradient: string;
  notes: FragranceNotes;
  keyNotes: string[];
  images: {
    primary: string;
    secondary: string;
    ingredients?: string;
    lifestyle?: string;
  };
  concentration: string; // "Extrait de Parfum (28%)"
  maceration: string; // "48 Hours Cold Maceration"
  origin: string; // "Grasse, France"
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  size: FragranceSize;
  quantity: number;
  unitPrice: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  location: string;
  rating: number;
  fragrance: string;
}

