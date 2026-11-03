import React from 'react';
import { TESTIMONIALS } from '../data/coursesData.ts';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export const CampusShowcase: React.FC = () => {
  const hiringPartners = [
    'Brain Station 23',
    'Sheba.xyz',
    'Amber IT',
    'Walton DigiTech',
    'bKash Ecosystem',
    'Upwork Enterprise',
    'Fiverr Pro',
    'Chaldal'
  ];

  return (
    <section id="about-us" className="py-20 bg-[#F8F9FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/60 text-[#D90429] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Verified Student Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1E2C] tracking-tight">
            From Beginners to Hired Tech Professionals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Our graduates work at Bangladesh's leading technology startups and earn independently from international freelance markets.
          </p>
        </motion.div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-md">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <motion.img
                  src="/src/assets/images/student_project_showcase_1793682946738.jpg"
                  alt="Student workspace with web development and UI UX design projects"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-bold bg-[#D90429] inline-block px-2 py-0.5 rounded mb-1">
                    Student Project Lab
                  </div>
                  <p className="text-xs text-white/90 font-medium">
                    Real client wireframes, interactive web apps, and brand style guides produced during class.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Facts & Pedagogy Pillars */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-2xl font-extrabold text-[#1D1E2C]">
              Real Projects. Live Client Briefs. Measurable Income.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              At The Everest IT, we believe watching pre-recorded tutorials is not enough. You code line-by-line, design layer-by-layer, and launch live servers with mentor guidance in our air-conditioned multimedia computer labs at East Shewrapara.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="text-lg font-bold text-[#D90429]">100% Offline Lab Access</div>
                <p className="text-xs text-slate-600 mt-1">Students can practice 7 days a week with fast fiber internet and high-end core i7 workstations.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="text-lg font-bold text-[#D90429]">Lifetime Community</div>
                <p className="text-xs text-slate-600 mt-1">Private Discord & Slack community with 4,000+ active alumni sharing job leads and freelance tips.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="text-lg font-bold text-[#D90429]">Marketplace Coaching</div>
                <p className="text-xs text-slate-600 mt-1">Direct support for creating verified Upwork, Fiverr, and Behance accounts with SEO-optimized gigs.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3 }}
                className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="text-lg font-bold text-[#D90429]">Govt. Affiliation</div>
                <p className="text-xs text-slate-600 mt-1">Certificate verifiable online with national technical training recognition for overseas visas.</p>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Student Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: '#FCA5A5' }}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#D90429] bg-red-50 px-2 py-0.5 rounded">
                    {t.salary}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic mb-5">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1D1E2C]">{t.name}</h4>
                  <p className="text-[11px] text-[#D90429] font-medium">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.course}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hiring Partners Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-5">
            Our Alumni Are Hired By & Freelance For
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {hiringPartners.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, borderColor: '#D90429', color: '#D90429' }}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition-colors cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
