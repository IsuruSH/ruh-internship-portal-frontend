// src/pages/AnalyzePage.jsx
'use client';
import React from 'react';
import BarChart from '../components/admin-dashboard/layouts/BarChart'; 
import PieChart from "../components/admin-dashboard/layouts/PieChart";
import DashboardBoxes from '../components/admin-dashboard/layouts/DashboardBoxes';

export default function MainContent() {
  return (
    <>
      <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ANALYZE</h1>
        <div>
          <div className="flex justify-between">
            <BarChart />
          </div>
          
          <div>
            <PieChart />
          </div>

          <div>
            <DashboardBoxes />
          </div>
        </div>
        
       
      </div>
    </>
  );
}
