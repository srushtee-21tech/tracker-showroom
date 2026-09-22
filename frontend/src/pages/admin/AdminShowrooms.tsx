import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, X } from 'lucide-react';
import api from '../../services/api';
import { IShowroom } from '../../types';
import { Badge } from '../../components/Badge';
import { useToast } from '../../context/ToastContext';

export const AdminShowrooms: React.FC = () => {
  const { showToast } = useToast();
  const [showrooms, setShowrooms] = useState<IShowroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShowroom, setEditingShowroom] = useState<IShowroom | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    locationName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    whatsapp: '',
    email: '',
    lat: 34.0522,
    lng: -118.2437,
    googleMapEmbedUrl: '',
    status: 'Open',
    isFlagship: false,
    servicesOffered: 'Live Demos, Fleet Installation Bay, Technical Support',
    images: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  });

  const fetchShowrooms = async () => {
    setLoading(true);
    try {
      const res = await api.get('/showrooms');
      if (res.data.success) {
        setShowrooms(res.data.data);
      }
    } catch (err) {
      showToast('Error loading showrooms', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowrooms();
  }, []);

  const openCreateModal = () => {
    setEditingShowroom(null);
    setFormData({
      name: '',
      locationName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '+1 (800) 555-0000',
      whatsapp: '+18005550000',
      email: 'showroom@trackershowroom.com',
      lat: 34.0522,
      lng: -118.2437,
      googleMapEmbedUrl: 'https://maps.google.com/maps?q=34.0522,-118.2437&z=15&output=embed',
      status: 'Open',
      isFlagship: false,
      servicesOffered: 'Live Demos, Fleet Bay, Support',
      images: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    });
    setModalOpen(true);
  };

  const openEditModal = (show: IShowroom) => {
    setEditingShowroom(show);
    setFormData({
      name: show.name,
      locationName: show.locationName,
      address: show.address,
      city: show.city,
      state: show.state,
      zipCode: show.zipCode,
      phone: show.phone,
      whatsapp: show.whatsapp,
      email: show.email,
      lat: show.coordinates.lat,
      lng: show.coordinates.lng,
      googleMapEmbedUrl: show.googleMapEmbedUrl,
      status: show.status,
      isFlagship: show.isFlagship,
      servicesOffered: show.servicesOffered?.join(', ') || '',
      images: show.images?.join(', ') || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this showroom location?')) return;
    try {
      const res = await api.delete(`/showrooms/${id}`);
      if (res.data.success) {
        showToast('Showroom deleted.', 'success');
        fetchShowrooms();
      }
    } catch (err) {
      showToast('Failed to delete showroom.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      locationName: formData.locationName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      email: formData.email,
      openingHours: {
        weekdays: '08:30 AM - 07:00 PM',
        saturday: '09:00 AM - 05:00 PM',
        sunday: 'Closed',
      },
      coordinates: {
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
      googleMapEmbedUrl: formData.googleMapEmbedUrl || `https://maps.google.com/maps?q=${formData.lat},${formData.lng}&z=15&output=embed`,
      status: formData.status,
      isFlagship: formData.isFlagship,
      servicesOffered: formData.servicesOffered.split(',').map((s) => s.trim()).filter(Boolean),
      images: formData.images.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingShowroom) {
        await api.put(`/showrooms/${editingShowroom._id}`, payload);
        showToast('Showroom updated.', 'success');
      } else {
        await api.post('/showrooms', payload);
        showToast('Showroom created.', 'success');
      }
      setModalOpen(false);
      fetchShowrooms();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error saving showroom.', 'error');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Showrooms</h1>
          <p className="text-xs text-slate-400 mt-0.5">Maintain physical experience centers and map pinpoint coordinates.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-cyan-600/20"
        >
          <Plus className="w-4 h-4" /> Add Showroom Center
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Showroom Center</th>
                <th className="py-3 px-4">City / Address</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {showrooms.map((s) => (
                <tr key={s._id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">
                    {s.name}
                    {s.isFlagship && (
                      <span className="ml-2 text-[10px] bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded font-semibold border border-amber-800">
                        Flagship
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {s.city}, {s.state}
                    <span className="block text-[11px] text-slate-400 truncate">{s.address}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-200">{s.phone}</td>
                  <td className="py-3 px-4">
                    <Badge variant={s.status === 'Open' ? 'green' : 'red'}>{s.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400"
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

      {/* Modal for Create/Edit Showroom */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <h3 className="text-xl font-bold text-white">
                {editingShowroom ? 'Edit Showroom' : 'Add New Showroom'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Showroom Center Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location District *</label>
                  <input
                    type="text"
                    required
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
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
                  className="px-6 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs"
                >
                  Save Showroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
