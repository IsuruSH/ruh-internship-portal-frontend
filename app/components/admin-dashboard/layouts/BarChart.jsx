"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = { students: "#FF6B6B", companies: "#FFD700" };

const InternshipComparisonChart = () => {
  const [data, setData] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col w-full mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Internship Preferences</h2>

      <div className="flex">
        {/* Chart Container */}
        <div className="w-4/5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip cursor={{ fill: "#f5f5f5" }} />
              
              <Legend layout="vertical" className="mr-2" align="right" verticalAlign="middle" />
              <Bar
                dataKey="students"
                fill={COLORS.students}
                barSize={20}
                onClick={(entry) => setSelectedBar({ category: "Students", value: entry.students })}
              />
              <Bar
                dataKey="companies"
                fill={COLORS.companies}
                barSize={20}
                onClick={(entry) => setSelectedBar({ category: "Companies", value: entry.companies })}
              />
            </BarChart>
          </ResponsiveContainer>
        </div> 
        </div>
       </div>

  );
        
};

export default InternshipComparisonChart;
