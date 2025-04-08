"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../lib/axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ChartsSection({ batch }) {
  const [statusData, setStatusData] = useState(null);

  const barData = [
    { name: "SE", students: 60, companies: 80 },
    { name: "BA", students: 40, companies: 70 },
    { name: "PM", students: 60, companies: 25 },
    { name: "QA", students: 50, companies: 30 },
    { name: "UX", students: 45, companies: 35 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/stats/getbatchstatistics`, {
          params: { batch },
        });

        const pieData = Object.entries(res.data.statusPercentages)
          .map(([name, value]) => ({
            name: name
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            value,
          }))
          .filter((item) => item.value > 0);

        setStatusData(pieData);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStatusData([]);
      }
    };

    fetchData();
  }, [batch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Internship Preferences
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" name="Students" />
              <Bar dataKey="companies" fill="#82ca9d" name="Companies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Students Current Status
        </h2>
        <div className="h-80">
          {!statusData ? (
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          ) : statusData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              No status data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
