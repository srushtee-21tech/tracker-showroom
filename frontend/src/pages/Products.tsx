import React, { useEffect, useState } from 'react';
import { Search, Filter, SlidersHorizontal, Package, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { IProduct } from '../types';
import { ProductCard } from '../components/ProductCard';
import { EnquiryModal } from '../components/EnquiryModal';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const categories = [
    'All',
    'Fleet Trackers',
    'OBD Trackers',
    'Asset Trackers',
    'Personal Trackers',
    'Motorbike Trackers',
    'Accessories',
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (search) params.append('search', search);
      if (inStockOnly) params.append('inStock', 'true');
      if (sortBy) params.append('sortBy', sortBy);

      const res = await api.get(`/products?${params.toString()}`);
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, inStockOnly, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleEnquire = (prod?: IProduct) => {
    if (prod) setSelectedProduct(prod);
    else setSelectedProduct(null);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Hardware Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Commercial Tracking Devices & Telemetry Units
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Browse our complete inventory of factory-tested 4G fleet locators, OBD-II diagnostic trackers, magnetic asset sensors, and personal locator hardware available at all showroom experience centers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search model number, title, features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-20 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {/* Sort & Stock Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
              />
              In Showroom Stock
            </label>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-slate-900">Newest First</option>
                <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                <option value="rating" className="bg-slate-900">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Trackers Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            We couldn't find any tracker models matching your active filter choices. Try resetting your search query or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setInStockOnly(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onEnquire={handleEnquire} />
          ))}
        </div>
      )}

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
