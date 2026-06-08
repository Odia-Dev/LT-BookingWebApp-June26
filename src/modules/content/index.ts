export interface FAQ {
  id: string;
  category: 'vehicle' | 'finance' | 'exchange' | 'booking' | 'location';
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  location: string;
  model: string;
  date: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: 'buying' | 'ownership';
  description: string;
  content: string;
  publishedDate: string;
  faqList: { question: string; answer: string }[];
  summaryBlock: string;
  benefits?: string[];
  comparisonTable?: { headers: string[]; rows: string[][] };
}

export const MOCK_FAQS: FAQ[] = [
  {
    id: 'f-v-1',
    category: 'vehicle',
    question: 'What is Toyota\'s strong hybrid technology?',
    answer: 'Toyota\'s self-charging strong hybrid technology combines a highly efficient petrol engine with a powerful electric motor. The vehicle switches seamlessly between electric mode, petrol engine mode, or both, depending on driving parameters, maximizing fuel efficiency without needing external plug-in charging.'
  },
  {
    id: 'f-v-2',
    category: 'vehicle',
    question: 'Which Toyota models feature strong hybrid options?',
    answer: 'The Toyota Urban Cruiser Hyryder, Toyota Innova Hycross, Toyota Camry, and Toyota Vellfire are available with self-charging strong hybrid options in Odisha.'
  },
  {
    id: 'f-f-1',
    category: 'finance',
    question: 'How do I apply for Toyota finance online?',
    answer: 'You can submit a secure finance application directly through our website. Choose your vehicle, enter basic details, upload documentation, and our team will coordinate quotes with partner banks (SBI, HDFC, ICICI, etc.) for quick approvals.'
  },
  {
    id: 'f-e-1',
    category: 'exchange',
    question: 'How does the Laxmi Toyota exchange evaluation work?',
    answer: 'Submit details of your existing car (make, model, year, photos) on our portal. Our certified assessors will evaluate the inputs and provide a transparent trade-in estimate, complete with applicable corporate exchange bonuses.'
  },
  {
    id: 'f-b-1',
    category: 'booking',
    question: 'Is the online reservation token refundable?',
    answer: 'Yes, the online reservation token is 100% refundable. If you decide to cancel or modify your booking prior to final dealer invoicing, the entire amount will be returned to your original payment source.'
  },
  {
    id: 'f-l-1',
    category: 'location',
    question: 'Which locations does Laxmi Toyota cover in Odisha?',
    answer: 'We cover major South & West Odisha territories, including Brahmapur, Jeypore, Rayagada, Bhawanipatna, Bargarh, Balangir, Paralakhemundi, and surrounding partner support areas.'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alekha C. Dash',
    rating: 5,
    comment: 'Extremely satisfied with the delivery of my Innova Hycross. The team at Brahmapur handled registration and financing seamlessly.',
    location: 'Brahmapur',
    model: 'Toyota Innova Hycross',
    date: '2 weeks ago'
  },
  {
    id: 'rev-2',
    author: 'Mamata Panigrahi',
    rating: 5,
    comment: 'Applied for vehicle finance online, and the executive assigned from Jeypore branch resolved everything in a day. Highly recommend!',
    location: 'Jeypore',
    model: 'Toyota Hyryder',
    date: '1 month ago'
  },
  {
    id: 'rev-3',
    author: 'Siddharth Patnaik',
    rating: 5,
    comment: 'Great off-road capability testing for the Fortuner. Very transparent valuation on my old exchange car.',
    location: 'Rayagada',
    model: 'Toyota Fortuner',
    date: '3 weeks ago'
  },
  {
    id: 'rev-4',
    author: 'Sunita Meher',
    rating: 5,
    comment: 'Smooth Glanza delivery in Bargarh. Responsive sales team and clear ex-showroom pricing guidelines.',
    location: 'Bargarh',
    model: 'Toyota Glanza',
    date: '1 month ago'
  }
];

