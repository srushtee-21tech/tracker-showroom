import React, { useEffect, useState } from 'react';
import { Search, MapPin, Phone, Clock, MessageSquare, Navigation, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { IShowroom } from '../types';
import { ShowroomCard } from '../components/ShowroomCard';
import { MapComponent } from '../components/MapComponent';
import { EnquiryModal } from '../components/EnquiryModal';

export const Showrooms: React.FC = () => {
  const [showrooms, setShowrooms] = useState<IShowroom[]>([]);
  const [selectedShowroom, setSelectedShowroom] = useState<IShowroom | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [loading, setLoading] = useState(true);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchShowrooms = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCity !== 'All') params.append('city', selectedCity);
        if (search) params.append('search', search);

        const res = await api.get(`/showrooms?${params.toString()}`);
        if (res.data.success) {
          setShowrooms(res.data.data);
          if (res.data.data.length > 0 && !selectedShowroom) {
            setSelectedShowroom(res.data.data[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching showrooms', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowrooms();
  }, [selectedCity, search]);

  const cities = ['All', ...Array.from(new Set(showrooms.map((s) => s.city)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Physical Network
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tracker Experience Centers & Showrooms
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Visit our commercial experience centers for live hardware demonstrations, CAN-bus diagnostic testing, and certified vehicle installation bays.
          </p>
        </div>
      </div>

      {/* Interactive Map Component */}
      <MapComponent
        showrooms={showrooms}
        selectedShowroom={selectedShowroom}
        onSelectShowroom={(s) => setSelectedShowroom(s)}
      />

      {/* Filter and Locator Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Filter by city, address, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex-shrink-0">Filter City:</span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCity === city
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Showrooms Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showrooms.map((showroom) => (
            <div
              key={showroom._id}
              onClick={() => setSelectedShowroom(showroom)}
              className={`cursor-pointer rounded-2xl transition-all ${
                selectedShowroom?._id === showroom._id ? 'ring-2 ring-cyan-500/50' : ''
              }`}
            >
              <ShowroomCard
                showroom={showroom}
                onEnquire={() => setEnquiryModalOpen(true)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultShowroomTitle={selectedShowroom?.name}
      />
    </div>
  );
};
