import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calendar, User, Mail, Phone, Building, FileText } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductTitle?: string;
  defaultProductId?: string;
  defaultShowroomTitle?: string;
  defaultType?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProductTitle = '',
  defaultProductId = '',
  defaultShowroomTitle = '',
  defaultType = 'Sales Inquiry',
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    companyName: '',
    enquiryType: defaultType,
    productName: defaultProductTitle,
    productRef: defaultProductId,
    showroomName: defaultShowroomTitle,
    preferredDate: '',
    message: defaultProductTitle
      ? `I am interested in receiving a quote/demo for ${defaultProductTitle}.`
      : 'I would like to enquire about tracking hardware options for our fleet.',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/enquiries', formData);
      if (res.data.success) {
        setSuccess(true);
        showToast('Enquiry submitted! A showroom specialist will contact you shortly.', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h3 className="text-xl font-bold text-white">Showroom Enquiry & Demo Booking</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit your specs or schedule an in-person / virtual tracker hardware demo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-cyan-950 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-800">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-white">Enquiry Received!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your inquiry has been logged with our Showroom Management System. A technical specialist will call or email you within 1 business hour.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-sm hover:bg-cyan-500 transition-all shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enquiry Type</label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Sales Inquiry">Sales Inquiry</option>
                  <option value="Book Live Demo">Book Live Demo</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Installation Request">Installation Request</option>
                  <option value="Showroom Visit">Showroom Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date (Optional)</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Acme Fleet Logistics"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Requirements *</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                placeholder="Describe your fleet size, tracking goals, or specific questions..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-600/20 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : <><Send className="w-4 h-4" /> Send Request</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
