import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLayout } from './pages/admin/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Showrooms } from './pages/Showrooms';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminShowrooms } from './pages/admin/AdminShowrooms';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-cyan-500 selection:text-white">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
          <Route path="/showrooms" element={<PublicLayout><Showrooms /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />

          {/* Protected Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="showrooms" element={<AdminShowrooms />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
};
