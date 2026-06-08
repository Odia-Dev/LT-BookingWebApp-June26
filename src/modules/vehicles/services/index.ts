import { Vehicle, VehicleVariant, VehicleFeature, VehicleSEO, VehicleComparison, FuelType, TransmissionType, VehicleCategory, LocationSEOData } from '../types';

export interface FilterCriteria {
  vehicleType?: VehicleCategory[];
  fuelType?: FuelType[];
  transmission?: TransmissionType[];
  seatingCapacity?: number[];
  priceRange?: { min?: number; max?: number };
}

// Seed helper to build mock vehicles easily
const createMockVehicle = (id: string, name: string, category: VehicleCategory, price: number, seating: number[], fuel: FuelType[], trans: TransmissionType[]): Vehicle => {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return {
    vehicleId: id,
    slug,
    name,
    modelCode: `TOY-${id.toUpperCase()}`,
    vehicleType: category,
    fuelType: fuel,
    transmission: trans,
    seatingCapacity: seating,
    startingPrice: price,
    heroImage: `/media/toyota_${id}.png`,
    gallery: [
      `/media/toyota_${id}_front.png`,
      `/media/toyota_${id}_side.png`,
      `/media/toyota_${id}_interior.png`
    ],
    brochure: `/docs/brochures/toyota_${id}.pdf`,
    colors: [
      { name: 'Super White', hex: '#FFFFFF' },
      { name: 'Silver Metallic', hex: '#C0C0C0' },
      { name: 'Attitude Black Mica', hex: '#111111' }
    ],
    variants: [
      {
        id: `${id}-var-base`,
        vehicleId: id,
        variantName: 'GX',
        fuelType: fuel[0],
        transmission: trans[0],
        exShowroomPrice: price,
        onRoadPrice: Math.round(price * 1.15),
        features: ['Smart Entry', 'Dual Airbags', 'Touchscreen Infotainment'],
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `${id}-var-top`,
        vehicleId: id,
        variantName: 'ZX (Hybrid/Luxury)',
        fuelType: fuel[fuel.length - 1],
        transmission: trans[trans.length - 1],
        exShowroomPrice: Math.round(price * 1.25),
        onRoadPrice: Math.round(price * 1.25 * 1.15),
        features: ['ADAS Safety Suite', 'Panoromic Sunroof', 'Ventilated Seats', '360 Camera'],
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    features: [
      { id: `${id}-f-1`, category: 'Safety', name: 'Toyota Safety Sense', description: 'Advanced driver assistance systems for safety.', iconName: 'shield' },
      { id: `${id}-f-2`, category: 'Comfort', name: 'Plush Leather Seats', description: 'Premium leather seats with ventilation.', iconName: 'armchair' },
      { id: `${id}-f-3`, category: 'Technology', name: 'Smart Connectivity', description: 'Apple CarPlay & Android Auto wireless support.', iconName: 'wifi' }
    ],
    seo: {
      title: `${name} Price, Features, Specs & Offers | Laxmi Toyota`,
      metaDescription: `Discover the new ${name} at Laxmi Toyota. Learn about prices, specifications, variants, and colors. Book a test drive today in Odisha.`,
      canonicalUrl: `https://www.laxmitoyota.com/vehicles/${slug}`,
      openGraph: {
        title: `${name} | Authorized Toyota Dealer Odisha`,
        description: `Experience the power and luxury of the Toyota ${name}. Available now at Laxmi Toyota.`,
        image: `/media/toyota_${id}.png`
      },
      twitterCards: {
        title: `Toyota ${name} - Laxmi Toyota`,
        description: `Explore pricing and specifications for the Toyota ${name}.`,
        image: `/media/toyota_${id}.png`,
        card: 'summary_large_image'
      },
      faqSchema: [
        { question: `What is the starting price of Toyota ${name}?`, answer: `The starting price of the Toyota ${name} is ₹${(price / 100000).toFixed(2)} Lakh ex-showroom.` },
        { question: `Is Toyota ${name} available in hybrid?`, answer: fuel.includes('Hybrid') ? `Yes, the ${name} comes with Toyota's advanced self-charging hybrid technology.` : `No, the ${name} is currently available in ${fuel.join(' & ')} configurations.` }
      ],
      vehicleSchema: {
        brand: 'Toyota',
        model: name,
        bodyType: category,
        priceRange: `INR ${price} - ${price * 1.4}`,
        url: `https://www.laxmitoyota.com/vehicles/${slug}`,
        image: `https://www.laxmitoyota.com/media/toyota_${id}.png`,
        fuelType: fuel,
        transmission: trans
      },
      breadcrumbSchema: [
        { position: 1, name: 'Home', item: 'https://www.laxmitoyota.com' },
        { position: 2, name: 'Vehicles', item: 'https://www.laxmitoyota.com/vehicles' },
        { position: 3, name: name, item: `https://www.laxmitoyota.com/vehicles/${slug}` }
      ],
      locationSEOExtensions: {
        brahmapur: {
          title: `Toyota ${name} Price in Brahmapur | Laxmi Toyota Showroom`,
          metaDescription: `Get the best deals on Toyota ${name} in Brahmapur. Call our Laxmi Toyota showroom today for offers and test drives.`,
          contentBlock: `Welcome to Laxmi Toyota Brahmapur, your premier destination for the Toyota ${name}. We provide seamless finance options and test drives across Ganjam district.`,
          faqs: [
            { question: `Where is Laxmi Toyota showroom in Brahmapur?`, answer: `Our Brahmapur showroom is centrally located with full sales and service support.` }
          ]
        },
        jeypore: {
          title: `Toyota ${name} Showroom in Jeypore | Laxmi Toyota`,
          metaDescription: `Explore the Toyota ${name} in Jeypore, Koraput. Visit Laxmi Toyota for on-road pricing and exchange offers.`,
          contentBlock: `Laxmi Toyota Jeypore serves the entire southern region of Odisha with genuine Toyota vehicles including the premium ${name}.`,
          faqs: [
            { question: `Are exchange offers available in Jeypore for ${name}?`, answer: `Yes, we offer on-the-spot vehicle evaluation and exchange bonuses at our Jeypore branch.` }
          ]
        }
      }
    },
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Complete catalog of 11 Toyota Vehicles
export const MOCK_VEHICLES: Vehicle[] = [
  createMockVehicle('glanza', 'Toyota Glanza', 'Hatchback', 686000, [5], ['Petrol', 'CNG'], ['Manual', 'Automatic']),
  createMockVehicle('taisor', 'Toyota Taisor', 'SUV', 774000, [5], ['Petrol', 'CNG'], ['Manual', 'Automatic']),
  createMockVehicle('rumion', 'Toyota Rumion', 'MPV', 1044000, [7], ['Petrol', 'CNG'], ['Manual', 'Automatic']),
  createMockVehicle('hyryder', 'Toyota Hyryder', 'SUV', 1114000, [5], ['Petrol', 'Hybrid'], ['Manual', 'Automatic']),
  createMockVehicle('innovacrysta', 'Toyota Innova Crysta', 'MPV', 1999000, [7, 8], ['Diesel'], ['Manual']),
  createMockVehicle('innovahycross', 'Toyota Innova Hycross', 'MPV', 1977000, [7, 8], ['Petrol', 'Hybrid'], ['Automatic']),
  createMockVehicle('fortuner', 'Toyota Fortuner', 'SUV', 3343000, [7], ['Petrol', 'Diesel'], ['Manual', 'Automatic']),
  createMockVehicle('camry', 'Toyota Camry', 'Sedan', 4617000, [5], ['Hybrid'], ['Automatic']),
  createMockVehicle('hilux', 'Toyota Hilux', 'Utility', 3040000, [5], ['Diesel'], ['Manual', 'Automatic']),
  createMockVehicle('vellfire', 'Toyota Vellfire', 'MPV', 12000000, [7], ['Hybrid'], ['Automatic']),
  createMockVehicle('landcruiser300', 'Toyota Land Cruiser 300', 'SUV', 21000000, [5], ['Diesel'], ['Automatic'])
];

export class VehicleRepository {
  static getAll(): Vehicle[] {
    return MOCK_VEHICLES.filter(v => v.status === 'ACTIVE');
  }

  static getById(id: string): Vehicle | undefined {
    return MOCK_VEHICLES.find(v => v.vehicleId === id && v.status === 'ACTIVE');
  }

  static getBySlug(slug: string): Vehicle | undefined {
    const cleanSlug = slug.toLowerCase().trim().replace(/^toyota-/, '').replace(/-/, '');
    return MOCK_VEHICLES.find(v => {
      const vCleanSlug = v.slug.replace(/^toyota-/, '').replace(/-/, '');
      const vId = v.vehicleId.toLowerCase();
      return (
        v.slug === slug || 
        v.vehicleId === slug || 
        vCleanSlug.includes(cleanSlug) || 
        cleanSlug.includes(vCleanSlug) ||
        vId.includes(cleanSlug) ||
        cleanSlug.includes(vId)
      ) && v.status === 'ACTIVE';
    });
  }

}

export class VehicleSearchService {
  static search(query: string, vehicles: Vehicle[] = MOCK_VEHICLES): Vehicle[] {
    const term = query.toLowerCase().trim();
    if (!term) return vehicles;

    return vehicles.filter(v => 
      v.name.toLowerCase().includes(term) ||
      v.modelCode.toLowerCase().includes(term) ||
      v.vehicleType.toLowerCase().includes(term) ||
      v.fuelType.some(f => f.toLowerCase().includes(term)) ||
      v.features.some(f => f.name.toLowerCase().includes(term) || f.description.toLowerCase().includes(term))
    );
  }
}

export class VehicleFilterService {
  static filter(criteria: FilterCriteria, vehicles: Vehicle[] = MOCK_VEHICLES): Vehicle[] {
    return vehicles.filter(v => {
      // Filter by vehicle type
      if (criteria.vehicleType && criteria.vehicleType.length > 0) {
        if (!criteria.vehicleType.includes(v.vehicleType)) return false;
      }

      // Filter by fuel type
      if (criteria.fuelType && criteria.fuelType.length > 0) {
        const hasFuel = v.fuelType.some(f => criteria.fuelType!.includes(f));
        if (!hasFuel) return false;
      }

      // Filter by transmission
      if (criteria.transmission && criteria.transmission.length > 0) {
        const hasTrans = v.transmission.some(t => criteria.transmission!.includes(t));
        if (!hasTrans) return false;
      }

      // Filter by seating capacity
      if (criteria.seatingCapacity && criteria.seatingCapacity.length > 0) {
        const hasSeating = v.seatingCapacity.some(s => criteria.seatingCapacity!.includes(s));
        if (!hasSeating) return false;
      }

      // Filter by price range
      if (criteria.priceRange) {
        if (criteria.priceRange.min !== undefined && v.startingPrice < criteria.priceRange.min) return false;
        if (criteria.priceRange.max !== undefined && v.startingPrice > criteria.priceRange.max) return false;
      }

      return true;
    });
  }
}

export class VehicleSEOService {
  static getMetadata(vehicle: Vehicle): VehicleSEO {
    return vehicle.seo;
  }

  static getFAQSchema(vehicle: Vehicle) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': vehicle.seo.faqSchema.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }

  static getVehicleSchema(vehicle: Vehicle) {
    const s = vehicle.seo.vehicleSchema;
    return {
      '@context': 'https://schema.org',
      '@type': 'Car',
      'name': vehicle.name,
      'brand': {
        '@type': 'Brand',
        'name': s.brand
      },
      'bodyType': s.bodyType,
      'image': s.image,
      'url': s.url,
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'INR',
        'lowPrice': vehicle.startingPrice,
        'highPrice': Math.round(vehicle.startingPrice * 1.3),
        'offerCount': vehicle.variants.length
      }
    };
  }

  static getBreadcrumbs(vehicle: Vehicle) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': vehicle.seo.breadcrumbSchema.map(b => ({
        '@type': 'ListItem',
        'position': b.position,
        'name': b.name,
        'item': b.item
      }))
    };
  }

  static getLocationSEO(vehicle: Vehicle, locationKey: string): LocationSEOData | undefined {
    return vehicle.seo.locationSEOExtensions?.[locationKey.toLowerCase()];
  }
}

