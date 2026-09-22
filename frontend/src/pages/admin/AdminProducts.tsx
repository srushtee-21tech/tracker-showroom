import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, CheckCircle, Package } from 'lucide-react';
import api from '../../services/api';
import { IProduct } from '../../types';
import { Badge } from '../../components/Badge';
import { useToast } from '../../context/ToastContext';

export const AdminProducts: React.FC = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    modelNumber: '',
    category: 'Fleet Trackers',
    price: 199,
    originalPrice: 249,
    shortDescription: '',
    description: '',
    images: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    keyFeatures: 'Dual CAN-bus support, Remote Engine Cutoff, GPS precision < 2.0m',
    inStock: true,
    isFeatured: false,
    batteryLife: 'Internal 450mAh rechargeable backup',
    dimensions: '105 x 65 x 26 mm',
    weight: '160 grams',
    network: '4G LTE Cat 1',
    gpsAccuracy: '< 2.0m CEP',
    waterproofRating: 'IP67 Waterproof',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      showToast('Error loading products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      modelNumber: 'TRK-' + Math.floor(1000 + Math.random() * 9000),
      category: 'Fleet Trackers',
      price: 199,
      originalPrice: 249,
      shortDescription: '',
      description: '',
      images: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      keyFeatures: 'Feature 1, Feature 2, Feature 3',
      inStock: true,
      isFeatured: false,
      batteryLife: 'Internal 450mAh battery',
      dimensions: '100 x 60 x 20 mm',
      weight: '150 grams',
      network: '4G LTE Global',
      gpsAccuracy: '< 2.5m',
      waterproofRating: 'IP67 Waterproof',
    });
    setModalOpen(true);
  };

  const openEditModal = (prod: IProduct) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      modelNumber: prod.modelNumber,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price + 30,
      shortDescription: prod.shortDescription,
      description: prod.description,
      images: prod.images.join(', '),
      keyFeatures: prod.keyFeatures.join(', '),
      inStock: prod.inStock,
      isFeatured: prod.isFeatured,
      batteryLife: prod.specifications?.batteryLife || '',
      dimensions: prod.specifications?.dimensions || '',
      weight: prod.specifications?.weight || '',
      network: prod.specifications?.network || '',
      gpsAccuracy: prod.specifications?.gpsAccuracy || '',
      waterproofRating: prod.specifications?.waterproofRating || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tracker product?')) return;
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        showToast('Product deleted.', 'success');
        fetchProducts();
      }
    } catch (err: any) {
      showToast('Failed to delete product.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      modelNumber: formData.modelNumber,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      shortDescription: formData.shortDescription,
      description: formData.description,
      images: formData.images.split(',').map((s) => s.trim()).filter(Boolean),
      keyFeatures: formData.keyFeatures.split(',').map((s) => s.trim()).filter(Boolean),
      inStock: formData.inStock,
      isFeatured: formData.isFeatured,
      specifications: {
        batteryLife: formData.batteryLife,
        dimensions: formData.dimensions,
        weight: formData.weight,
        network: formData.network,
        gpsAccuracy: formData.gpsAccuracy,
        waterproofRating: formData.waterproofRating,
        geoFenceSupport: true,
        updateInterval: '10s live polling',
      },
    };

    try {
      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, payload);
        if (res.data.success) {
          showToast('Product updated successfully.', 'success');
        }
      } else {
        const res = await api.post('/products', payload);
        if (res.data.success) {
          showToast('Product created successfully.', 'success');
        }
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error saving product.', 'error');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.modelNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Products</h1>
          <p className="text-xs text-slate-400 mt-0.5">Add, edit, or toggle inventory status for showroom tracker hardware.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-cyan-600/20"
        >
          <Plus className="w-4 h-4" /> Add New Tracker
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Filter by title, model number, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tracker Model</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">
                    {p.title}
                    <span className="block text-[11px] text-cyan-400 font-mono font-normal">{p.modelNumber}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="cyan">{p.category}</Badge>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">${p.price}</td>
                  <td className="py-3 px-4">
                    {p.inStock ? (
                      <span className="text-[11px] font-semibold text-emerald-400">In Stock</span>
                    ) : (
                      <span className="text-[11px] font-semibold text-rose-400">Out of Stock</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {p.isFeatured ? (
                      <span className="text-[11px] font-bold text-amber-400">Yes</span>
                    ) : (
                      <span className="text-[11px] text-slate-500">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Tracker Model'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Model Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  >
                    <option value="Fleet Trackers">Fleet Trackers</option>
                    <option value="OBD Trackers">OBD Trackers</option>
                    <option value="Asset Trackers">Asset Trackers</option>
                    <option value="Personal Trackers">Personal Trackers</option>
                    <option value="Motorbike Trackers">Motorbike Trackers</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded text-cyan-500"
                  />
                  In Showroom Stock
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-cyan-500"
                  />
                  Featured on Homepage
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
                >
                  Save Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
