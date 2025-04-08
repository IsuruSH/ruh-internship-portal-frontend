"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaBuilding, FaUserTie, FaClock } from "react-icons/fa";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        {
          company: "Google",
          designation: "Software Engineer Intern",
          timePeriod: "3 Months",
        },
        {
          company: "IfS",
          designation: "QA Intern",
          timePeriod: "6 Months",
        },
        {
          company: "WSO2",
          designation: "PM Intern",
          timePeriod: "6 Months",
        },
        {
          company: "Creative Software",
          designation: "Software Engineer Intern",
          timePeriod: "6 Months",
        },
        // ... (rest of your dummy data)
      ];
      setTimeout(() => {
        setInternships(dummyData);
      }, 1000);
    };
    fetchData();
  }, []);

  const filteredInternships = internships.filter(
    (internship) =>
      internship.company.toLowerCase().includes(searchCompany.toLowerCase()) &&
      internship.designation
        .toLowerCase()
        .includes(searchDesignation.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Internships</h1>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
          {/* Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by company..."
                  value={searchCompany}
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </form>

            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTie className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by designation..."
                  value={searchDesignation}
                  onChange={(e) => setSearchDesignation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </form>
          </div>

          {/* Modern Table Design */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaBuilding className="mr-2" />
                      Company
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaUserTie className="mr-2" />
                      Designation
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      Duration
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{internship.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{internship.designation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{internship.timePeriod}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No internships match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;