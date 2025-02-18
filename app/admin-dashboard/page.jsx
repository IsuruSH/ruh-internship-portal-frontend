// src/pages/AnalyzePage.jsx
import React from 'react';
import BarChart from '../components/admin-dashboard/layouts/BarChart'; 
import PieChart from "../components/admin-dashboard/layouts/PieChart";

export default function MainContent() {
  return (
    <>
      <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64">
        <h1 className="text-2xl font-bold mb-4 text-center">ANALYZE</h1>
        <BarChart />
        <PieChart />
      </div>
    </>
  );
}
