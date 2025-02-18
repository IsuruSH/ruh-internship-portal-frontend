"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = { students: "#FF6B6B", companies: "#FFD700" }; // Modern colors

const InternshipComparisonChart = () => {
  const [data, setData] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Dummy data simulating data from two tables
      const tableData = [
        { name: "SE", students: 60, companies: 80 },
        { name: "BA", students: 40, companies: 70 },
        { name: "PM", students: 60, companies: 25 },
        { name: "QA", students: 50, companies: 30 },
        { name: "UX", students: 45, companies: 35 },
      ];
      setData(tableData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col w-full  mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Internship Preferences</h2>
      
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#555" }} />
          <YAxis tick={{ fill: "#555" }} />
          <Tooltip cursor={{ fill: "#f5f5f5" }} />
          <Legend />
          <Bar
            dataKey="students"
            fill={COLORS.students}
            barSize={20} // Adjusted bar width
            onClick={(entry) => setSelectedBar({ category: "Students", value: entry.students })}
          />
          <Bar
            dataKey="companies"
            fill={COLORS.companies}
            barSize={20} // Adjusted bar width
            onClick={(entry) => setSelectedBar({ category: "Companies", value: entry.companies })}
          />
          </BarChart>
          </ResponsiveContainer>
      
      {selectedBar && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">{selectedBar.category}</h3>
          <p className="text-gray-600">Count: {selectedBar.value}</p>
          <button
            onClick={() => setSelectedBar(null)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InternshipComparisonChart;
