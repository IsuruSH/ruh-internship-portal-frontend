// pages/internships.js
"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");

  // Fetching internship data from the server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/internships");
      const data = await response.json();
      setInternships(data);
    };
    fetchData();
  }, []);

  // Filtering internships based on search criteria
  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchCompany.toLowerCase()) &&
      internship.designation
        .toLowerCase()
        .includes(searchDesignation.toLowerCase())
  );

  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // The filter logic is already applied in the filteredInternships variable
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center">INTERNSHIPS</h1>
      <div className="bg-slate-100 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="flex gap-4 mb-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <span className="text-gray-700">Company:</span>
            <div className="flex items-center border border-gray-300 rounded px-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by Company"
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-[#1E2A30] text-white rounded"
            >
              Search
            </button>
          </form>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <span className="text-gray-700">Designation:</span>
            <div className="flex items-center border border-gray-300 rounded px-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by Designation"
                value={searchDesignation}
                onChange={(e) => setSearchDesignation(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-[#1E2A30] text-white rounded"
            >
              Search
            </button>
          </form>
        </div>
        <table className="w-full border border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-center bg-gray-200">Company</th>
              <th className="border p-2 text-center bg-gray-200">
                Designation
              </th>
              <th className="border p-2 text-center bg-gray-200">
                Time period
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Adding rows with decreased height */}
            <tr style={{ height: "40px" }}>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
            </tr>

            {/* Displaying filtered internships */}
            {filteredInternships.map((internship, index) => (
              <tr key={index} style={{ height: "40px" }}>
                <td className="border p-2">{internship.company}</td>
                <td className="border p-2">{internship.designation}</td>
                <td className="border p-2">{internship.timePeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternshipPage;
