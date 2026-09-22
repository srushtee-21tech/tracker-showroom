import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Battery,
  Cpu,
  Radio,
  CheckCircle2,
  PhoneCall,
  Send,
  ArrowLeft,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import api from '../services/api';
import { IProduct } from '../types';
import { Badge } from '../components/Badge';
import { EnquiryModal } from '../components/EnquiryModal';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('Sales Inquiry');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
          // Fetch related in same category
          const relRes = await api.get(`/products?category=${encodeURIComponent(res.data.data.category)}`);
          if (relRes.data.success) {
            setRelatedProducts(relRes.data.data.filter((p: IProduct) => p._id !== id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Error fetching product details', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleOpenModal = (type: string) => {
    setEnquiryType(type);
    setEnquiryModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading product hardware specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The requested tracker model could not be located in our inventory.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/products" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Hardware Catalog
        </Link>
        <span>/</span>
        <span className="text-slate-500">{product.category}</span>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{product.title}</span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="cyan">{product.category}</Badge>
              {product.isFeatured && <Badge variant="amber">Showroom Featured</Badge>}
            </div>
          </div>

          {/* Image Thumbnail Selector */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-xl border overflow-hidden transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Specs Summary & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-mono text-cyan-400 font-bold">MODEL: {product.modelNumber}</span>
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.reviewCount} customer reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white">{product.title}</h1>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{product.shortDescription}</p>
          </div>

          {/* Pricing & Stock Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Unit Hardware Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>
            <div>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" /> Available at Showrooms
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
                  Pre-Order Model
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleOpenModal('Sales Inquiry')}
              className="py-3.5 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Enquire / Get Quote
            </button>
            <button
              onClick={() => handleOpenModal('Book Live Demo')}
              className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-400" /> Book Showroom Demo
            </button>
          </div>

          {/* Quick Features Highlight */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Features</span>
            <div className="grid grid-cols-1 gap-2">
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Hardware Specifications Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Technical Telemetry Data</span>
          <h3 className="text-2xl font-bold text-white mt-1">Hardware Specifications</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Battery & Power:</span>
            <span className="text-white font-semibold">{product.specifications.batteryLife}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Dimensions:</span>
            <span className="text-white font-semibold">{product.specifications.dimensions}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Weight:</span>
            <span className="text-white font-semibold">{product.specifications.weight}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Cellular & Radio:</span>
            <span className="text-white font-semibold">{product.specifications.network}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">GPS Precision:</span>
            <span className="text-white font-semibold">{product.specifications.gpsAccuracy}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Waterproofing:</span>
            <span className="text-white font-semibold">{product.specifications.waterproofRating}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Geofence Support:</span>
            <span className="text-emerald-400 font-bold">{product.specifications.geoFenceSupport ? 'Supported' : 'No'}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-slate-400 font-medium">Update Polling Interval:</span>
            <span className="text-white font-semibold">{product.specifications.updateInterval}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-4">
        <h3 className="text-xl font-bold text-white">Full Product Overview</h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{product.description}</p>
      </div>

      {/* Related Trackers */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Related Tracking Hardware</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} onEnquire={() => handleOpenModal('Sales Inquiry')} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultProductTitle={product.title}
        defaultProductId={product._id}
        defaultType={enquiryType}
      />
    </div>
  );
};
