import React, { useState, useEffect } from 'react';
import { INITIAL_ENROLLMENTS, StudentEnrollmentRecord } from '../../data/adminMockData.ts';
import { CheckCircle2, Clock, Phone, CreditCard, Search, Download, Database } from 'lucide-react';
import { subscribeToEnrollments } from '../../lib/firebase.ts';

export const StudentEnrollmentsView: React.FC = () => {
  const [enrollments, setEnrollments] = useState<StudentEnrollmentRecord[]>(INITIAL_ENROLLMENTS);
  const [search, setSearch] = useState('');

  // Subscribe to real-time student enrollment collection in Firestore
  useEffect(() => {
    const unsubscribe = subscribeToEnrollments((firestoreEnrollments) => {
      if (firestoreEnrollments && firestoreEnrollments.length > 0) {
        const firestoreIds = new Set(firestoreEnrollments.map(e => e.enrollmentId));
        const filteredInitial = INITIAL_ENROLLMENTS.filter(e => !firestoreIds.has(e.enrollmentId || e.id));

        const mapped: StudentEnrollmentRecord[] = firestoreEnrollments.map(e => ({
          id: e.id || e.enrollmentId,
          enrollmentId: e.enrollmentId,
          studentName: e.studentName,
          phone: e.phone,
          course: e.course,
          batch: e.batch,
          feePaid: e.feePaid,
          totalFee: e.totalFee,
          paymentMethod: e.paymentMethod,
          date: e.date,
          status: e.status
        }));

        setEnrollments([...mapped, ...filteredInitial]);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const filtered = enrollments.filter(e => 
    e.studentName.toLowerCase().includes(search.toLowerCase()) ||
    e.phone.includes(search) ||
    e.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#1D1E2C]">Student Enrollments & Tuition</h2>
          <p className="text-xs text-slate-500">Track tuition installments, bKash/Nagad transactions, and batch assignments.</p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search student or phone..."
          className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-full sm:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
              <th className="py-3 px-5">Student / ID</th>
              <th className="py-3 px-4">Course & Batch</th>
              <th className="py-3 px-4">Amount Paid</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right pr-5">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-5">
                  <div className="font-bold text-[#1D1E2C]">{item.studentName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{item.phone}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-800">{item.course}</div>
                  <div className="text-[11px] text-slate-400">{item.batch}</div>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-[#D90429] tabular-nums">
                  {item.feePaid.toLocaleString()}৳ <span className="text-slate-400 font-normal">/ {item.totalFee.toLocaleString()}৳</span>
                </td>
                <td className="py-3 px-4 text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">{item.paymentMethod}</span>
                </td>
                <td className="py-3 px-4 text-slate-500 tabular-nums">
                  {item.date}
                </td>
                <td className="py-3 px-4 text-right pr-5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    item.status === 'Full Paid' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
