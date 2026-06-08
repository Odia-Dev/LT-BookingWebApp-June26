export interface LocationDetails {
  id: string;
  name: string;
  code: string;
  district: string;
  type: 'Main Branch' | 'Branch' | 'SEO Partner Area';
  nearestBranch: string;
  address: string;
  phone: string;
  latitude?: number;
  longitude?: number;
}

export const OFFICIAL_LOCATIONS: LocationDetails[] = [
  {
    id: 'brahmapur',
    name: 'Brahmapur',
    code: 'BAM',
    district: 'Ganjam',
    type: 'Main Branch',
    nearestBranch: 'Brahmapur Main Branch',
    address: 'Laxmi Toyota, NH-16 Bypass Road, Brahmapur, Ganjam, Odisha 760001',
    phone: '+91 94370 12345',
    latitude: 19.3150,
    longitude: 84.7941
  },
  {
    id: 'aska',
    name: 'Aska',
    code: 'ASK',
    district: 'Ganjam',
    type: 'Branch',
    nearestBranch: 'Aska Branch',
    address: 'Laxmi Toyota, Bhanjanagar Road, Aska, Ganjam, Odisha 761111',
    phone: '+91 94370 88990',
    latitude: 19.6105,
    longitude: 84.6543
  },
  {
    id: 'bhanjanagar',
    name: 'Bhanjanagar',
    code: 'BAM',
    district: 'Ganjam North',
    type: 'SEO Partner Area',
    nearestBranch: 'Brahmapur Main Branch',
    address: 'Laxmi Toyota Support Desk, Main Road, Bhanjanagar, Ganjam, Odisha 761126',
    phone: '+91 94370 12345',
    latitude: 19.9322,
    longitude: 84.5839
  },
  {
    id: 'paralakhemundi',
    name: 'Paralakhemundi',
    code: 'PAR',
    district: 'Gajapati',
    type: 'Branch',
    nearestBranch: 'Paralakhemundi Branch',
    address: 'Laxmi Toyota Showroom, Palace Line Road, Paralakhemundi, Gajapati, Odisha 761200',
    phone: '+91 94370 99001',
    latitude: 18.7831,
    longitude: 84.0934
  },
  {
    id: 'rayagada',
    name: 'Rayagada',
    code: 'RAY',
    district: 'Rayagada',
    type: 'Branch',
    nearestBranch: 'Rayagada Branch',
    address: 'Laxmi Toyota Building, NH-326 Overbridge, Rayagada, Odisha 765001',
    phone: '+91 94370 98765',
    latitude: 19.1678,
    longitude: 83.4243
  },
  {
    id: 'jeypore',
    name: 'Jeypore',
    code: 'JEY',
    district: 'Koraput',
    type: 'Branch',
    nearestBranch: 'Jeypore Branch',
    address: 'Laxmi Toyota, Koraput Road Bypass, Jeypore, Koraput, Odisha 764001',
    phone: '+91 94370 54321',
    latitude: 18.8552,
    longitude: 82.5644
  },
  {
    id: 'malkangiri',
    name: 'Malkangiri',
    code: 'JEY',
    district: 'Malkangiri',
    type: 'SEO Partner Area',
    nearestBranch: 'Jeypore Branch',
    address: 'Laxmi Toyota Jeypore Partner Desk, Malkangiri Main Road, Malkangiri, Odisha 764045',
    phone: '+91 94370 54321',
    latitude: 18.3436,
    longitude: 81.8824
  },
  {
    id: 'nabarangpur',
    name: 'Nabarangpur',
    code: 'JEY',
    district: 'Nabarangpur',
    type: 'SEO Partner Area',
    nearestBranch: 'Jeypore Branch',
    address: 'Laxmi Toyota Jeypore Partner Desk, Nabarangpur Town, Nabarangpur, Odisha 764059',
    phone: '+91 94370 54321',
    latitude: 19.2319,
    longitude: 82.5539
  },
  {
    id: 'bhawanipatna',
    name: 'Bhawanipatna',
    code: 'BHA',
    district: 'Kalahandi',
    type: 'Branch',
    nearestBranch: 'Bhawanipatna Branch',
    address: 'Laxmi Toyota, Junagarh Bypass Road, Bhawanipatna, Kalahandi, Odisha 766001',
    phone: '+91 94370 11223',
    latitude: 19.8074,
    longitude: 83.1649
  },
  {
    id: 'bargarh',
    name: 'Bargarh',
    code: 'BAR',
    district: 'Bargarh',
    type: 'Branch',
    nearestBranch: 'Bargarh Branch',
    address: 'Laxmi Toyota, NH-6, Bargarh Bypass, Bargarh, Odisha 768028',
    phone: '+91 94370 44556',
    latitude: 21.3347,
    longitude: 83.6232
  },
  {
    id: 'balangir',
    name: 'Balangir',
    code: 'BAL',
    district: 'Balangir',
    type: 'Branch',
    nearestBranch: 'Balangir Branch',
    address: 'Laxmi Toyota Showroom, Sambalpur-Patnagarh Road, Balangir, Odisha 767001',
    phone: '+91 94370 77889',
    latitude: 20.7161,
    longitude: 83.4842
  },
  {
    id: 'nuapada',
    name: 'Nuapada',
    code: 'BAL',
    district: 'Nuapada',
    type: 'SEO Partner Area',
    nearestBranch: 'Balangir Branch',
    address: 'Laxmi Toyota Balangir Partner Desk, Nuapada Highway Junction, Nuapada, Odisha 766105',
    phone: '+91 94370 77889',
    latitude: 20.1311,
    longitude: 82.5317
  },
  {
    id: 'phulbani',
    name: 'Phulbani',
    code: 'BHA',
    district: 'Kandhamal',
    type: 'SEO Partner Area',
    nearestBranch: 'Bhawanipatna Branch',
    address: 'Laxmi Toyota Support Desk, Phulbani Town Center, Kandhamal, Odisha 762001',
    phone: '+91 94370 11223',
    latitude: 20.4727,
    longitude: 84.2324
  }
];

export class LocationRepository {
  static getAll(): LocationDetails[] {
    return OFFICIAL_LOCATIONS;
  }

  static getById(id: string): LocationDetails | undefined {
    const cleanId = id.toLowerCase().trim();
    // Allow mapping berhampur to brahmapur
    const targetId = cleanId === 'berhampur' ? 'brahmapur' : cleanId;
    return OFFICIAL_LOCATIONS.find(loc => loc.id === targetId);
  }
}
