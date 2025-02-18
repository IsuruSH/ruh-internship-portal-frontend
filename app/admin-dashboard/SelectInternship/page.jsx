"use client";

import { useState } from "react";

import CompaniesList from "../../components/admin-dashboard/layouts/CompanyList";
import CompanyBox from "../../components/admin-dashboard/layouts/CompanyBox";
import StudentTable from "../../components/admin-dashboard/layouts/Studenttable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Main() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      scNumber: "SC001",
      designation: "Developer",
      email: "john@example.com",
      gpa: 3.8,
      company: "TechCorp",
    },
    {
      id: 2,
      name: "Jane Smith",
      scNumber: "SC002",
      designation: "Designer",
      email: "jane@example.com",
      gpa: 3.5,
      company: "DesignWorks",
    },
    {
      id: 3,
      name: "Mark Taylor",
      scNumber: "SC003",
      designation: "Analyst",
      email: "mark@example.com",
      gpa: 3.9,
      company: "DataInsights",
    },
    {
      id: 4,
      name: "Emily Davis",
      scNumber: "SC004",
      designation: "Project Manager",
      email: "emily@example.com",
      gpa: 3.6,
      company: "PM Solutions",
    },
    {
      id: 5,
      name: "Chris Wilson",
      scNumber: "SC005",
      designation: "QA Engineer",
      email: "chris@example.com",
      gpa: 3.2,
      company: "Testify",
    },
    {
      id: 6,
      name: "Olivia Brown",
      scNumber: "SC006",
      designation: "Frontend Developer",
      email: "olivia@example.com",
      gpa: 4.0,
      company: "WebInnovate",
    },
    {
      id: 7,
      name: "Liam Johnson",
      scNumber: "SC007",
      designation: "Backend Developer",
      email: "liam@example.com",
      gpa: 3.7,
      company: "ServerTech",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      scNumber: "SC008",
      designation: "Data Scientist",
      email: "sophia@example.com",
      gpa: 3.9,
      company: "DataMind",
    },
    {
      id: 9,
      name: "Michael Clark",
      scNumber: "SC009",
      designation: "Cybersecurity Specialist",
      email: "michael@example.com",
      gpa: 3.3,
      company: "SecureTech",
    },
    {
      id: 10,
      name: "Emma White",
      scNumber: "SC010",
      designation: "AI Engineer",
      email: "emma@example.com",
      gpa: 3.8,
      company: "AI Labs",
    },
    {
      id: 11,
      name: "Daniel Harris",
      scNumber: "SC011",
      designation: "Cloud Engineer",
      email: "daniel@example.com",
      gpa: 3.5,
      company: "CloudFlex",
    },
    {
      id: 12,
      name: "Ava Scott",
      scNumber: "SC012",
      designation: "UI/UX Designer",
      email: "ava@example.com",
      gpa: 3.7,
      company: "DesignSpark",
    },
    {
      id: 13,
      name: "Ethan Lewis",
      scNumber: "SC013",
      designation: "Software Tester",
      email: "ethan@example.com",
      gpa: 3.4,
      company: "BugFree Solutions",
    },
  ]);

  const [companies, setCompanies] = useState([
    { id: 1, name: "Company A", email: "companyA@example.com", students: [] },
    { id: 2, name: "Company B", email: "companyB@example.com", students: [] },
    { id: 3, name: "Company C", email: "companyC@example.com", students: [] },
    { id: 4, name: "Company D", email: "companyD@example.com", students: [] },
    { id: 5, name: "Company E", email: "companyE@example.com", students: [] },
    { id: 6, name: "Company F", email: "companyF@example.com", students: [] },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">SELECT INTERNSHIPS</h1>
        <div className="mt-6 p-4 border rounded-lg shadow-lg bg-white">
        <div className="grid grid-cols-3 gap-4">
          {companies.map((company) => (
            
            <CompanyBox
              key={company.id}
              company={company}
              students={students}
              setStudents={setStudents}
              companies={companies}
              setCompanies={setCompanies}
            />
            
          ))}
        </div>
        </div>
        <StudentTable students={students} setStudents={setStudents} />

      </div>
    </DndProvider>
  );
}
