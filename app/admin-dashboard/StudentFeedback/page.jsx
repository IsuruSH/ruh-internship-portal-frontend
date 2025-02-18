'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data (this data will come from the database table in real implementation)
  const [interns, setInterns] = useState([
    { id: 1, name: 'John Doe', scNumber: 'SC12345', company: 'ABC Corp', feedback: 'Great experience!' },
    { id: 2, name: 'Jane Smith', scNumber: 'SC67890', company: 'XYZ Ltd', feedback: 'Learned a lot!' },
    { id: 3, name: 'Alice Johnson', scNumber: 'SC54321', company: 'Tech Innovations', feedback: 'Very supportive team.' }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 ml-[250px]">
      <h1 className="text-2xl font-bold mb-4 text-center">STUDENT FEEDBACKS</h1>
      <div className="bg-slate-100 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="search-section flex items-center mb-4 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search Student"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-1/4 h-10"
            />
            <button onClick={handleSearch} className="bg-gray-800 text-white p-2 rounded h-10 w-auto flex items-center">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="intern-table">
          <table className="min-w-full bg-gray-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Student Name</th>
                <th className="border px-4 py-2 bg-gray-300">SC Number</th>
                <th className="border px-4 py-2 bg-gray-300">Company</th>
                <th className="border px-4 py-2 bg-gray-300">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern, index) => (
                <tr key={intern.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{intern.name}</td>
                  <td className="border px-4 py-2">{intern.scNumber}</td>
                  <td className="border px-4 py-2">{intern.company}</td>
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
