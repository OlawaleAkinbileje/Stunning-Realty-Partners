
import { Property, TeamMember, BlogPost } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'bolton-height',
    title: 'Bolton Height Lekki Phase 1',
    price: 250000000,
    location: 'Lekki Phase 1, Lagos',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'assets/Available-properties/Bolton/2.jpeg',
    images: [
      'assets/Available-properties/Bolton/2.jpeg',
      'assets/Available-properties/Bolton/3.jpeg',
      'assets/Available-properties/Bolton/4.jpeg',
      'assets/Available-properties/Bolton/5.jpeg',
      'assets/Available-properties/Bolton/6.jpeg'
    ],
    description: 'Luxurious 2 bedroom apartments designed to soothe your impeccable taste. Perfect middle ground for small families and singles. Located in the prestigious neighborhood of Lekki Phase 1.',
    type: 'Apartment',
    status: 'Still Selling',
    featured: true,
    createdAt: '2025-02-05',
    amenities: ['Electric charging stations', 'Automated home features', 'Swimming pool', 'Gym'],
    paymentPlans: [
      { name: 'Outright Payment', price: 250000000 },
      { name: '6 Months Plan', price: 270000000, deposit: 20000000 },
      { name: '12 Months Plan', price: 290000000, deposit: 20000000 }
    ]
  },
  {
    id: 'mowe-golf-town',
    title: 'Mowe Golf Town - Lake Front',
    price: 10500000,
    location: 'Off Lagos-Ibadan Expressway, Mowe',
    image: 'assets/Available-properties/Mowe/1.jpeg',
    images: [
      'assets/Available-properties/Mowe/1.jpeg',
      'assets/Available-properties/Mowe/2.jpeg',
      'assets/Available-properties/Mowe/3.jpeg'
    ],
    description: 'Nigeria’s first golf estate to fully integrate eco-conscious design with communal living. Scenic lakefront views marrying serenity and natural lifestyle.',
    type: 'Land',
    status: 'For Sale',
    featured: true,
    createdAt: '2025-02-04',
    titleType: 'Certificate of Occupancy (C of O)',
    landmarks: ['Christopher University', 'Punch Newspaper', 'RCCG Camp', 'Deeper Life'],
    units: [
      { type: 'Creek View 300 SQM', price: 10500000 },
      { type: 'Creek View 500 SQM', price: 15500000 },
      { type: 'Lake Front 500 SQM', price: 20000000 },
      { type: 'Commercial Village 500 SQM', price: 28000000 }
    ]
  },
  {
    id: 'ibbys-mall',
    title: "IBBY's Mall - Commercial Space",
    price: 1500000,
    location: 'Hitech Road, beside LBS, Lagos',
    image: 'assets/Available-properties/Ibbys-mall/1.jpeg',
    images: [
      'assets/Available-properties/Ibbys-mall/1.jpeg',
      'assets/Available-properties/Ibbys-mall/2.jpeg',
      'assets/Available-properties/Ibbys-mall/3.jpeg',
      'assets/Available-properties/Ibbys-mall/4.jpeg',
      'assets/Available-properties/Ibbys-mall/5.jpeg'
    ],
    description: "Landmark commercial development offering flexibility to buy shop spaces by square meter. Designed for visibility, growth, and modern commerce.",
    type: 'Commercial',
    status: 'Still Selling',
    featured: true,
    createdAt: '2025-02-05',
    sqmPrice: 1500000,
    amenities: ['24/7 Security', 'Reliable Power Supply', 'Ample Parking', 'High Foot Traffic']
  },
  {
    id: 'victoria-island-exquisite',
    title: 'Exquisite 2-Bedroom VI Apartment',
    price: 450000000,
    location: 'Victoria Island, Lagos',
    beds: 2,
    baths: 2,
    image: 'assets/Available-properties/Victoria-Island/1.jpeg',
    images: [
      'assets/Available-properties/Victoria-Island/1.jpeg',
      'assets/Available-properties/Victoria-Island/2.jpeg',
      'assets/Available-properties/Victoria-Island/3.jpeg'
    ],
    description: 'Architectural masterpiece in the heart of VI. Finishing stage (95% completed). Includes maid room and premium facilities.',
    type: 'Apartment',
    status: 'For Sale',
    featured: false,
    createdAt: '2025-01-20',
    titleType: 'Certificate of Occupancy (C of O)',
    investmentInsights: {
      shortLet: 'N250k per night',
      rental: 'N35m per annum',
      appreciation: '10-50% per annum'
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'demand-september-2025',
    title: 'The Surge in 2-Bedroom Demand: A Lagos Market Analysis',
    excerpt: 'Research from September 2025 indicates that demand for 2-bedroom apartments in prime Lagos locations has reached an unprecedented 73%.',
    content: `The demand for properties in Lagos has always been on the rise and the demand for 2 bedroom apartments tops the list. Based off research, in September 2025 alone, demand for 2 bedroom apartments in Lagos peaked at 73%.

Here’s a few reasons for this trend:
1. It’s the perfect middle ground, ideal for small families and equally comfortable for singles.
2. It offers great value for money, with decent rental rates compared to larger apartments.

With this consistent demand, investing in a 2-bedroom apartment is one of the smartest real estate decisions you can make. The modern urbanite prioritizes functionality and security, two pillars that the 2-bedroom model excels in.

Stunning Realty Partners has observed that units in Lekki Phase 1 and Victoria Island are seeing the highest velocity. For investors, this represents a low-vacancy risk and high appreciation potential over the next 18 months.`,
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623abe5?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 5, 2025',
    category: 'Market Trends'
  },
  {
    id: 'eco-conscious-living',
    title: 'Sustainable Real Estate: Setting the Standard with Mowe Golf Town',
    excerpt: 'As Nigeria’s first golf estate to fully integrate eco-conscious design with communal living, Mowe Golf Town sets a new standard for sustainable living.',
    content: `Nigeria’s first golf estate to fully integrate eco-conscious design with communal living, Mowe Golf Town sets a new standard for sustainable living. 

With the introduction of its Lake Front Plot, Nigeria's Premier Golfing Destination offers scenic, lakefront views marrying serenity and natural lifestyle. 

Sustainable living is no longer a luxury; it's a necessity for the future. By integrating solar power, waste management systems, and green corridors, Mowe Golf Town is proving that architecture can coexist with nature. This eco-conscious approach doesn't just benefit the environment—it significantly increases the long-term value of the assets. Residents enjoy lower utility costs and a healthier living environment, making it a highly attractive prospect for the modern homeowner.`,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 4, 2025',
    category: 'Innovation'
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Yinka Ogunwale',
    role: 'Founder & CEO',
    bio: 'With over 20 years in luxury real estate, Yinka leads with vision and integrity.',
    image: '/assets/staff/ceo.png'
  },
  {
    name: 'Adeyinka',
    role: 'Senior Sales Director',
    bio: 'Adeyinka is a master negotiator who has closed over $500M in residential deals.',
    image: '/assets/staff/SRPx.png'
  },
  {
    name: 'Olawale Akinbileje',
    role: 'Client Relations Manager',
    bio: 'Olawale ensures every SRP client receives personalized, white-glove service.',
    image: '/assets/staff/SRPx.png'
  }
];
