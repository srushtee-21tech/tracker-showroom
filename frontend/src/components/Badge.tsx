import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'slate' | 'green' | 'amber' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'cyan', className = '' }) => {
  const styles = {
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/50',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    green: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
    red: 'bg-rose-950/60 text-rose-400 border-rose-800/50',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
