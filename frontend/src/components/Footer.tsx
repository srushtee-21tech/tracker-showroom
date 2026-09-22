import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto">
      {/* Top Footer Callout */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> Enterprise Tracking Hardware & Telemetry
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Visit our physical experience centers for live CAN-bus telemetry demonstrations and custom fleet fitting.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://wa.me/18005558725"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all text-sm font-semibold"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Showroom Support
            </a>
            <Link
              to="/showrooms"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition-all text-sm font-semibold shadow-lg shadow-cyan-600/20"
            >
              <MapPin className="w-4 h-4" /> Locate Showroom
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">TRACKER SHOWROOM</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            Commercial showroom network for high-precision GPS tracking devices, 4G OBD telemetry units, magnetic asset locators, and automated fleet management hardware.
          </p>
          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-400 uppercase tracking-wider">Demo / Corporate Notice</p>
            <p>Official commercial website template ready for enterprise company data integration.</p>
          </div>
        </div>

        {/* Col 2: Products */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Tracking Hardware</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?category=Fleet+Trackers" className="hover:text-cyan-400 transition-colors">Commercial Fleet Trackers</Link></li>
            <li><Link to="/products?category=OBD+Trackers" className="hover:text-cyan-400 transition-colors">OBD Diagnostic Trackers</Link></li>
            <li><Link to="/products?category=Asset+Trackers" className="hover:text-cyan-400 transition-colors">Magnetic Asset Trackers</Link></li>
            <li><Link to="/products?category=Personal+Trackers" className="hover:text-cyan-400 transition-colors">Personal Wearable GPS</Link></li>
            <li><Link to="/products?category=Motorbike+Trackers" className="hover:text-cyan-400 transition-colors">Motorbike & Marine Trackers</Link></li>
            <li><Link to="/products?category=Accessories" className="hover:text-cyan-400 transition-colors">AI Dashcams & Accessories</Link></li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Showroom & Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/showrooms" className="hover:text-cyan-400 transition-colors">Find a Showroom</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Fleet Installation Services</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Our Business</Link></li>
            <li><Link to="/gallery" className="hover:text-cyan-400 transition-colors">Showroom Gallery</Link></li>
            <li><Link to="/contact?type=Sales+Inquiry" className="hover:text-cyan-400 transition-colors">Contact Sales</Link></li>
            <li><Link to="/admin/login" className="hover:text-cyan-400 transition-colors">Admin Management Portal</Link></li>
          </ul>
        </div>

        {/* Col 4: Support */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Showroom Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>100 Innovation Parkway, Tech District, CA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>+1 (800) 555-TRACK</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>sales@trackershowroom.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-slate-950 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Tracker Showroom Business Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Hardware Warranty Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
