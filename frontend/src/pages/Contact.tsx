import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const enquiryTypeFromUrl = typeParam || 'Sales Inquiry';

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    companyName: '',
    enquiryType: enquiryTypeFromUrl,
    message: '',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: enquiryTypeFromUrl,
    }));
  }, [typeParam, enquiryTypeFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/enquiries', formData);
      if (res.data.success) {
        setSubmitted(true);
        showToast('Message sent! Our showroom team will contact you shortly.', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to submit message.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Showroom Helpdesk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contact Our Technical Sales Team
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Have questions about fleet 4G telemetry hardware, OBD diagnostics, or setting up a bulk trial? Get in touch with our showroom technical consultants.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-cyan-950 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-800">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Thank You for Contacting Us</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your message has been assigned to a dedicated showroom manager. We will get back to you via phone or email within 1 business hour.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ ...formData, message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-sm hover:bg-cyan-500 transition-all shadow-lg"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <h3 className="text-xl font-bold text-white mb-4">Send a Direct Message</h3>

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
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Logistics Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your fleet tracking requirements or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Transmitting Message...' : <><Send className="w-4 h-4" /> Submit Inquiry</>}
              </button>
            </form>
          )}
        </div>

        {/* Right Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
            <h3 className="text-xl font-bold text-white">Showroom Contact Directory</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Corporate Support Toll-Free</h4>
                  <p className="text-xs text-slate-400 mt-0.5">1-800-TRACKER (+1 800 555-8725)</p>
                  <p className="text-[11px] text-slate-500">Mon - Fri: 8:00 AM - 7:00 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Sales & Quotations</h4>
                  <p className="text-xs text-slate-400 mt-0.5">sales@trackershowroom.com</p>
                  <p className="text-[11px] text-slate-500">Fast response guaranteed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Instant WhatsApp Line</h4>
                  <p className="text-xs text-slate-400 mt-0.5">+1 (800) 555-8725</p>
                  <a
                    href="https://wa.me/18005558725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Flagship Experience Center
            </h4>
            <p className="text-xs text-slate-300">100 Innovation Parkway, Suite 400, Tech District, CA 90210</p>
          </div>
        </div>
      </div>
    </div>
  );
};
