'use client';
import React, { useState, useEffect } from 'react';
import BarChart from '../components/admin-dashboard/layouts/BarChart'; 
import PieChart from "../components/admin-dashboard/layouts/PieChart";
import DashboardBoxes from '../components/admin-dashboard/layouts/DashboardBoxes';

export default function MainContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRefreshKey(prevKey => prevKey + 1); // Increment refresh key to force re-render
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ANALYZE</h1>
      
      <div className="flex justify-between">
      <DashboardBoxes />
      </div>
      <div>
      <div className="flex justify-between">
        <BarChart key={refreshKey} />
      </div>
      
      <PieChart key={refreshKey + 1} />
      
      </div>
    </div>
    
  );
}
