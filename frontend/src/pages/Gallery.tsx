import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import api from '../services/api';
import { IGalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<IGalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [activeModalItem, setActiveModalItem] = useState<IGalleryItem | null>(null);

  const categories = ['All', 'Showrooms', 'Fleet Installations', 'Products', 'Events'];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === 'All' ? '/gallery' : `/gallery?category=${encodeURIComponent(selectedCategory)}`;
        const res = await api.get(url);
        if (res.data.success) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching gallery', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Visual Showcase
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Showroom & Installation Gallery
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Explore high-resolution photography of our physical experience centers, fleet installation bays, water testing rigs, and product hardware.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => setActiveModalItem(item)}
              className="group relative aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 cursor-pointer shadow-lg transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-slate-900/80 text-cyan-400">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950">
              <img src={activeModalItem.imageUrl} alt={activeModalItem.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{activeModalItem.category}</span>
              <h3 className="text-xl font-bold text-white">{activeModalItem.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{activeModalItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
