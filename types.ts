
export interface PropertyUnit {
  type: string;
  price: number;
  description?: string;
}

export interface PaymentPlan {
  name: string;
  price: number;
  deposit?: number;
}


export interface Property {
  id: string;
  title: string;
  price: number; // Base or starting price
  location: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  sqmPrice?: number;
  image: string;
  images: string[];
  description: string;
  type: "House" | "Condo" | "Villa" | "Apartment" | "Land" | "Commercial";
  status: "For Sale" | "For Rent" | "Off-Plan" | "Still Selling";
  featured: boolean;
  createdAt: string;
  titleType?: string; // e.g., C of O, Governor's Consent
  landmarks?: string[];
  amenities?: string[];
  units?: PropertyUnit[];
  paymentPlans?: PaymentPlan[];
  investmentInsights?: {
    shortLet?: string;
    rental?: string;
    appreciation?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // array of property IDs
  alerts: PropertyAlert[];
}

export interface PropertyAlert {
  id: string;
  type?: string;
  maxPrice?: number;
  minBeds?: number;
  location?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
