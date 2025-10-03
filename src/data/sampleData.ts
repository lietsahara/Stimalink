export interface Prediction {
  id: string;
  lat: number;
  lng: number;
  energyType: 'solar' | 'wind' | 'hydro' | 'geothermal';
  predictedKW: number;
  confidence: 'Low' | 'Medium' | 'High';
  description: string;
  location: string;
  sampleSparkline: number[];
  createdBy?: string;
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  location: string;
  lat: number;
  lng: number;
  availability: 'Available' | 'Busy' | 'Booked';
  contact: string;
  avatar: string;
  rating: number;
}

export interface Supplier {
  id: string;
  name: string;
  materials: string[];
  region: string;
  priceRange: string;
  contact: string;
  leadTime: string;
  rating: number;
}

export const samplePredictions: Prediction[] = [
  {
    id: 'pred-1',
    lat: -1.286389,
    lng: 36.817223,
    energyType: 'solar',
    predictedKW: 3.8,
    confidence: 'High',
    description: 'Urban rooftop solar installation in Nairobi',
    location: 'Nairobi, Kenya',
    sampleSparkline: [2.5, 2.9, 3.2, 3.5, 3.8],
  },
  {
    id: 'pred-2',
    lat: -0.4569,
    lng: 39.6582,
    energyType: 'solar',
    predictedKW: 6.5,
    confidence: 'High',
    description: 'Large-scale solar farm in Garissa County',
    location: 'Garissa, Kenya',
    sampleSparkline: [5.0, 5.5, 5.9, 6.2, 6.5],
  },
  {
    id: 'pred-3',
    lat: 3.6,
    lng: 36.05,
    energyType: 'wind',
    predictedKW: 14.2,
    confidence: 'High',
    description: 'Wind farm project at Lake Turkana',
    location: 'Lake Turkana, Kenya',
    sampleSparkline: [11.0, 12.2, 13.1, 13.8, 14.2],
  },
  {
    id: 'pred-4',
    lat: 3.3,
    lng: 35.9,
    energyType: 'geothermal',
    predictedKW: 18.5,
    confidence: 'High',
    description: 'Geothermal energy in the Rift Valley',
    location: 'Turkana Basin, Kenya',
    sampleSparkline: [15.0, 16.2, 17.1, 17.9, 18.5],
  },
  {
    id: 'pred-5',
    lat: -1.8,
    lng: 40.1,
    energyType: 'hydro',
    predictedKW: 7.3,
    confidence: 'Medium',
    description: 'Micro-hydro project on Tana River',
    location: 'Tana River, Kenya',
    sampleSparkline: [5.8, 6.3, 6.7, 7.0, 7.3],
  },
  {
    id: 'pred-6',
    lat: -4.0435,
    lng: 39.6682,
    energyType: 'wind',
    predictedKW: 5.2,
    confidence: 'Medium',
    description: 'Coastal wind installation',
    location: 'Mombasa, Kenya',
    sampleSparkline: [3.8, 4.2, 4.6, 4.9, 5.2],
  },
];

export const sampleEngineers: Engineer[] = [
  {
    id: 'eng-1',
    name: 'Wanjiku Kamau',
    skills: ['Solar Installation', 'PV Systems', 'Grid Integration'],
    location: 'Nairobi, Kenya',
    lat: -1.286389,
    lng: 36.817223,
    availability: 'Available',
    contact: 'wanjiku.kamau@example.com',
    avatar: '👩‍🔧',
    rating: 4.9,
  },
  {
    id: 'eng-2',
    name: 'Omondi Otieno',
    skills: ['Wind Energy', 'Turbine Installation', 'Maintenance'],
    location: 'Kisumu, Kenya',
    lat: -0.0917,
    lng: 34.7680,
    availability: 'Available',
    contact: 'omondi.o@example.com',
    avatar: '👨‍🔧',
    rating: 4.8,
  },
  {
    id: 'eng-3',
    name: 'Fatuma Hassan',
    skills: ['Solar Design', 'Energy Audits', 'System Optimization'],
    location: 'Mombasa, Kenya',
    lat: -4.0435,
    lng: 39.6682,
    availability: 'Busy',
    contact: 'fatuma.h@example.com',
    avatar: '👩‍💼',
    rating: 5.0,
  },
  {
    id: 'eng-4',
    name: 'Kipchoge Rotich',
    skills: ['Hydro Systems', 'Civil Engineering', 'Environmental Impact'],
    location: 'Eldoret, Kenya',
    lat: 0.5143,
    lng: 35.2698,
    availability: 'Available',
    contact: 'kipchoge.r@example.com',
    avatar: '👨‍💻',
    rating: 4.7,
  },
  {
    id: 'eng-5',
    name: 'Akinyi Odhiambo',
    skills: ['Geothermal Systems', 'Drilling', 'Thermal Analysis'],
    location: 'Nakuru, Kenya',
    lat: -0.3031,
    lng: 36.0800,
    availability: 'Available',
    contact: 'akinyi.o@example.com',
    avatar: '👩‍🔬',
    rating: 4.9,
  },
  {
    id: 'eng-6',
    name: 'Mwangi Ndegwa',
    skills: ['Wind Energy', 'Project Management', 'Solar Installation'],
    location: 'Garissa, Kenya',
    lat: -0.4569,
    lng: 39.6582,
    availability: 'Available',
    contact: 'mwangi.n@example.com',
    avatar: '👨‍🏭',
    rating: 4.8,
  },
];

export const sampleSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    name: 'East Africa Solar Ltd',
    materials: ['Solar Panels', 'Inverters', 'Mounting Systems'],
    region: 'East Africa',
    priceRange: '$$$',
    contact: 'sales@easolar.co.ke',
    leadTime: '2-3 weeks',
    rating: 4.8,
  },
  {
    id: 'sup-2',
    name: 'Kenya Wind Power Solutions',
    materials: ['Turbine Blades', 'Generators', 'Control Systems'],
    region: 'Kenya',
    priceRange: '$$$$',
    contact: 'info@kenyawind.co.ke',
    leadTime: '4-6 weeks',
    rating: 4.7,
  },
  {
    id: 'sup-3',
    name: 'Green Energy Africa',
    materials: ['Solar Panels', 'Batteries', 'Wiring', 'Monitoring Equipment'],
    region: 'Pan-African',
    priceRange: '$$',
    contact: 'orders@greenafrica.com',
    leadTime: '1-2 weeks',
    rating: 4.9,
  },
  {
    id: 'sup-4',
    name: 'Tana Hydro Equipment',
    materials: ['Turbines', 'Piping', 'Control Valves'],
    region: 'Central Kenya',
    priceRange: '$$$',
    contact: 'contact@tanahydro.co.ke',
    leadTime: '3-4 weeks',
    rating: 4.6,
  },
  {
    id: 'sup-5',
    name: 'Kenya Renewable Parts Co',
    materials: ['Solar Panels', 'Inverters', 'Batteries', 'Accessories'],
    region: 'Kenya',
    priceRange: '$$',
    contact: 'support@kenyarenew.co.ke',
    leadTime: '1 week',
    rating: 4.8,
  },
  {
    id: 'sup-6',
    name: 'GeoPower Rift Valley',
    materials: ['Drilling Equipment', 'Heat Exchangers', 'Geothermal Pumps'],
    region: 'Rift Valley',
    priceRange: '$$$$',
    contact: 'sales@georiftvalley.co.ke',
    leadTime: '6-8 weeks',
    rating: 4.9,
  },
];
