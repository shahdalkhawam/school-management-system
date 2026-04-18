import React from 'react';

export function NavIcon({ icon, active }) {
  return (
    <button className={`p-3 rounded-xl transition-all ${active ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-[#686088] hover:text-white hover:bg-[#2a2442]'}`}>
      {icon}
    </button>
  );
}

export function StatCard({ icon, title, value, color, trend }) {
  return (
    <div className="bg-[#1c1535] rounded-xl p-5 border border-[#2a2442]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-emerald-400 text-xs font-medium">{trend}</span>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-opacity-20`}>
          <div className={color.replace('bg-', 'text-')}>{icon}</div>
        </div>
      </div>
      <div className="text-right">
        <h3 className="text-[#8e87a8] text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export function ActionBtn({ icon, color }) {
  return (
    <button className={`p-1.5 rounded-md bg-[#241c40] transition ${color}`}>
      {icon}
    </button>
  );
}