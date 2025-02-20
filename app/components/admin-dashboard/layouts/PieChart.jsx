"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#004c6d", "#89d0ca", "#006d77", "#56cfe1", "#90e0ef"];

const StudentPieChart = () => {
  const [data, setData] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const tableData = [
      { name: "Call the interview", value: 50 },
      { name: "Faced interview", value: 30 },
      { name: "Selected", value: 20 },
      { name: "Internship", value: 40 },
      { name: "Complete Internship", value: 25 },
    ];
    setData(tableData);
  }, []);

  // Generate students dynamically based on category counts
  const generateStudents = (count, category) => {
    return Array.from({ length: count }, (_, i) => ({
      sc: `SC${(i + 1).toString().padStart(3, "0")}`,
      name: `Student ${i + 1}`,
      address: `${i + 10} Main Street`,
      gpa: (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2), // Random GPA between 2.5 - 4.0
      phone: `07${Math.floor(Math.random() * 90000000) + 10000000}`, // Random Sri Lankan-style phone number
      email: `student${i + 1}@example.com`,
      cv: `cv${i + 1}.pdf`,
      category,
    }));
  };

  // Create students for each category
  const studentData = {
    "Call the interview": generateStudents(50, "Call the interview"),
    "Faced interview": generateStudents(30, "Faced interview"),
    "Selected": generateStudents(20, "Selected"),
    "Internship": generateStudents(40, "Internship"),
    "Complete Internship": generateStudents(25, "Complete Internship"),
  };

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
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setSelectedStage(entry)}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-gray-700 font-medium">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student List when Clicking on a Category */}
      {selectedStage && studentData[selectedStage.name] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md max-h-96 overflow-y-auto relative">
            {/* Close Icon */}
            <button
              onClick={() => setSelectedStage(null)}
              className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold text-gray-700">{selectedStage.name}</h3>
            <p className="text-gray-600">Students: {selectedStage.value}</p>

            {/* Display SC Number & Student Name */}
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">SC Number</th>
                  <th className="p-2 border">Name</th>
                </tr>
              </thead>
              <tbody>
                {studentData[selectedStage.name].map((student, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-gray-300"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="p-2 border">{student.sc}</td>
                    <td className="p-2 border">{student.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Details Popup */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2 relative shadow-lg">
            {/* Close Icon */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Student Details</h2>
            <p><strong>SC Number:</strong> {selectedStudent.sc}</p>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
            <p><strong>Phone:</strong> {selectedStudent.phone}</p>
            <p><strong>Email:</strong> <a href={`mailto:${selectedStudent.email}`} className="text-blue-500">{selectedStudent.email}</a></p>
            <p><strong>CV:</strong> <a href={selectedStudent.cv} className="text-blue-500">Download</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPieChart;
