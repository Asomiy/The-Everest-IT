import React from 'react';
import { Users, BookOpen, Calendar, CreditCard, TrendingUp, Sparkles } from 'lucide-react';
import { ADMIN_KPIS } from '../../data/adminMockData.ts';
import { motion } from 'motion/react';

export const AdminKpiCards: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users': return Users;
      case 'book': return BookOpen;
      case 'calendar': return Calendar;
      case 'creditCard': return CreditCard;
      default: return Users;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {ADMIN_KPIS.map((kpi, idx) => {
        const Icon = getIcon(kpi.iconName);
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -3, borderColor: '#FCA5A5' }}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {kpi.title}
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90429] border border-red-100 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#1D1E2C] tracking-tight tabular-nums">
                {kpi.value}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3" />
                  {kpi.change}
                </span>
                <span className="truncate">{kpi.timeframe}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
