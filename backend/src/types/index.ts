export interface IProduct {
  _id: string;
  title: string;
  modelNumber: string;
  category: 'Fleet Trackers' | 'OBD Trackers' | 'Asset Trackers' | 'Personal Trackers' | 'Motorbike Trackers' | 'Accessories';
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  specifications: {
    batteryLife: string;
    dimensions: string;
    weight: string;
    network: string; // e.g., 4G LTE / 2G Fallback
    gpsAccuracy: string; // e.g., < 2.5 meters
    waterproofRating: string; // e.g., IP67 Waterproof
    geoFenceSupport: boolean;
    updateInterval: string; // e.g., 10 seconds live tracking
  };
  keyFeatures: string[];
  inStock: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IShowroom {
  _id: string;
  name: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapEmbedUrl: string;
  status: 'Open' | 'Renovating' | 'Coming Soon';
  isFlagship: boolean;
  images: string[];
  servicesOffered: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IEnquiry {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  companyName?: string;
  enquiryType: 'Sales Inquiry' | 'Book Live Demo' | 'Technical Support' | 'Installation Request' | 'Showroom Visit';
  productRef?: string;
  productName?: string;
  showroomRef?: string;
  showroomName?: string;
  preferredDate?: string;
  message: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'staff';
  createdAt: string;
}

export interface IServiceOffer {
  _id: string;
  title: string;
  iconName: string;
  summary: string;
  details: string[];
  pricingNote?: string;
  isPopular?: boolean;
}

export interface IGalleryItem {
  _id: string;
  title: string;
  category: 'Showrooms' | 'Fleet Installations' | 'Products' | 'Events';
  imageUrl: string;
  caption: string;
}
