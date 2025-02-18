'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const interns = [
    { id: 1, companyName: 'Tech Corp', email: 'tech@corp.com', studentName: 'Alice Johnson', feedback: 'Excellent performance' },
    { id: 2, companyName: 'Innovate Ltd', email: 'info@innovate.com', studentName: 'Bob Smith', feedback: 'Very creative' },
    { id: 3, companyName: 'Future Solutions', email: 'contact@future.com', studentName: 'Charlie Brown', feedback: 'Needs improvement' },
  ];

  const filteredInterns = interns.filter((intern) =>
    intern.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">SUPERVISOR FEEDBACKS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="search-section flex items-center mb-4 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search Company name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 w-1/3 h-10"
            />
            <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="intern-table">
          <table className="min-w-full bg-gray-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Company Name</th>
                <th className="border px-4 py-2 bg-gray-300">Email</th>
                <th className="border px-4 py-2 bg-gray-300">Student Name</th>
                <th className="border px-4 py-2 bg-gray-300">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern, index) => (
                <tr key={intern.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{intern.companyName}</td>
                  <td className="border px-4 py-2">{intern.email}</td>
                  <td className="border px-4 py-2">{intern.studentName}</td>
                  <td className="border px-4 py-2">{intern.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
