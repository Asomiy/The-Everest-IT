import React, { useState } from 'react';
import { COURSES, Course } from '../../data/coursesData.ts';
import { Plus, Edit2, Users, Clock, BookOpen, Layers, Check, Search } from 'lucide-react';

export const CourseManagementView: React.FC = () => {
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [tempFee, setTempFee] = useState<number>(0);
  const [search, setSearch] = useState('');

  const filtered = coursesList.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setTempFee(course.fee);
  };

  const saveFee = (id: string) => {
    setCoursesList(prev => prev.map(c => c.id === id ? { ...c, fee: tempFee } : c));
    setEditingCourseId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-[#1D1E2C]">Course Management & Batches</h2>
          <p className="text-xs text-slate-500">Manage course curriculums, batch schedules, fees, and seat quotas.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs uppercase">
                  {course.category}
                </span>
                <span className="text-[10px] font-bold text-white bg-[#D90429] px-2 py-0.5 rounded shadow-xs">
                  {course.seatsRemaining} Seats Left
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-extrabold text-sm sm:text-base text-[#1D1E2C] mb-1.5">{course.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{course.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 p-2.5 bg-slate-50 rounded-xl mb-4 mt-auto">
                <div>Duration: <strong>{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</strong></div>
                <div>Lectures: <strong>{course.lectures} Classes</strong></div>
                <div>Batch: <strong>{course.batchDate}</strong></div>
                <div>Projects: <strong>{course.projects} Real Apps</strong></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {editingCourseId === course.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempFee}
                    onChange={(e) => setTempFee(Number(e.target.value))}
                    className="w-24 px-2 py-1 text-xs font-bold border border-[#D90429] rounded"
                  />
                  <button
                    onClick={() => saveFee(course.id)}
                    className="p-1 bg-[#D90429] text-white rounded text-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] text-slate-400 block line-through">{course.originalFee.toLocaleString()}৳</span>
                  <span className="text-base font-black text-[#D90429] tabular-nums">{course.fee.toLocaleString()}৳</span>
                </div>
              )}

              <button
                onClick={() => startEdit(course)}
                className="text-xs font-bold text-slate-600 hover:text-[#D90429] flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Fee</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
