import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Cpu, Battery, Eye, Send } from 'lucide-react';
import { IProduct } from '../types';
import { Badge } from './Badge';

interface ProductCardProps {
  product: IProduct;
  onEnquire?: (product: IProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquire }) => {
  return (
    <div className="group bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col h-full">
      {/* Product Image Header */}
      <div className="relative aspect-video bg-slate-950 overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="cyan">{product.category}</Badge>
          {product.isFeatured && <Badge variant="amber">Featured Model</Badge>}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 backdrop-blur-sm">
              In Showroom Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-800/60 backdrop-blur-sm">
              Pre-Order
            </span>
          )}
        </div>
      </div>

      {/* Product Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-mono text-cyan-400 font-semibold">{product.modelNumber}</span>
          <div className="flex items-center gap-1 text-amber-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        <Link to={`/products/${product._id}`} className="group-hover:text-cyan-400 transition-colors">
          <h3 className="text-lg font-bold text-white line-clamp-1">{product.title}</h3>
        </Link>

        <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Key Specs Pills */}
        <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
            <Battery className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{product.specifications?.batteryLife || 'Continuous / Battery'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate">{product.specifications?.network || '4G LTE Global'}</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Unit Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/products/${product._id}`}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onEnquire && onEnquire(product)}
              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
            >
              <Send className="w-3.5 h-3.5" /> Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
