import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-[#0F1D2F] p-4 shadow-md fixed top-0 w-full z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md overflow-hidden">
          <img src="/assets/profile.jpg" alt="Profile" width={40} height={40} />
        </div>
        <span className="text-white text-lg font-medium">John Doe</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-white">🔔</button>
        <button className="border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded-md hover:bg-yellow-400 hover:text-black transition">
          Logout
        </button>
      </div>
    </header>
  );
}
