import React, { useEffect, useState } from 'react';
import { Mail, Phone, Building, Calendar, CheckCircle2, MessageSquare, Edit3, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import { IEnquiry } from '../../types';
import { Badge } from '../../components/Badge';
import { useToast } from '../../context/ToastContext';

export const AdminEnquiries: React.FC = () => {
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const [activeModalEnquiry, setActiveModalEnquiry] = useState<IEnquiry | null>(null);
  const [modalNotes, setModalNotes] = useState('');
  const [modalStatus, setModalStatus] = useState<any>('New');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'All' ? '/enquiries' : `/enquiries?status=${selectedStatus}`;
      const res = await api.get(url);
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      showToast('Error loading enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus]);

  const handleOpenNotes = (enq: IEnquiry) => {
    setActiveModalEnquiry(enq);
    setModalNotes(enq.internalNotes || '');
    setModalStatus(enq.status);
  };

  const handleSaveNotes = async () => {
    if (!activeModalEnquiry) return;
    try {
      const res = await api.put(`/enquiries/${activeModalEnquiry._id}`, {
        status: modalStatus,
        internalNotes: modalNotes,
      });
      if (res.data.success) {
        showToast('Enquiry status updated.', 'success');
        setActiveModalEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      showToast('Failed to update enquiry status.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      const res = await api.delete(`/enquiries/${id}`);
      if (res.data.success) {
        showToast('Enquiry deleted.', 'success');
        fetchEnquiries();
      }
    } catch (err) {
      showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Customer Enquiries</h1>
          <p className="text-xs text-slate-400 mt-0.5">Track and update incoming sales leads, demo requests, and support tickets.</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          {['All', 'New', 'In Progress', 'Contacted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Customer Contact</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Requested Item / Showroom</th>
                <th className="py-3 px-4">Message Preview</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {enquiries.map((e) => (
                <tr key={e._id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">
                    {e.customerName}
                    <div className="text-[11px] text-slate-400 font-normal space-y-0.5 mt-0.5">
                      <p className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-400" /> {e.email}</p>
                      <p className="flex items-center gap-1"><Phone className="w-3 h-3 text-cyan-400" /> {e.phone}</p>
                      {e.companyName && <p className="text-cyan-400 font-semibold">{e.companyName}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-400">
                      {e.enquiryType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-200">
                    {e.productName || e.showroomName || 'General Inquiry'}
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="line-clamp-2 text-slate-300">{e.message}</p>
                    {e.internalNotes && (
                      <span className="text-[10px] text-amber-400 italic block mt-1">Note: {e.internalNotes}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={e.status === 'New' ? 'amber' : e.status === 'Contacted' ? 'cyan' : 'green'}>
                      {e.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenNotes(e)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                      title="Update Status / Notes"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400"
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

      {/* Edit Status & Notes Modal */}
      {activeModalEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Update Lead Workflow Status</h3>
              <button onClick={() => setActiveModalEnquiry(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="e.g. Sent quotation PDF on Oct 5. Follow up next Monday."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveModalEnquiry(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
