import React, { useState } from 'react';
import { Save, Building, Phone, Mail, Shield, Bell, Check } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const [instituteName, setInstituteName] = useState('The Everest IT');
  const [address, setAddress] = useState('888/1, 3rd Floor, Hazi Ashraf Ali Market, East Shewrapara, Dhaka-1216, Bangladesh');
  const [hotline, setHotline] = useState('+8801776057078');
  const [supportEmail, setSupportEmail] = useState('info@theeverestit.com');
  const [smsGatewayActive, setSmsGatewayActive] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-extrabold text-[#1D1E2C]">Institute Profile & Settings</h2>
        <p className="text-xs text-slate-500">Configure public contact details, campus address, and admission automated alerts.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-5 text-xs">
        {isSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings updated successfully!</span>
          </div>
        )}

        <div>
          <label className="block font-bold text-slate-800 mb-1">Training Institute Name</label>
          <input
            type="text"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-1">Head Office Campus Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Official Admission Hotline</label>
            <input
              type="text"
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Primary Email Address</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Automated SMS Ticket Notification</span>
              <span className="text-slate-500 text-[11px]">Send instant SMS confirmation with Ticket ID when student registers for free seminar.</span>
            </div>
            <button
              type="button"
              onClick={() => setSmsGatewayActive(!smsGatewayActive)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                smsGatewayActive ? 'bg-[#D90429]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  smsGatewayActive ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#D90429] text-white font-bold rounded-xl hover:bg-[#b80322] transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Authorized Lead Administrator Access Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-extrabold text-[#1D1E2C] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D90429]" />
              <span>Lead Administrator & Access Control</span>
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Strict single-admin access policy. Only the designated administrator can manage institute operations.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
            Enforced & Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Designated Super Admin</span>
            <div className="font-extrabold text-slate-900 text-sm">Amiya Sharma</div>
            <div className="text-slate-500 text-[11px] font-mono mt-0.5">asomiy732@gmail.com</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Database & System Role</span>
            <div className="font-extrabold text-[#D90429] text-sm">Sole Administrator</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Full Cloud Firestore Read, Write & Delete Privileges</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 pt-1">
          🔒 Any attempt to log in using an unauthorized email address is automatically rejected by the security gateway.
        </p>
      </div>

    </div>
  );
};
