import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { IShowroom } from '../types';

interface MapComponentProps {
  showrooms: IShowroom[];
  selectedShowroom?: IShowroom | null;
  onSelectShowroom?: (showroom: IShowroom) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  showrooms,
  selectedShowroom,
  onSelectShowroom,
}) => {
  const activeShowroom = selectedShowroom || showrooms[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[480px]">
      {/* Map Display area */}
      <div className="relative flex-grow h-full bg-slate-950">
        {activeShowroom && activeShowroom.googleMapEmbedUrl ? (
          <iframe
            title={activeShowroom.name}
            src={activeShowroom.googleMapEmbedUrl}
            className="w-full h-full border-0 filter grayscale contrast-125 opacity-85 hover:grayscale-0 transition-all duration-500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
            <MapPin className="w-12 h-12 text-cyan-400 mb-2 animate-bounce" />
            <p className="text-lg font-bold text-white">Interactive Showroom Map</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Select a physical experience center from the location sidebar to inspect exact geographic coordinates and navigation.
            </p>
          </div>
        )}

        {/* Selected Pin Info Overlay */}
        {activeShowroom && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-slate-950/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-xl">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              Active Showroom View
            </span>
            <h4 className="text-sm font-bold text-white truncate">{activeShowroom.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{activeShowroom.address}, {activeShowroom.city}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">{activeShowroom.phone}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeShowroom.name + ' ' + activeShowroom.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Showroom Location Selector List Sidebar */}
      <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 flex flex-col h-auto lg:h-full overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Showroom Locations ({showrooms.length})
        </h3>
        <div className="space-y-2 overflow-y-auto flex-grow">
          {showrooms.map((s) => {
            const isSelected = activeShowroom?._id === s._id;
            return (
              <button
                key={s._id}
                onClick={() => onSelectShowroom && onSelectShowroom(s)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500/50 text-white shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">{s.city}</span>
                  {s.isFlagship && (
                    <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-800 px-1.5 py-0.2 rounded font-semibold">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-100 truncate mt-0.5">{s.name}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{s.address}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
