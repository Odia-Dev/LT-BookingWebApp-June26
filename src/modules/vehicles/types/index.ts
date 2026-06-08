export type VehicleStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'CNG';

export type TransmissionType = 'Manual' | 'Automatic';

export type VehicleCategory = 'Hatchback' | 'SUV' | 'MPV' | 'Sedan' | 'Utility';

export interface VehicleColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface VehicleVariant {
  id: string;
  vehicleId: string;
  variantName: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  exShowroomPrice: number;
  onRoadPrice: number;
  features: string[];
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFeature {
  id: string;
  category: 'Safety' | 'Comfort' | 'Performance' | 'Technology' | 'Design';
  name: string;
  description: string;
  iconName?: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  type?: string;
}

export interface TwitterCardData {
  title: string;
  description: string;
  image: string;
  card?: 'summary' | 'summary_large_image';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

export interface VehicleLD {
  brand: string;
  model: string;
  bodyType: string;
  priceRange: string;
  url: string;
  image: string;
  fuelType: string[];
  transmission: string[];
}

export interface LocationSEOData {
  title: string;
  metaDescription: string;
  contentBlock: string;
  faqs?: FAQItem[];
}

export interface VehicleSEO {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  openGraph: OpenGraphData;
  twitterCards: TwitterCardData;
  faqSchema: FAQItem[];
  vehicleSchema: VehicleLD;
  breadcrumbSchema: BreadcrumbItem[];
  locationSEOExtensions?: Record<string, LocationSEOData>;
}

export interface Vehicle {
  vehicleId: string;
  slug: string;
  name: string;
  modelCode: string;
  vehicleType: VehicleCategory;
  fuelType: FuelType[];
  transmission: TransmissionType[];
  seatingCapacity: number[];
  startingPrice: number;
  heroImage: string;
  gallery: string[];
  brochure?: string;
  colors: VehicleColor[];
  variants: VehicleVariant[];
  features: VehicleFeature[];
  seo: VehicleSEO;
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleComparison {
  vehicles: Vehicle[];
  priceComparison: { [vehicleId: string]: string };
  specComparison: {
    category: string;
    label: string;
    values: { [vehicleId: string]: string | number | string[] };
  }[];
  prosConsSummary: {
    [vehicleId: string]: {
      pros: string[];
      cons: string[];
      aiSummary: string;
    };
  };
}
