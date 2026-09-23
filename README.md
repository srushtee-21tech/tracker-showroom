# Tracker Showroom - Enterprise Full-Stack Application

A modern, production-ready full-stack web application designed for a real-world **Tracker Showroom** business (GPS trackers, 4G fleet locators, OBD vehicle diagnostics units, magnetic asset locators, and personal security locators).

---

## 🚀 Tech Stack

### Frontend
- **React.js 18** with **TypeScript**
- **Vite** for fast HMR and optimized production bundling
- **Tailwind CSS** with a corporate neutral theme (`slate-900`, `cyan-500` high-tech accent)
- **React Router v6** for public & protected admin routing
- **Lucide React** icons
- **Axios** for REST API requests with authorization header interceptors
- **Responsive & Accessible UI** with mobile navigation drawer, toast notifications, and interactive maps

### Backend
- **Node.js** & **Express.js** with **TypeScript**
- **JWT Authentication** (`jsonwebtoken`) & **Bcrypt** password hashing (`bcryptjs`)
- **Mongoose & MongoDB** schema design with strict validation and indexes
- **Hybrid Data Engine**: Automatically connects to MongoDB if available, or gracefully falls back to an in-memory data store with complete demo dataset if MongoDB server is offline
- **RESTful MVC Architecture** with centralized error middleware and request validation

---

## 📁 Project Directory Structure

```
tracker-showroom/
├── backend/                  # Express RESTful API Service
│   ├── src/
│   │   ├── config/           # Database connection & Mongoose setup
│   │   ├── controllers/      # Auth, Product, Showroom, Enquiry, Service, Gallery, Stats
│   │   ├── middleware/       # JWT verification & Error handlers
│   │   ├── models/           # Mongoose schemas (Product, Showroom, Enquiry, User)
│   │   ├── routes/           # Express API endpoints
│   │   ├── seeders/          # Production seed script (`npm run seed`)
│   │   ├── store/            # In-memory hybrid fallback database
│   │   ├── types/            # TypeScript interfaces
│   │   └── server.ts         # App entry point
│   └── package.json
│
└── frontend/                 # React Single Page Application
    ├── src/
    │   ├── components/       # Navbar, Footer, Cards, Modals, Maps, Badges
    │   ├── context/          # Auth Context & Toast Notification Context
    │   ├── pages/            # Home, Products, ProductDetail, Showrooms, Services, About, Gallery, Contact
    │   ├── pages/admin/      # Admin Login, Dashboard, Products Mgmt, Showrooms Mgmt, Enquiries Mgmt
    │   ├── services/         # Axios client
    │   └── App.tsx           # React Router configuration
    └── package.json
```

---

## 🔑 Default Admin Credentials

For testing the protected admin portal:

- **Login Route**: `/admin/login` or click "Admin Dashboard" in top header
- **Email**: `admin@trackershowroom.com`
- **Password**: `Admin@123456`

---

## ⚙️ Quick Start Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# (Optional) Seed demo data into local MongoDB
npm run seed

# Run development server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run Vite dev server (runs on http://localhost:5173)
npm run dev
```

---

## 📡 API Endpoint Overview

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/health` | GET | Public | Health check & active database engine mode |
| `/api/auth/login` | POST | Public | Admin login & JWT token retrieval |
| `/api/auth/me` | GET | Admin | Verify current token and user profile |
| `/api/products` | GET | Public | List products (with search, category, stock, sort filters) |
| `/api/products/:id` | GET | Public | Get single tracker details and specifications matrix |
| `/api/products` | POST | Admin | Create new tracker hardware model |
| `/api/products/:id` | PUT | Admin | Edit tracker model |
| `/api/products/:id` | DELETE | Admin | Delete tracker model |
| `/api/showrooms` | GET | Public | List showroom experience centers (with city filter) |
| `/api/showrooms` | POST | Admin | Add new showroom center |
| `/api/showrooms/:id` | PUT | Admin | Edit showroom center |
| `/api/showrooms/:id` | DELETE | Admin | Delete showroom center |
| `/api/enquiries` | POST | Public | Submit sales inquiry or book live demo |
| `/api/enquiries` | GET | Admin | List all customer enquiries |
| `/api/enquiries/:id` | PUT | Admin | Update lead status & internal notes |
| `/api/stats` | GET | Admin | Dashboard summary analytics counters |
 
