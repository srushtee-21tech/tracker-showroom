import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, MapPin, Inbox, LogOut, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navLinks = [
    { label: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Manage Showrooms', path: '/admin/showrooms', icon: MapPin },
    { label: 'Customer Enquiries', path: '/admin/enquiries', icon: Inbox },
  ];

  const handleLogout = () => {
    logout();
    showToast('Logged out of admin portal.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Admin Portal</h2>
              <span className="text-[10px] text-cyan-400 font-mono">TRACKER SHOWROOM</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span className="truncate">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:bg-rose-950/60 hover:text-rose-400 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-grow p-6 sm:p-10 bg-slate-950 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