export const MOCK_GUIDES: Guide[] = [
  {
    slug: 'toyota-hyryder-buying-guide',
    title: 'Toyota Hyryder Buying Guide',
    category: 'buying',
    description: 'Learn about ex-showroom prices, variants, strong hybrid mileage, and options for the Toyota Urban Cruiser Hyryder in Odisha.',
    summaryBlock: 'The Toyota Hyryder is a class-defining midsize SUV featuring strong hybrid tech, making it ideal for daily city commutes and highway cruising across Odisha.',
    publishedDate: '2026-06-08',
    content: 'The Toyota Hyryder offers a blend of performance and fuel efficiency. Available in Neo Drive (Mild Hybrid) and Self-Charging Strong Hybrid variants, it delivers segment-leading fuel economies of up to 27.97 km/l. Key highlights include dynamic safety suites, panoramic sunroof, and head-up display.',
    benefits: [
      'Segment-leading mileage of up to 27.97 km/l (Strong Hybrid).',
      'All-Wheel Drive (AWD) option in mild-hybrid manual variant.',
      'Low cost of ownership backed by 3-year warranty.'
    ],
    comparisonTable: {
      headers: ['Parameter', 'Mild Hybrid (Neo Drive)', 'Strong Hybrid'],
      rows: [
        ['Fuel Economy', '19.39 - 21.12 km/l', '27.97 km/l'],
        ['Battery Tech', 'Lithium-ion (ISG)', 'High-voltage Self-Charging'],
        ['Drive Modes', 'Engine Only', 'Pure EV / Hybrid / Engine'],
        ['Transmission', '5MT / 6AT', 'e-Drive (CVT)']
      ]
    },
    faqList: [
      { question: 'What is the real-world mileage of Hyryder Hybrid?', answer: 'Under standard driving parameters, the Hyryder Strong Hybrid delivers around 24-26 km/l in city conditions.' },
      { question: 'Is AWD available in Hyryder hybrid?', answer: 'No, AWD is exclusively available in the top-spec mild-hybrid manual variant.' }
    ]
  },
  {
    slug: 'toyota-hycross-buying-guide',
    title: 'Toyota Hycross Buying Guide',
    category: 'buying',
    description: 'Comprehensive buying guide for the premium Innova Hycross hybrid MPV detailing features, pricing, and variants.',
    summaryBlock: 'The Toyota Innova Hycross is a premium monocoque MPV offering lounge-like comfort, hybrid efficiency, and advanced ADAS safety.',
    publishedDate: '2026-06-08',
    content: 'Moving away from the traditional ladder-frame setup, the Innova Hycross uses a monocoque chassis (TNGA-C). It offers exceptional ride quality, Ottoman seat configurations, 10.1-inch touchscreens, and advanced driver assistance systems (Toyota Safety Sense). Available in petrol and strong hybrid formats.',
    benefits: [
      'Luxurious 7 and 8 seating configurations with captain chairs.',
      'Highly fuel-efficient strong hybrid engine (21.1 km/l).',
      'Toyota Safety Sense 3.0 (ADAS).'
    ],
    comparisonTable: {
      headers: ['Feature', 'Innova Crysta (Diesel)', 'Innova Hycross (Hybrid)'],
      rows: [
        ['Chassis', 'Ladder Frame (RWD)', 'Monocoque (FWD)'],
        ['Engine Type', '2.4L Diesel', '2.0L Petrol + Electric Motor'],
        ['Fuel Economy', 'Approx. 12-14 km/l', '21.1 km/l'],
        ['Second Row', 'Standard Captain Seats', 'Powered Ottoman Seats']
      ]
    },
    faqList: [
      { question: 'Is the Crysta diesel discontinued?', answer: 'No, the Innova Crysta Diesel continues to be sold alongside the Innova Hycross.' }
    ]
  },
  {
    slug: 'toyota-fortuner-buying-guide',
    title: 'Toyota Fortuner Buying Guide',
    category: 'buying',
    description: 'Explore variants, 4x4 drivetrain features, and local dealership pricing specifications for the Toyota Fortuner SUV.',
    summaryBlock: 'The Toyota Fortuner remains the undisputed king of premium SUVs in Odisha, offering legendary off-road reliability and high resale returns.',
    publishedDate: '2026-06-08',
    content: 'Powered by the robust 2.8L diesel engine generating 204 PS power and up to 500 Nm torque, the Fortuner stands out as an off-roading powerhouse. Features include active traction control, downhill assist, electronic differential lock, and premium leather finishes.',
    benefits: [
      'Legendary off-road durability with 4x4 capability.',
      'Extremely high resale value across pre-owned markets.',
      'Dominating road presence and high safety scores.'
    ],
    comparisonTable: {
      headers: ['Engine Variant', 'Power (PS)', 'Torque (Nm)', 'Drivetrain'],
      rows: [
        ['2.7L Petrol', '166', '245', '2WD (4x2)'],
        ['2.8L Diesel MT', '204', '420', '2WD / 4WD'],
        ['2.8L Diesel AT', '204', '500', '2WD / 4WD']
      ]
    },
    faqList: [
      { question: 'What is the seating capacity of the Fortuner?', answer: 'The Toyota Fortuner is a dedicated 7-seater SUV.' }
    ]
  },
  {
    slug: 'toyota-rumion-buying-guide',
    title: 'Toyota Rumion Buying Guide',
    category: 'buying',
    description: 'Learn about variant prices, fuel choices, and CNG options for the Toyota Rumion family MPV.',
    summaryBlock: 'The Toyota Rumion is an affordable 7-seater MPV, perfect for families looking for reliability, spacious interiors, and factory-fitted CNG.',
    publishedDate: '2026-06-08',
    content: 'The Rumion serves as a reliable family carrier. Powered by the Neo Drive 1.5L K-series engine, it offers excellent fuel economy and comfort. Key features include automatic climate control, smartphone integration, and smart entry.',
    benefits: [
      'Very affordable entry price for a spacious 7-seater.',
      'Factory-fitted Toyota CNG option with high mileage.',
      'Compact size for comfortable city navigation.'
    ],
    faqList: [
      { question: 'What is the mileage of Rumion CNG?', answer: 'The Rumion CNG offers an excellent fuel economy of 26.11 km/kg.' }
    ]
  },
  {
    slug: 'toyota-taisor-buying-guide',
    title: 'Toyota Taisor Buying Guide',
    category: 'buying',
    description: 'Check out specs, turbo engine choices, and mileage details for the new Toyota Urban Cruiser Taisor.',
    summaryBlock: 'The Toyota Taisor is a premium compact crossover SUV offering turbo-charged performance, high ground clearance, and modern styling.',
    publishedDate: '2026-06-08',
    content: 'The Taisor marks Toyota\'s entry into the sub-4m compact crossover segment. Available with a sporty 1.0L Turbo engine and a reliable 1.2L petrol engine, it offers top-tier tech like 360-degree cameras, wireless chargers, and head-up display.',
    benefits: [
      'Sub-4 meter dimensions for easy urban parking and driving.',
      'Sporty 1.0L Turbo Boosterjet engine.',
      'Modern aesthetics with connected LED lightbars.'
    ],
    faqList: [
      { question: 'Is Taisor available in CNG?', answer: 'Yes, the Taisor comes with a factory-fitted CNG option in the base trim.' }
    ]
  },
  {
    slug: 'service-cost-guide',
    title: 'Toyota Service Cost & Maintenance Guide',
    category: 'ownership',
    description: 'Detailed service schedule, cost breakdown, and maintenance privileges at Laxmi Toyota Odisha workshops.',
    summaryBlock: 'Understand how Toyota\'s legendary build quality translates into low service costs, with structured schedules and transparent pricing at Laxmi Toyota.',
    publishedDate: '2026-06-08',
    content: 'Toyota maintenance costs are among the lowest in the industry. With a standard service interval of 10,000 km or 1 year, Laxmi Toyota offers transparent pricing packages, genuine parts, and quick EXPRESS service options.',
    benefits: [
      'Transparent service calculators with upfront cost sheets.',
      '60-minute quick service availability via EXPRESS bays.',
      'High resale value protection through certified service logs.'
    ],
    faqList: [
      { question: 'How often should I service my Toyota?', answer: 'Toyota recommends servicing your vehicle every 10,000 km or 1 year, whichever comes first.' }
    ]
  },
  {
    slug: 'finance-guide',
    title: 'Toyota Car Finance & EMI Application Guide',
    category: 'ownership',
    description: 'Step-by-step instructions to calculate EMIs, choose bank partners, and apply for car loans online.',
    summaryBlock: 'Get paperless car finance approvals with lowest interest rates and zero-down payment deals customized for Odisha residents.',
    publishedDate: '2026-06-08',
    content: 'Financing your dream Toyota is easy with Laxmi Toyota. We coordinate with top banking institutions (SBI, HDFC, ICICI, Axis) to offer customized EMI parameters, fast loan turnarounds, and minimal paperwork.',
    benefits: [
      'Instant EMI calculators available online.',
      'Paperless document uploads for fast credit checks.',
      'Attractive low interest interest rate tie-ups.'
    ],
    faqList: [
      { question: 'What documents are required for car loans?', answer: 'Standard documents include Aadhaar card, PAN card, address proof, income proofs (3 months salary slips or IT returns), and bank statements.' }
    ]
  },
  {
    slug: 'insurance-guide',
    title: 'Toyota Insurance Renewal & Claims Guide',
    category: 'ownership',
    description: 'Learn about zero-depreciation coverage, engine protection add-ons, and cashless claims at Laxmi Toyota.',
    summaryBlock: 'Secure your Toyota with comprehensive insurance packages, quick cashless claims processing, and high settlement ratios in Odisha.',
    publishedDate: '2026-06-08',
    content: 'Protect your vehicle against accident repairs and thefts. Laxmi Toyota partners with leading motor insurance providers to offer zero-depreciation covers, return-to-invoice benefits, and cashless repair authorizations.',
    benefits: [
      'Cashless claim settlement across all Laxmi Toyota workshops.',
      'Genuine Toyota spare parts used for all repairs.',
      'Fast renewals with attractive no-claim bonuses.'
    ],
    faqList: [
      { question: 'What is Zero-Depreciation cover?', answer: 'Zero-depreciation insurance guarantees 100% payout for replaced parts during claim settlements, excluding standard consumables.' }
    ]
  },
  {
    slug: 'exchange-guide',
    title: 'Toyota Vehicle Exchange & Valuation Guide',
    category: 'ownership',
    description: 'Learn how to trade in your existing car, calculate exchange bonuses, and upgrade to a new Toyota.',
    summaryBlock: 'Upgrade to a new Toyota with our transparent vehicle valuation system and attractive trade-in exchange bonuses.',
    publishedDate: '2026-06-08',
    content: 'Upgrade your ride with Laxmi Toyota. We accept multi-brand vehicles for trade-ins. Get an instant, transparent evaluation backed by reliable pricing metrics, exchange bonuses, and quick title transfers.',
    benefits: [
      'On-the-spot vehicle inspection and evaluation.',
      'Attractive exchange bonuses on hybrid and SUV models.',
      'Hassle-free paperwork and loan clearance assistance.'
    ],
    faqList: [
      { question: 'Do you evaluate non-Toyota cars?', answer: 'Yes, we evaluate and accept trade-ins for all automobile brands.' }
    ]
  }
];

export class ContentRepository {
  static getAllFAQs(): FAQ[] {
    return MOCK_FAQS;
  }

  static getFAQsByCategory(cat: FAQ['category']): FAQ[] {
    return MOCK_FAQS.filter(faq => faq.category === cat);
  }

  static getAllReviews(): Review[] {
    return MOCK_REVIEWS;
  }

  static getReviewsByLocation(loc: string): Review[] {
    const term = loc.toLowerCase().trim();
    return MOCK_REVIEWS.filter(rev => rev.location.toLowerCase().includes(term));
  }

  static getAllGuides(): Guide[] {
    return MOCK_GUIDES;
  }

  static getGuideBySlug(slug: string): Guide | undefined {
    return MOCK_GUIDES.find(g => g.slug === slug);
  }
}

