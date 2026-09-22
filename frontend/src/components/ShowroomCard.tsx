import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Navigation, CheckCircle2 } from 'lucide-react';
import { IShowroom } from '../types';
import { Badge } from './Badge';

interface ShowroomCardProps {
  showroom: IShowroom;
  onSelect?: (showroom: IShowroom) => void;
  onEnquire?: (showroom: IShowroom) => void;
}

export const ShowroomCard: React.FC<ShowroomCardProps> = ({ showroom, onSelect, onEnquire }) => {
  const whatsappUrl = `https://wa.me/${showroom.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
    showroom.name
  )},%20I%20would%20like%20to%20enquire%20about%20tracker%20models%20available%20at%20your%20showroom.`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-lg">
      {/* Showroom Image Banner */}
      <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
        <img
          src={showroom.images[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}
          alt={showroom.name}
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
        
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {showroom.isFlagship && <Badge variant="amber">Flagship Experience Center</Badge>}
          <Badge variant={showroom.status === 'Open' ? 'green' : 'red'}>
            {showroom.status === 'Open' ? 'Open Now' : showroom.status}
          </Badge>
        </div>
      </div>

      {/* Showroom Information Body */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
            {showroom.locationName} • {showroom.city}, {showroom.state}
          </span>
          <h3 className="text-xl font-bold text-white">{showroom.name}</h3>
        </div>

        <div className="space-y-2.5 text-sm text-slate-300">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
            <p className="leading-snug">{showroom.address}, {showroom.city}, {showroom.state} {showroom.zipCode}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <a href={`tel:${showroom.phone}`} className="hover:text-cyan-400 transition-colors font-medium">
              {showroom.phone}
            </a>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <Clock className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <p>Mon - Fri: {showroom.openingHours.weekdays}</p>
              <p>Sat: {showroom.openingHours.saturday}</p>
            </div>
          </div>
        </div>

        {/* Showroom Services List */}
        {showroom.servicesOffered && showroom.servicesOffered.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Available On-site</span>
            <div className="flex flex-wrap gap-1.5">
              {showroom.servicesOffered.slice(0, 3).map((service, idx) => (
                <span key={idx} className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-xs font-semibold"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.name + ' ' + showroom.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition-all text-xs font-semibold shadow-md shadow-cyan-600/20"
          >
            <Navigation className="w-4 h-4" /> Directions
          </a>
        </div>
      </div>
    </div>
  );
};
