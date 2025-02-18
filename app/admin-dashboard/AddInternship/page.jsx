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
    <div className="flex flex-col items-center p-8 overflow-y-auto mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Internships</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        <div className="flex items-center mb-6 space-x-4 justify-between">
          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              placeholder="Search Company Name"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded-lg p-2 w-full h-10 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button className="bg-blue-600 text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
          <button
            className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/add-intern")}
          >
            + Add Intern
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="border px-4 py-3 text-left text-gray-600">No</th>
                <th className="border px-4 py-3 text-left text-gray-600">Company Name</th>
                <th className="border px-4 py-3 text-left text-gray-600">Designation</th>
                <th className="border px-4 py-3 text-left text-gray-600">Time Period</th>
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
