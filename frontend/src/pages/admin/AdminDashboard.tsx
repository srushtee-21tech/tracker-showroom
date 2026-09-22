import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Inbox, Plus, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { IAdminStats } from '../../types';
import { Badge } from '../../components/Badge';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-900 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900 rounded-2xl border border-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time statistics for Tracker Showroom products, centers, and leads.</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/products"
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
          <Link
            to="/admin/showrooms"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Showroom
          </Link>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white block">{stats?.totalEnquiries || 0}</span>
          <span className="text-[11px] text-cyan-400 font-semibold">{stats?.newEnquiries || 0} New Unprocessed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Products</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white block">{stats?.activeProducts || 0}</span>
          <span className="text-[11px] text-slate-400">Out of {stats?.totalProducts || 0} models</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Showroom Centers</span>
            <div className="p-2 rounded-xl bg-sky-950 text-sky-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white block">{stats?.totalShowrooms || 0}</span>
          <span className="text-[11px] text-slate-400">Active Experience Hubs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">System Status</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-bold text-emerald-400 block">Operational</span>
          <span className="text-[11px] text-slate-400">API Health Nominal</span>
        </div>
      </div>

      {/* Recent Incoming Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Customer Enquiries</h3>
            <p className="text-xs text-slate-400">Incoming sales inquiries and demo bookings.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
          >
            View All Enquiries <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Product / Showroom</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {stats.recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">
                      {enq.customerName}
                      <span className="block text-[11px] text-slate-400 font-normal">{enq.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-400">
                        {enq.enquiryType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {enq.productName || enq.showroomName || 'General Inquiry'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={enq.status === 'New' ? 'amber' : enq.status === 'Contacted' ? 'cyan' : 'green'}>
                        {enq.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">No recent customer enquiries logged.</p>
        )}
      </div>
    </div>
  );
};
