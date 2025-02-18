"use client";
import React from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios"; // Ensure this is set up for API calls
import { useUser } from "@/app/student-dashboard/context/UserContext";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const user = useUser();

  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout"); // Call logout API
      localStorage.removeItem("token"); // Remove token from storage
      if (response.status === 200) {
        toast.success(response.data.message); // Show success message
        router.push("/pages/auth?mode=login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-[#0F1D2F] p-4 shadow-md fixed top-0 w-full z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md overflow-hidden">
          <img src="/assets/profile.jpg" alt="Profile" width={40} height={40} />
        </div>
        <span className="text-white text-lg font-medium">
          
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-white">🔔</button>
        <button
          onClick={handleLogout}
          className="border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded-md hover:bg-yellow-400 hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
