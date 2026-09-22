import bcrypt from 'bcryptjs';
import { IProduct, IShowroom, IEnquiry, IUser, IServiceOffer, IGalleryItem } from '../types/index.js';

class InMemoryStore {
  public products: IProduct[] = [];
  public showrooms: IShowroom[] = [];
  public enquiries: IEnquiry[] = [];
  public users: IUser[] = [];
  public services: IServiceOffer[] = [];
  public gallery: IGalleryItem[] = [];

  constructor() {
    this.seedDefaults();
  }

  private seedDefaults() {
    const defaultPasswordHash = bcrypt.hashSync('Admin@123456', 10);
    const now = new Date().toISOString();

    // Default Admin User
    this.users = [
      {
        _id: 'user-admin-01',
        name: 'Showroom System Administrator',
        email: 'admin@trackershowroom.com',
        passwordHash: defaultPasswordHash,
        role: 'admin',
        createdAt: now,
      },
    ];

    // High Quality Tracker Showroom Products
    this.products = [
      {
        _id: 'prod-01',
        title: 'FleetPro 4G Heavy Fleet Tracker',
        modelNumber: 'TRK-FP4000',
        category: 'Fleet Trackers',
        price: 299,
        originalPrice: 349,
        shortDescription: 'Industrial-grade 4G LTE vehicle tracker engineered for commercial truck fleets and logistics management.',
        description: 'The FleetPro 4G TRK-FP4000 is an enterprise vehicle tracking unit featuring dual ECU CAN-bus reading, remote engine cutoff, anti-jamming sensor, driver behavior analytics (harsh braking/speeding), and dual SIM failover capability.',
        images: [
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: 'Internal 450mAh rechargeable backup (72h standby)',
          dimensions: '105 x 65 x 26 mm',
          weight: '160 grams',
          network: '4G LTE Cat 1 with 2G GSM Fallback',
          gpsAccuracy: '< 2.0 meters CEP',
          waterproofRating: 'IP67 Heavy-duty casing',
          geoFenceSupport: true,
          updateInterval: 'Real-time 5-second polling interval',
        },
        keyFeatures: [
          'Dual ECU CAN-bus & OBD-II compatibility',
          'Remote engine ignition lock / immobilizer',
          'Harsh acceleration & braking alerts',
          'Internal memory buffer for 50,000 offline waypoints',
          'Supports temperature & fuel sensors',
        ],
        inStock: true,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 42,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'prod-02',
        title: 'OBD-QuickPlug 4G Diagnostics Tracker',
        modelNumber: 'TRK-OBD200',
        category: 'OBD Trackers',
        price: 149,
        originalPrice: 179,
        shortDescription: 'Plug-and-play OBD-II port tracker with vehicle diagnostic monitoring and instant plug-out alert.',
        description: 'No wiring required! Plug the TRK-OBD200 directly into any vehicle OBD-II port (cars, vans, light trucks) for instant real-time location tracking, battery voltage checking, engine diagnostic trouble codes (DTC), and trip log history.',
        images: [
          'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: 'Direct vehicle powered + 180mAh backup battery',
          dimensions: '52 x 45 x 22 mm',
          weight: '65 grams',
          network: '4G LTE Global Band',
          gpsAccuracy: '< 2.5 meters',
          waterproofRating: 'Standard Interior IP54',
          geoFenceSupport: true,
          updateInterval: '10 seconds adjustable polling',
        },
        keyFeatures: [
          'Zero wiring - instant 5-second installation',
          'Reads OBD-II live diagnostic telemetry & trouble codes',
          'Anti-tamper & unplug notification alert',
          'Crash detection sensor (G-Force 3-axis accelerometer)',
          'Trip history playback with mileage summary',
        ],
        inStock: true,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 38,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'prod-03',
        title: 'MagGuard X-500 Magnetic Asset Tracker',
        modelNumber: 'TRK-MG500',
        category: 'Asset Trackers',
        price: 249,
        originalPrice: 289,
        shortDescription: 'Heavy-duty 10,000mAh magnetic tracker for containers, trailers, equipment, and unpowered assets.',
        description: 'Featuring industrial 50kg neodymium magnets, the MagGuard X-500 attaches effortlessly to machinery, trailers, and shipping containers. Boasts up to 3 years battery standby in power-saver mode and IP68 submersion waterproofing.',
        images: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: '10,000mAh Li-ion (Up to 3 Years in standby mode)',
          dimensions: '120 x 78 x 38 mm',
          weight: '340 grams',
          network: '4G LTE Cat M1 / NB-IoT with 2G fallback',
          gpsAccuracy: '< 2.5 meters',
          waterproofRating: 'IP68 Underwater Submersible',
          geoFenceSupport: true,
          updateInterval: 'Configurable from 1-min live to 1 ping per day',
        },
        keyFeatures: [
          'Ultra-strong 50kg magnetic mounting pad',
          'Light sensor drop/removal instant alarm',
          'Ruggedized shock-proof enclosure',
          'Solar panel charging port option available',
          'Multi-constellation GPS/Glonass/Beidou tracking',
        ],
        inStock: true,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 51,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'prod-04',
        title: 'SafeTrack Mini Personal & VIP Tracker',
        modelNumber: 'TRK-ST100',
        category: 'Personal Trackers',
        price: 119,
        originalPrice: 139,
        shortDescription: 'Ultra-compact wearable GPS locator with dedicated SOS panic button and two-way voice call support.',
        description: 'Designed for personal security, vulnerable family members, field workers, and valuable items. SafeTrack Mini offers instant SOS emergency calling, fall detection alert, geo-fence notifications, and a companion smartphone app.',
        images: [
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: '1,000mAh (4-7 days continuous use)',
          dimensions: '48 x 40 x 14.5 mm',
          weight: '38 grams',
          network: '4G LTE + Wi-Fi Positioning + BLE',
          gpsAccuracy: '< 3.0 meters (Outdoor GPS / Indoor Wi-Fi)',
          waterproofRating: 'IP67 Water Resistant',
          geoFenceSupport: true,
          updateInterval: '30 seconds / Smart motion wake',
        },
        keyFeatures: [
          'One-touch SOS panic button with instant SMS / App alert',
          'Two-way audio voice calling & silent listen-in mode',
          'Automated fall-down detection alert',
          'Lanyard & belt clip included',
        ],
        inStock: true,
        isFeatured: false,
        rating: 4.7,
        reviewCount: 19,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'prod-05',
        title: 'MotoShield Waterproof Motorbike Tracker',
        modelNumber: 'TRK-MS300',
        category: 'Motorbike Trackers',
        price: 169,
        originalPrice: 199,
        shortDescription: 'Low power draw waterproof GPS tracker designed for motorcycles, ATVs, and jet skis.',
        description: 'Protects motorcycles against theft with vibration detection, towing alarm, engine ignition sensor, and ultra-low battery consumption to prevent bike battery drain.',
        images: [
          'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: 'Vehicle powered with 250mAh emergency battery backup',
          dimensions: '88 x 43 x 15 mm',
          weight: '80 grams',
          network: '4G LTE Global',
          gpsAccuracy: '< 2.5 meters',
          waterproofRating: 'IP67 Waterproof & Dustproof',
          geoFenceSupport: true,
          updateInterval: '10 seconds live tracking',
        },
        keyFeatures: [
          'Ultra-low standby battery drain (< 2mA)',
          'Towing & Movement vibration alarm',
          'Ignition status detection (ACC on/off)',
          'Compact hidden installation under seat / fairing',
        ],
        inStock: true,
        isFeatured: false,
        rating: 4.8,
        reviewCount: 27,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'prod-06',
        title: 'DualCam AI Dashcam & GPS Telemetry Unit',
        modelNumber: 'TRK-DC800',
        category: 'Accessories',
        price: 399,
        originalPrice: 449,
        shortDescription: 'AI-powered dual lens dashcam with embedded 4G GPS live video streaming & driver monitoring (ADAS / DMS).',
        description: 'Combines full HD road camera, interior cabin camera with IR night vision, real-time GPS location tracking, and AI driver distraction monitoring. Stream live video directly to fleet management web portal.',
        images: [
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        ],
        specifications: {
          batteryLife: 'Direct hardwire kit with low voltage protection cutoff',
          dimensions: '112 x 62 x 34 mm',
          weight: '210 grams',
          network: '4G LTE high-speed video transmission',
          gpsAccuracy: '< 2.0 meters',
          waterproofRating: 'Interior windshield mounting',
          geoFenceSupport: true,
          updateInterval: 'Realtime live stream & 1-sec GPS telemetry',
        },
        keyFeatures: [
          'Dual 1080P Full HD cameras (Road View + Cabin View)',
          'AI Driver Fatigue & Distraction detection (DMS)',
          'Cloud event video backup upon collision',
          'Live remote video streaming via Tracker Web & Mobile App',
        ],
        inStock: true,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 33,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Showroom Locations
    this.showrooms = [
      {
        _id: 'show-01',
        name: 'Tracker Tech Hub & Experience Center',
        locationName: 'Downtown Tech District',
        address: '100 Innovation Parkway, Suite 400',
        city: 'Metropolis',
        state: 'CA',
        zipCode: '90210',
        phone: '+1 (800) 555-8725',
        whatsapp: '+18005558725',
        email: 'metropolis@trackershowroom.com',
        openingHours: {
          weekdays: '08:30 AM - 07:00 PM',
          saturday: '09:00 AM - 05:00 PM',
          sunday: '10:00 AM - 04:00 PM',
        },
        coordinates: {
          lat: 34.0522,
          lng: -118.2437,
        },
        googleMapEmbedUrl: 'https://maps.google.com/maps?q=34.0522,-118.2437&z=15&output=embed',
        status: 'Open',
        isFlagship: true,
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
        ],
        servicesOffered: [
          'Live Product Demonstrations',
          'On-site Vehicle Installation Bay',
          'Commercial Fleet Consultations',
          'Technical Support & Diagnostics',
          'Instant Warranty Hardware Replacement',
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'show-02',
        name: 'Logistics Fleet & Enterprise Center',
        locationName: 'Harbor Logistics Corridor',
        address: '450 Freight Transport Way',
        city: 'Port City',
        state: 'CA',
        zipCode: '90802',
        phone: '+1 (800) 555-9832',
        whatsapp: '+18005559832',
        email: 'portcity@trackershowroom.com',
        openingHours: {
          weekdays: '08:00 AM - 06:00 PM',
          saturday: '09:00 AM - 03:00 PM',
          sunday: 'Closed',
        },
        coordinates: {
          lat: 33.7701,
          lng: -118.1937,
        },
        googleMapEmbedUrl: 'https://maps.google.com/maps?q=33.7701,-118.1937&z=15&output=embed',
        status: 'Open',
        isFlagship: false,
        images: [
          'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
        ],
        servicesOffered: [
          'Heavy Truck Fleet Installations',
          'Container Magnetic Mount Setup',
          'Bulk Hardware Dispatch',
          'API Data Integration Workshop',
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'show-03',
        name: 'Tracker Regional Showroom & Service Center',
        locationName: 'North Industrial Park',
        address: '88 Commerce Boulevard',
        city: 'Riverdale',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (800) 555-1290',
        whatsapp: '+18005551290',
        email: 'riverdale@trackershowroom.com',
        openingHours: {
          weekdays: '09:00 AM - 06:30 PM',
          saturday: '10:00 AM - 04:00 PM',
          sunday: 'Closed',
        },
        coordinates: {
          lat: 40.7128,
          lng: -74.006,
        },
        googleMapEmbedUrl: 'https://maps.google.com/maps?q=40.7128,-74.0060&z=15&output=embed',
        status: 'Open',
        isFlagship: false,
        images: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        ],
        servicesOffered: [
          'Consumer OBD & Personal Tracker Demos',
          'Motorcycle Anti-Theft Fitting',
          'SIM Card Activation & Setup',
        ],
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Initial Demo Enquiries
    this.enquiries = [
      {
        _id: 'enq-101',
        customerName: 'Marcus Vance',
        email: 'marcus.vance@logistics-global.demo',
        phone: '+1 (555) 234-5678',
        companyName: 'Apex Express Logistics',
        enquiryType: 'Book Live Demo',
        productRef: 'prod-01',
        productName: 'FleetPro 4G Heavy Fleet Tracker',
        showroomRef: 'show-01',
        showroomName: 'Tracker Tech Hub & Experience Center',
        preferredDate: '2026-10-05',
        message: 'We are expanding our delivery truck fleet by 45 vehicles and would like a live demonstration of CAN-bus telemetry integration and driver behavior reporting.',
        status: 'New',
        internalNotes: 'High priority commercial lead - 45 units.',
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: 'enq-102',
        customerName: 'Elena Rostova',
        email: 'elena@transcargo.demo',
        phone: '+1 (555) 987-6543',
        companyName: 'TransCargo Heavy Haul',
        enquiryType: 'Sales Inquiry',
        productRef: 'prod-03',
        productName: 'MagGuard X-500 Magnetic Asset Tracker',
        showroomRef: 'show-02',
        showroomName: 'Logistics Fleet & Enterprise Center',
        message: 'Looking for bulk pricing on 20 MagGuard X-500 units for flatbed shipping trailers.',
        status: 'Contacted',
        internalNotes: 'Sent quotation sheet via email.',
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Service Offerings
    this.services = [
      {
        _id: 'srv-01',
        title: 'Professional Vehicle Installation',
        iconName: 'Wrench',
        summary: 'Certified auto-electrician installation at our showroom bay or on-site at your fleet garage.',
        details: [
          'Concealed stealth wiring underneath dashboard or engine bay',
          'Ignition immobilizer relay setup with safety bypass switch',
          'CAN-bus interface calibration for OBD-II telemetry',
          'Full functional test report and certificate of installation',
        ],
        pricingNote: 'Free installation with purchases of 5+ units',
        isPopular: true,
      },
      {
        _id: 'srv-02',
        title: 'Enterprise Software & API Integration',
        iconName: 'Server',
        summary: 'Seamlessly stream tracking telemetry into your existing ERP, TMS, or custom dispatch portal.',
        details: [
          'RESTful APIs & Webhooks for real-time location stream',
          'Custom geofence triggers and automated dispatch notifications',
          'Single Sign-On (SSO) & role-based fleet user controls',
          'Dedicated enterprise cloud server hosting options',
        ],
        pricingNote: 'Custom Enterprise Plan Available',
        isPopular: true,
      },
      {
        _id: 'srv-03',
        title: '24/7 Monitoring & Theft Recovery Support',
        iconName: 'ShieldCheck',
        summary: 'Round-the-clock emergency support line to assist law enforcement during active theft incidents.',
        details: [
          'Dedicated hotline for urgent theft response dispatch',
          'Real-time position sharing links for law enforcement',
          'Remote engine disable activation upon police protocol confirmation',
          'Global SIM coverage across 180+ international carrier networks',
        ],
        pricingNote: 'Included with Pro Subscription',
        isPopular: false,
      },
      {
        _id: 'srv-04',
        title: 'Hardware Warranty & Calibration',
        iconName: 'Cpu',
        summary: 'Comprehensive 2-year hardware replacement warranty and annual sensor accuracy calibration.',
        details: [
          'Advance swap unit replacement program within 24 hours',
          'Battery health diagnostics & firmware updates',
          'Sensors recalibration for temperature & fuel probes',
        ],
        pricingNote: '2 Years Standard Coverage',
        isPopular: false,
      },
    ];

    // Gallery Showcase Items
    this.gallery = [
      {
        _id: 'gal-01',
        title: 'Flagship Showroom Main Floor',
        category: 'Showrooms',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        caption: 'Interactive product discovery counter and live tracking software demo station.',
      },
      {
        _id: 'gal-02',
        title: 'Fleet Commercial Installation Bay',
        category: 'Fleet Installations',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        caption: 'Certified engineers retrofitting a commercial freight fleet with 4G CAN-bus trackers.',
      },
      {
        _id: 'gal-03',
        title: 'Asset Tracker Weather Testing',
        category: 'Products',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
        caption: 'MagGuard X-500 magnetic asset tracker undergoing IP68 waterproof testing.',
      },
      {
        _id: 'gal-04',
        title: 'Enterprise Fleet Monitoring Center',
        category: 'Events',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
        caption: 'Live demonstration during the National Logistics & Transportation Expo.',
      },
    ];
  }
}

export const inMemoryStore = new InMemoryStore();
