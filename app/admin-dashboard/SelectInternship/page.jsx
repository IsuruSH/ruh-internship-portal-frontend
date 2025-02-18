"use client";

import { useState } from "react";
import StudentTable from "../components/StudentTable";
import CompanyBox from "../components/CompanyBox";
//import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MainContent() {
  // Initial state for companies
  const [companies, setCompanies] = useState([
    { id: 1, name: "Company A", email: "email@companya.com", students: [] },
    { id: 2, name: "Company B", email: "email@companyb.com", students: [] },
    { id: 3, name: "Company C", email: "email@companyc.com", students: [] },
    { id: 4, name: "Company D", email: "email@companyd.com", students: [] },
    { id: 5, name: "Company E", email: "email@companye.com", students: [] },
  ]);

  // State for the current index of visible companies
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle previous click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : companies.length - 1));
  };

  // Handle next click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < companies.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      {/* Main content area */}
      <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64">
        <h1 className="text-2xl font-bold mb-4 text-center">SELECT INTERNSHIPS</h1>

        <div className="container mx-auto p-4">
          <div className="relative w-full">
            {/* Company section with horizontal scroll and navigation buttons */}
            <div className="flex justify-center items-center overflow-x-hidden mb-16">
              <button className="text-2xl mr-8" onClick={handlePrevClick}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="flex overflow-x-auto space-x-8">
                {companies.slice(currentIndex, currentIndex + 4).map((company) => (
                  <CompanyBox key={company.id} company={company} />
                ))}
              </div>
              <button className="text-2xl ml-8" onClick={handleNextClick}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Student table component */}
          <StudentTable />
        </div>
      </div>
    </>
  );
}
