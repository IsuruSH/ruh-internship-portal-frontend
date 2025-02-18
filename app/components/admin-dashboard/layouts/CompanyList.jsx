"use client";

import CompanyBox from "./CompanyBox"; // Ensure CompanyBox is correctly imported

export default function CompaniesList({ companies, students, setStudents, setCompanies }) {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4">
        {companies.map((company) => (
          <div key={company.id} className="min-w-[300px]">
            <CompanyBox
              company={company}
              students={students}
              setStudents={setStudents}
              companies={companies}
              setCompanies={setCompanies}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
