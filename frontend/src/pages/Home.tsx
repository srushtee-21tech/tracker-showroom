import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation,
  ShieldCheck,
  Cpu,
  MapPin,
  ArrowRight,
  Sparkles,
  Truck,
  BatteryCharging,
  Radio,
  CheckCircle,
  PhoneCall,
  Zap,
  Award,
  Users,
} from 'lucide-react';
import api from '../services/api';
import { IProduct, IShowroom } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ShowroomCard } from '../components/ShowroomCard';
import { EnquiryModal } from '../components/EnquiryModal';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [showrooms, setShowrooms] = useState<IShowroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, showRes] = await Promise.all([
          api.get('/products?featured=true'),
          api.get('/showrooms'),
        ]);
        if (prodRes.data.success) setFeaturedProducts(prodRes.data.data);
        if (showRes.data.success) setShowrooms(showRes.data.data);
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnquire = (prod?: IProduct) => {
    if (prod) setSelectedProduct(prod);
    else setSelectedProduct(null);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center bg-slate-950 overflow-hidden border-b border-slate-800">
        {/* Background Grid Pattern & Gradient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Official GPS & IoT Tracker Hardware Showroom
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Commercial <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">Tracker Hardware</span> & Experience Centers
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore enterprise 4G fleet locators, plug-and-play OBD diagnostic trackers, magnetic asset sensors, and personal safety locators at our dedicated commercial experience centers.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/showrooms"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-cyan-400" /> Find a Showroom
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-xl text-left">
              <div>
                <span className="text-2xl font-extrabold text-white block">100%</span>
                <span className="text-xs text-slate-400">Tested Hardware</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-cyan-400 block">&lt; 2.0m</span>
                <span className="text-xs text-slate-400">GPS Precision</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white block">2 Years</span>
                <span className="text-xs text-slate-400">Official Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Visual Banner / Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-2 border border-slate-800 shadow-2xl shadow-cyan-950/40">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80"
                  alt="Tracker Showroom Hardware"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Showroom Featured</span>
                      <h4 className="text-sm font-bold text-white">FleetPro 4G Heavy Fleet Tracker</h4>
                    </div>
                    <button
                      onClick={() => handleEnquire()}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-colors"
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Navigation className="w-4 h-4 transform -rotate-45" /> About Our Showroom Network
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Dedicated Commercial Experience Centers For GPS & Telemetry Hardware
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Tracker Showroom operates specialized commercial centers providing hands-on hardware demonstrations, live CAN-bus diagnostics testing, and certified vehicle installation bays. Whether equipping a 500-unit logistics fleet or protecting high-value cargo assets, our hardware specialists supply factory-tested tracking equipment.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Enterprise Certified</h4>
                  <p className="text-xs text-slate-400">FCC, CE, & RoHS Compliant Hardware</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Truck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Installation Bays</h4>
                  <p className="text-xs text-slate-400">Certified auto-electrician fitting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Why Choose Tracker Showroom</span>
          <h2 className="text-3xl font-bold text-white mt-1">Built For Enterprise Fleet Reliability</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">4G LTE Multi-Network</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global multi-carrier roaming SIM support with 2G fallback for 100% signal connectivity across remote transport routes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Long Battery & Solar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Up to 3-year battery standby options for unpowered trailers, shipping containers, and heavy machinery assets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">OBD & CAN-bus Diagnostic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time vehicle health telemetry, fuel level consumption data, engine trouble code (DTC) reading, and driver analytics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Anti-Theft & Remote Lock</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engine ignition lock relay, towing movement sensor alarms, anti-jamming detectors, and 24/7 theft recovery protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Tracker Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Showroom Showcase</span>
            <h2 className="text-3xl font-bold text-white mt-1">Featured Tracking Hardware</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View Complete Product Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} onEnquire={handleEnquire} />
            ))}
          </div>
        )}
      </section>

      {/* Showrooms Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Physical Locations</span>
            <h2 className="text-3xl font-bold text-white mt-1">Visit Our Experience Centers</h2>
          </div>
          <Link
            to="/showrooms"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Locate All Showroom Centers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.slice(0, 3).map((show) => (
            <ShowroomCard key={show._id} showroom={show} onEnquire={() => handleEnquire()} />
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/80 border border-slate-800 p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Upgrade Your Commercial Vehicle Fleet Tracking?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a live product demonstration at your nearest showroom or schedule an on-site fleet consultation with our technical team.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleEnquire()}
                className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 transition-all flex items-center gap-2"
              >
                Schedule Demo Visit <PhoneCall className="w-4 h-4" />
              </button>
              <Link
                to="/contact?type=Sales+Inquiry"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                Contact Sales Representative
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultProductTitle={selectedProduct?.title}
        defaultProductId={selectedProduct?._id}
      />
    </div>
  );
};
