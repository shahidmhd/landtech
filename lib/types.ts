export type ImageRef = {
  url: string;
  publicId?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Address = {
  line1?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
};

export type GeoPoint = {
  type?: 'Point';
  coordinates?: [number, number]; // [lng, lat]
};

export type Property = {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  type:
    | 'apartment'
    | 'villa'
    | 'townhouse'
    | 'penthouse'
    | 'studio'
    | 'office'
    | 'land';
  status: 'available' | 'reserved' | 'sold' | 'off-market';
  listingType: 'sale' | 'rent';
  price: number;
  currency: string;
  pricePeriod?: 'once' | 'month' | 'year';
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  address?: Address;
  location?: GeoPoint;
  amenities?: string[];
  images?: ImageRef[];
  coverImage?: ImageRef;
  featured?: boolean;
  projectSlug?: string;
  seo?: { title?: string; description?: string };
};

export type ProjectUnitType = {
  label: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqftFrom?: number;
  areaSqftTo?: number;
  priceFrom?: number;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  developer?: string;
  status: 'planning' | 'pre-launch' | 'under-construction' | 'ready' | 'handover';
  handoverDate?: string;
  startingPrice?: number;
  currency: string;
  address?: Address;
  location?: GeoPoint;
  highlights?: string[];
  amenities?: string[];
  unitTypes?: ProjectUnitType[];
  heroImage?: ImageRef;
  gallery?: ImageRef[];
  brochureUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  seo?: { title?: string; description?: string };
};

export type LeadFormPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  interest: 'buy' | 'rent' | 'invest' | 'general';
  source?: string;
  property?: string;
  project?: string;
};