export class VehicleComparisonService {
  static compare(vehicles: Vehicle[]): VehicleComparison {
    const priceComparison: { [vehicleId: string]: string } = {};
    vehicles.forEach(v => {
      priceComparison[v.vehicleId] = `Starting from ₹${(v.startingPrice / 100000).toFixed(2)} Lakh`;
    });

    const specComparison = [
      {
        category: 'Engine & Performance',
        label: 'Fuel Types',
        values: vehicles.reduce((acc, v) => ({ ...acc, [v.vehicleId]: v.fuelType }), {})
      },
      {
        category: 'Engine & Performance',
        label: 'Transmission Options',
        values: vehicles.reduce((acc, v) => ({ ...acc, [v.vehicleId]: v.transmission }), {})
      },
      {
        category: 'Interior & Space',
        label: 'Seating Capacity',
        values: vehicles.reduce((acc, v) => ({ ...acc, [v.vehicleId]: v.seatingCapacity.map(s => `${s} Seater`).join('/') }), {})
      },
      {
        category: 'Structure',
        label: 'Vehicle Category',
        values: vehicles.reduce((acc, v) => ({ ...acc, [v.vehicleId]: v.vehicleType }), {})
      }
    ];

    const prosConsSummary: {
      [vehicleId: string]: {
        pros: string[];
        cons: string[];
        aiSummary: string;
      };
    } = {};

    vehicles.forEach(v => {
      prosConsSummary[v.vehicleId] = {
        pros: [
          `Legendary Toyota Reliability`,
          v.fuelType.includes('Hybrid') ? `Class-leading hybrid efficiency` : `High resale value`,
          `Spacious cabin experience`
        ],
        cons: [
          `Waiting periods due to high demand`,
          v.startingPrice > 3000000 ? `Premium pricing bracket` : `Basic features in base trims`
        ],
        aiSummary: `${v.name} is a stellar choice in the ${v.vehicleType} category, highly demanded in regional hubs like Brahmapur and Jeypore due to its ${v.fuelType.join('/')} engine options.`
      };
    });

    return {
      vehicles,
      priceComparison,
      specComparison,
      prosConsSummary
    };
  }
}
