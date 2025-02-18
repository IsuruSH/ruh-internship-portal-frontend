"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [interns, setInterns] = useState([
    { no: 1, companyname: "ABC Corp", designation: "Software Intern", time: "6 months" },
    { no: 2, companyname: "XYZ Ltd", designation: "Data Analyst", time: "3 months" },
    { no: 3, companyname: "Tech Innovations", designation: "Frontend Developer", time: "1 year" }
  ]);
  const router = useRouter();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInterns = interns.filter((intern) =>
    intern.companyname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ADD INTERNSHIPS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="flex items-center mb-6 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search Company Name"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-1/3 h-10"
            />
            <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
          <button
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
            onClick={() => router.push("/AddInternFrom")}
          >
            + Add Intern
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Company Name</th>
                <th className="border px-4 py-2 bg-gray-300">Designation</th>
                <th className="border px-4 py-2 bg-gray-300">Time Period</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern) => (
                <tr key={intern.no} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{intern.no}</td>
                  <td className="px-4 py-3">{intern.companyname}</td>
                  <td className="px-4 py-3">{intern.designation}</td>
                  <td className="px-4 py-3">{intern.time}</td>
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
