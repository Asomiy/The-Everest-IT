import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  Laptop, 
  Briefcase, 
  UserCheck, 
  TrendingUp, 
  Building2 
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter.tsx';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onBookFreeSeminar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onBookFreeSeminar,
}) => {
  const impactStats = [
    {
      id: 'students',
      value: 90000,
      suffix: '+',
      title: 'Successful Students',
      subtitle: 'Trained & certified',
      icon: GraduationCap,
    },
    {
      id: 'freelancers',
      value: 34000,
      suffix: '+',
      title: 'Expert Freelancers',
      subtitle: 'Upwork & Fiverr earners',
      icon: Laptop,
    },
    {
      id: 'job-holders',
      value: 40000,
      suffix: '+',
      title: 'Skilled Job Holders',
      subtitle: 'In local & global firms',
      icon: Briefcase,
    },
    {
      id: 'experts',
      value: 600,
      suffix: '+',
      title: 'Industry Expert',
      subtitle: 'Practicing mentors',
      icon: UserCheck,
    },
    {
      id: 'ratio',
      value: 89,
      suffix: '%',
      title: 'Success Ratio',
      subtitle: 'Placement & income rate',
      icon: TrendingUp,
    },
    {
      id: 'companies',
      value: 3000,
      suffix: '+',
      title: 'Companies',
      subtitle: 'Hiring our graduates',
      icon: Building2,
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-[#FBFBFC] to-[#F8F9FA] pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/70">
      
      {/* Abstract Minimalist Red Vector & Grid Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle geometric grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#D90429 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Soft atmospheric red light gradient */}
        <motion.div 
          className="absolute -top-32 right-0 w-[550px] h-[550px] bg-red-100/40 rounded-full blur-3xl"
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-red-50/60 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Minimalist geometric angular lines */}
        <svg className="absolute top-12 right-1/4 w-72 h-72 text-red-100/60 opacity-70" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M 20 180 L 180 20" stroke="#D90429" strokeWidth="1" strokeOpacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Split: Content & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headlines, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker / Location Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-[#D90429]"
            >
              <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse" />
              <span>Dhaka's Premier IT Training Institute · East Shewrapara</span>
            </motion.div>

            {/* H1 Headline in Deep Black */}
            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#1D1E2C] leading-[1.14] tracking-tight" 
              style={{ textWrap: 'balance' }}
            >
              Empowering Future Tech Leaders Through <span className="text-[#D90429] relative inline-block">Hands-On IT Training.
                <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-red-200" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M 0 5 Q 100 0 200 5" stroke="#D90429" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-headline in Slate Gray */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
            >
              Gain practical, job-ready expertise in Graphic Design, Web Development, Digital Marketing, and Cyber Security. Learn through live client-grade projects and direct 1-on-1 mentorship from industry veterans.
            </motion.p>

            {/* Trust Bullet Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-medium text-slate-700 pt-1"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0" />
                <span>100% Practical Project Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0" />
                <span>Govt. Approved & Industry Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0" />
                <span>Post-Course Freelance Support</span>
              </div>
            </motion.div>

            {/* Two CTA Buttons: [Explore Courses - Solid Red] & [Book Free Seminar - White with Red Border] */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              {/* Solid Red Primary Button */}
              <motion.button
                onClick={onExploreCourses}
                whileHover={{ scale: 1.025, backgroundColor: '#b80322' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#D90429] rounded-xl shadow-md shadow-red-600/20 cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* White with Red Border Secondary Button */}
              <motion.button
                onClick={onBookFreeSeminar}
                whileHover={{ scale: 1.025, backgroundColor: '#FEF2F2' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-[#D90429] bg-white border-2 border-[#D90429] rounded-xl shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#D90429]" />
                <span>Book Free Seminar</span>
              </motion.button>
            </motion.div>

            {/* Urgent Admission Notice */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Admissions open for Batch 48 · Limited physical seats per batch for 1-on-1 focus</span>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Asset & Floating Info Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            
            {/* Visual Container */}
            <div className="relative rounded-2xl p-2 bg-white shadow-xl shadow-slate-200/60 border border-slate-200/90 overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                <motion.img
                  src="/src/assets/images/hero_it_training_lab_1793682946042.jpg"
                  alt="Students training at The Everest IT modern lab in Dhaka"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#D90429] animate-pulse" />
                    <span className="font-semibold">East Shewrapara Campus Lab</span>
                  </div>
                  <span className="bg-[#D90429] px-2.5 py-1 rounded-md font-bold text-[11px]">
                    Live Sessions
                  </span>
                </div>
              </div>

              {/* Floating Highlight Card with gentle floating animation */}
              <motion.div 
                className="mt-3 p-3 bg-red-50/70 rounded-xl border border-red-100 flex items-center justify-between gap-3"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D90429] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    48th
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#1D1E2C]">Next Physical & Online Batch</h2>
                    <p className="text-[11px] text-slate-500">Starting Friday, Nov 15 · 3 Days/Week</p>
                  </div>
                </div>
                <button
                  onClick={onExploreCourses}
                  className="text-xs font-bold text-[#D90429] hover:underline whitespace-nowrap cursor-pointer"
                >
                  View Batches →
                </button>
              </motion.div>
            </div>

            {/* Subtle decorative Red Corner Accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#D90429]/40 rounded-br-2xl pointer-events-none hidden sm:block" />
          </motion.div>

        </div>

        {/* 
          UPDATED IMPACT STATISTICS (LIVE COUNTERS STRIP):
          Clean white background with modern red and black accent counter cards:
          1. 90,000+ Successful Students
          2. 34,000+ Expert Freelancers
          3. 40,000+ Skilled Job Holders
          4. 600+ Industry Expert
          5. 89% Success Ratio
          6. 3,000+ Companies
        */}
        <div className="mt-14 pt-10 border-t border-slate-200/80">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[11px] font-bold text-[#D90429] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]" />
              <span>Proven Training Impact & Success</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D1E2C] tracking-tight">
              Leading the IT Revolution in Bangladesh
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real metrics achieved through intensive hands-on lab training and dedicated 1-on-1 mentorship.
            </p>
          </div>

          {/* 6 Modern Counter Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {impactStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  whileHover={{ y: -5, borderColor: '#FCA5A5' }}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                >
                  {/* Card Icon & Accent */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90429] flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-[#D90429] group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-red-100 group-hover:bg-[#D90429] transition-colors" />
                  </div>

                  {/* Live Animated Counter */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#D90429] tracking-tight leading-none">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Stat Title */}
                    <div className="text-xs sm:text-sm font-extrabold text-[#1D1E2C] mt-2 leading-snug">
                      {stat.title}
                    </div>

                    {/* Subtitle */}
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {stat.subtitle}
                    </div>
                  </div>

                  {/* Red bottom accent hairline */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-[10px] font-bold text-slate-400 group-hover:text-[#D90429] transition-colors">
                    <span>Verified Milestone</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
