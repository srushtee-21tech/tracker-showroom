import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Navigation, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@trackershowroom.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        showToast('Welcome back, System Administrator!', 'success');
        navigate('/admin');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Login failed. Check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-600/30">
            <Navigation className="w-7 h-7 text-white transform -rotate-45" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Showroom Portal Login</h2>
          <p className="text-xs text-slate-400">Authenticated access for showroom administrators</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : <><ShieldCheck className="w-4 h-4" /> Sign In to Portal</>}
          </button>
        </form>

        {/* Demo Credentials Callout Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
          <span className="font-bold text-cyan-400 block">Default Admin Demo Credentials</span>
          <p><span className="text-slate-300">Email:</span> admin@trackershowroom.com</p>
          <p><span className="text-slate-300">Password:</span> Admin@123456</p>
        </div>
      </div>
    </div>
  );
};
