import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, Menu, X, MapPin, PhoneCall, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Showrooms', path: '/showrooms' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact?type=Sales+Inquiry' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    const basePath = path.split('?')[0];
    return location.pathname.startsWith(basePath);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner strip */}
      <div className="bg-slate-900 border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Commercial GPS & Telemetry Showroom
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline">2-Year Official Hardware Warranty</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:18005558725" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              <PhoneCall className="w-3.5 h-3.5" /> 1-800-TRACKER
            </a>
            {isAuthenticated ? (
              <Link to="/admin" className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Admin Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="hover:text-slate-200 transition-colors">
                Portal Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Navigation className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                TRACKER <span className="text-cyan-400 font-medium text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">SHOWROOM</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Official Fleet & Hardware Center</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/showrooms"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              <MapPin className="w-4 h-4" /> Find Showroom
            </Link>
            <Link
              to="/contact?type=Book+Live+Demo"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              Book Live Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium ${
                isActive(item.path)
                  ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Link
              to="/showrooms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 text-slate-200 font-medium"
            >
              <MapPin className="w-4 h-4 text-cyan-400" /> Find Nearest Showroom
            </Link>
            <Link
              to="/contact?type=Book+Live+Demo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 text-white font-bold"
            >
              Book Live Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
