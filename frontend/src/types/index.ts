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
    network: string;
    gpsAccuracy: string;
    waterproofRating: string;
    geoFenceSupport: boolean;
    updateInterval: string;
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
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
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

export interface IAdminStats {
  totalProducts: number;
  activeProducts: number;
  totalShowrooms: number;
  totalEnquiries: number;
  newEnquiries: number;
  recentEnquiries: IEnquiry[];
}
