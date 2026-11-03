import React from 'react';
import { 
  Briefcase, 
  Terminal, 
  Laptop2, 
  Compass, 
  UserCheck, 
  Check 
} from 'lucide-react';
import { motion } from 'motion/react';

interface PillarsSectionProps {
  onLearnMore?: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      id: 'industry-relevance',
      number: '01',
      title: 'Industry Relevance',
      icon: Briefcase,
      summary: 'Updated curriculums aligned with actual hiring criteria from leading tech firms and top freelance marketplaces.',
      bullets: [
        'Quarterly syllabus revision with tech leads',
        'Real-world client project scopes',
        'Modern toolchains (React 19, Figma 5, Cisco IOS)'
      ]
    },
    {
      id: 'hands-on-training',
      number: '02',
      title: 'Hands-on Training',
      icon: Terminal,
      summary: '80% practical lab execution. Learn by building complete products, configuring hardware, and solving real errors.',
      bullets: [
        'Dedicated high-spec PC workstations',
        'Physical router & switch racks in Dhaka lab',
        'Git-backed portfolio code repositories'
      ]
    },
    {
      id: 'flexible-learning',
      number: '03',
      title: 'Flexible Learning',
      icon: Laptop2,
      summary: 'Seamless dual-mode attendance. Attend in person at East Shewrapara or join interactive live stream sessions from home.',
      bullets: [
        'Campus studio + Zoom hybrid format',
        'HD lifetime session recordings on LMS',
        'Weekend and evening batch slots'
      ]
    },
    {
      id: 'placement-support',
      number: '04',
      title: 'Placement Support',
      icon: Compass,
      summary: 'Active corporate placement cell connecting graduates with partner software companies, digital agencies, and remote clients.',
      bullets: [
        'Dedicated mock technical interviews',
        'Resume & LinkedIn profile optimization',
        'Freelance proposal bidding guidance'
      ]
    },
    {
      id: 'mentorship',
      number: '05',
      title: '1-on-1 Mentorship',
      icon: UserCheck,
      summary: 'Unlimited post-lecture lab support with senior instructors. Solve code bugs and design challenges directly face-to-face.',
      bullets: [
        'Daily 4-hour open mentor lab hours',
        'Direct project feedback before submission',
        'Lifetime alumni community network'
      ]
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-slate-200/80">
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
            <span>Our Core Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1E2C] tracking-tight">
            Why We Are Different: The 5 Pillars of Everest IT
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We don't just teach theory. We build confident professionals capable of winning high-ticket freelance contracts and passing technical interviews from day one.
          </p>
        </motion.div>

        {/* 5 Minimalist White Cards Featuring Clean Red Vector Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, borderColor: '#FCA5A5' }}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Pillar Index & Clean Red Vector Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className="w-12 h-12 rounded-xl bg-red-50 text-[#D90429] border border-red-100 flex items-center justify-center group-hover:bg-[#D90429] group-hover:text-white transition-colors duration-200 shadow-xs"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <span className="text-xs font-bold font-mono text-slate-300 group-hover:text-red-400 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1D1E2C] group-hover:text-[#D90429] transition-colors mb-2.5">
                    {pillar.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {pillar.summary}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#D90429] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center text-[11px] font-bold text-[#D90429]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D90429] mr-1.5" />
                  <span>Guaranteed Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
