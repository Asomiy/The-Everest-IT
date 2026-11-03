import React, { useState } from 'react';
import { Course, COURSES } from '../data/coursesData.ts';
import { Search, Clock, BookOpen, Layers, Users, ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
}

type CategoryType = 'All' | 'Art & Design' | 'Marketing' | 'Web Development' | 'Networking';

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryType[] = ['All', 'Art & Design', 'Marketing', 'Web Development', 'Networking'];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses" className="py-20 bg-[#F8F9FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/60 text-[#D90429] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Career-Ready Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1E2C] tracking-tight">
            Explore Professional IT Training Courses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Curated by industry practitioners with a focus on project-based portfolios, freelance order generation, and direct career placement in top tech companies.
          </p>
        </motion.div>

        {/* Filter Controls Bar: Categories & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Filter Tabs: [All] [Art & Design] [Marketing] [Web Development] [Networking] */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-x-auto w-full md:w-auto scrollbar-none relative">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-700 hover:text-[#D90429]'
                  }`}
                >
                  {/* Sliding active background indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-[#D90429] rounded-lg shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses or skills..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] transition-all shadow-xs"
            />
          </div>

        </div>

        {/* Course Cards Grid with Topic Vector Thumbnails */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6, borderColor: '#FCA5A5' }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => onSelectCourse(course)}
              >
                {/* 
                  1. TOP TOPIC-MATCHED VECTOR THUMBNAIL ILLUSTRATION:
                  - Art & Design: Graphic design workspace, color swatch, stylus tablet
                  - Marketing: Digital marketing campaign dashboard, analytics funnel
                  - Web Development: Coding interface, React/HTML code, responsive mockups
                  - Networking & Server: Datacenter rack, Cisco hardware, cyber security shield
                */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} course topic illustration`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />

                  {/* Gradient Scrim for high legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Overlaid Category & Badge Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                      {course.category}
                    </span>

                    {course.badge && (
                      <span className="text-[10px] font-bold text-white bg-[#D90429] px-2 py-0.5 rounded-md shadow-xs">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Seats Remaining Floating Indicator */}
                  <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{course.seatsRemaining} Seats Left</span>
                  </div>
                </div>

                {/* 2. CARD CONTENT: Below Image */}
                <div className="p-5 flex-1 flex flex-col">
                  
                  {/* Bold Course Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1D1E2C] group-hover:text-[#D90429] transition-colors leading-snug line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Meta Details: Duration, Lectures, Projects */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 py-3 border-y border-slate-100 mb-4 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D90429] shrink-0" />
                      <span className="truncate">{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#D90429] shrink-0" />
                      <span>{course.lectures} Lectures</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D90429] shrink-0" />
                      <span>{course.projects} Live Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                      <span className="font-semibold text-slate-800">{course.rating} ({course.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Batch: {course.batchDate}</span>
                    <span className="text-[#D90429] font-semibold">{course.skills[0]}</span>
                  </div>

                </div>

                {/* 3. CARD FOOTER: Clean Red Price Tag & Red 'Get Course' Button */}
                <div className="px-5 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  
                  {/* Fee Display (e.g., 10,000৳) */}
                  <div>
                    <div className="text-[11px] text-slate-400 line-through leading-none">
                      {course.originalFee.toLocaleString()}৳
                    </div>
                    <div className="text-xl font-black text-[#D90429] tracking-tight tabular-nums mt-0.5">
                      {course.fee.toLocaleString()}৳
                    </div>
                  </div>

                  {/* Red & White Theme "Get Course" Button */}
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(course);
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: '#b80322' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#D90429] rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Get Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center border border-slate-200 mt-6 max-w-lg mx-auto"
          >
            <p className="text-base font-bold text-[#1D1E2C]">No courses match your search.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filter or searching for another tech skill.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#D90429] border border-[#D90429] rounded-lg hover:bg-red-50 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
