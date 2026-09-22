import React, { useEffect, useState } from 'react';
import { Wrench, Server, ShieldCheck, Cpu, CheckCircle2, Send, PhoneCall } from 'lucide-react';
import api from '../services/api';
import { IServiceOffer } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';

export const Services: React.FC = () => {
  const [services, setServices] = useState<IServiceOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching services', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Wrench': return <Wrench className="w-6 h-6 text-cyan-400" />;
      case 'Server': return <Server className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      default: return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  const handleBookService = (title: string) => {
    setSelectedService(title);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Commercial Technical Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Installation, Calibration & Fleet Support
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our certified auto-electricians and software telemetry engineers ensure complete setup from individual vehicle installations to enterprise REST API integration.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div
              key={srv._id}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center">
                    {getIcon(srv.iconName)}
                  </div>
                  {srv.isPopular && (
                    <span className="text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Popular Service
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{srv.summary}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {srv.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{srv.pricingNote}</span>
                <button
                  onClick={() => handleBookService(srv.title)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Warranty Highlight Box */}
      <div className="bg-gradient-to-r from-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Hardware Assurance</span>
          <h3 className="text-2xl font-bold text-white">2-Year Replacement Warranty & Advance Swap</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            All hardware purchased at Tracker Showroom locations includes a standard 2-year warranty. In the event of a device fault, our advance replacement program dispatches a fresh unit within 24 hours.
          </p>
        </div>
        <button
          onClick={() => handleBookService('Warranty & Diagnostics')}
          className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-xl shadow-cyan-600/30 whitespace-nowrap"
        >
          Enquire About Coverage
        </button>
      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultType="Installation Request"
      />
    </div>
  );
};
