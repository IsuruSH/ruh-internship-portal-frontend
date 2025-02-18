"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#004c6d", "#89d0ca", "#006d77", "#56cfe1", "#90e0ef"];

const StudentPieChart = () => {
  const [data, setData] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tableData = [
        { name: "Call the interview", value: 50 },
        { name: "Faced interview", value: 30 },
        { name: "Selected", value: 20 },
        { name: "Internship", value: 40 },
        { name: "Complete Internship", value: 25 },
      ];
      setData(tableData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Students Current Status
      </h2>
      <div className="flex justify-between items-center w-full">
        {/* Pie Chart Container */}
        <div className="w-2/3">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onClick={(entry) => setSelectedStage(entry)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Labels on Right Side */}
        <div className="w-1/3 flex flex-col items-start space-y-3">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-gray-700 font-medium">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup when clicking on a section */}
      {selectedStage && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">{selectedStage.name}</h3>
          <p className="text-gray-600">Students: {selectedStage.value}</p>
          <button
            onClick={() => setSelectedStage(null)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPieChart;

