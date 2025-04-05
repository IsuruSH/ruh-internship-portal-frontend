"use client";
import { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  FaTimes,
  FaInfoCircle,
  FaPaperclip,
  FaSort,
  FaEnvelope,
} from "react-icons/fa";

// Student Component
const StudentCard = ({ student, onRemove, isInPanel }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "STUDENT",
    item: { id: student.id },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        onRemove(item.id);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded-lg flex justify-between items-center transition-all ${
        isDragging ? "opacity-50 shadow-lg" : "opacity-100"
      } ${
        isInPanel ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-50"
      }`}
    >
      <div>
        <div className="font-medium">{student.name}</div>
        <div className="text-sm text-gray-600">
          {student.scNumber} • GPA: {student.gpa}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href={`/cv/${student.id}`}
          className="text-gray-500 hover:text-black hover:bg-gray-100 text-sm border rounded px-[6px] py-[1px]"
          title="View CV"
        >
          C V
        </a>
        <a
          href={`/student/${student.id}`}
          className="text-gray-500 hover:text-gray-700"
          title="Student Info"
        >
          <FaInfoCircle />
        </a>
        {!isInPanel && (
          <button
            onClick={() => onRemove(student.id)}
            className="text-red-500 hover:text-red-700"
            title="Remove from company"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

// Company Box Component
const CompanyBox = ({ company, students, onDrop, onRemove, onSortCompany }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "STUDENT",
    drop: (item) => onDrop(item.id, company.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const companyStudents = students.filter((s) => s.companyId === company.id);

  return (
    <div
      ref={drop}
      className={`border rounded-lg p-4 h-fit flex flex-col shadow-sm ${
        isOver ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
          <p className="text-sm text-gray-500">{company.email}</p>
        </div>

        <div className="relative">
          <select
            onChange={(e) => onSortCompany(company.id, e.target.value)}
            className="appearance-none bg-gray-100 border border-gray-300 rounded pl-2 pr-6 py-1 text-xs"
          >
            <option value="scNumber">SC Number</option>
            <option value="gpa">GPA</option>
            <option value="name">Name</option>
          </select>
          <FaSort className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs" />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mb-3 space-y-2">
        {companyStudents.length > 0 ? (
          companyStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onRemove={onRemove}
              isInPanel={false}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            Drag students here
          </div>
        )}
      </div>

      <div className=" flex items-center justify-between border-t pt-3 w-full">
        {companyStudents.length > 0 ? (
          <div className="text-sm text-gray-500">
            {companyStudents.length}{" "}
            {companyStudents.length === 1 ? "student" : "students"}
          </div>
        ) : (
          <div></div>
        )}
        <button
          className="mt-auto flex items-center justify-center w-fit px-4 py-2 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => console.log(`Send email to ${company.email}`)}
        >
          <FaEnvelope className="mr-2" />
          Send Email
        </button>
      </div>
    </div>
  );
};

// Student Panel Component
const StudentPanel = ({ students, sortBy, onSort }) => {
  return (
    <div className="fixed right-0 mt-4 h-full w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Students</h2>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSort(e.target.value)}
              className="appearance-none bg-gray-100 border border-gray-300 rounded pl-3 pr-8 py-1 text-sm"
            >
              <option value="scNumber">SC Number</option>
              <option value="gpa">GPA</option>
              <option value="name">Name</option>
            </select>
            <FaSort className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student.id} student={student} isInPanel={true} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            All students assigned
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
export default function Main() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sortBy, setSortBy] = useState("scNumber");
  const [companySort, setCompanySort] = useState({});

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedStudents = localStorage.getItem("internship-students");
    const savedCompanies = localStorage.getItem("internship-companies");
    const savedSort = localStorage.getItem("internship-sort");

    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
    if (savedSort) setCompanySort(JSON.parse(savedSort));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("internship-students", JSON.stringify(students));
    localStorage.setItem("internship-companies", JSON.stringify(companies));
    localStorage.setItem("internship-sort", JSON.stringify(companySort));
  }, [students, companies, companySort]);

  // Initialize with sample data if localStorage is empty
  useEffect(() => {
    if (students.length === 0 && companies.length === 0) {
      const initialStudents = [
        {
          id: 1,
          name: "John Doe",
          scNumber: "SC001",
          gpa: 3.8,
          cvLink: "/cv/1",
          companyId: null,
        },
        {
          id: 2,
          name: "Jane Smith",
          scNumber: "SC002",
          gpa: 3.5,
          cvLink: "/cv/2",
          companyId: null,
        },
        {
          id: 3,
          name: "Alice Johnson",
          scNumber: "SC003",
          gpa: 3.6,
          cvLink: "/cv/3",
          companyId: null,
        },
        {
          id: 4,
          name: "Bob Brown",
          scNumber: "SC004",
          gpa: 3.2,
          cvLink: "/cv/4",
          companyId: null,
        },
        {
          id: 5,
          name: "Charlie Wilson",
          scNumber: "SC005",
          gpa: 3.9,
          cvLink: "/cv/5",
          companyId: null,
        },
      ];

      const initialCompanies = [
        { id: 1, name: "TechCorp", email: "tech@example.com" },
        { id: 2, name: "DesignWorks", email: "design@example.com" },
        { id: 3, name: "InnoSoft", email: "info@innosoft.com" },
        { id: 4, name: "NextGen Solutions", email: "contact@nextgen.com" },
        { id: 5, name: "CodeBase", email: "hr@codebase.dev" },

        // Add more companies...
      ];

      setStudents(initialStudents);
      setCompanies(initialCompanies);
    }
  }, [students.length, companies.length]);

  const handleDrop = useCallback((studentId, companyId) => {
    setStudents((prevStudents) => {
      // Remove from any existing company first
      const updatedStudents = prevStudents.map((student) =>
        student.id === studentId ? { ...student, companyId } : student
      );
      return updatedStudents;
    });
  }, []);

  const handleRemove = useCallback((studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, companyId: null } : student
      )
    );
  }, []);

  const handleSort = useCallback((criteria) => {
    setSortBy(criteria);
    setStudents((prevStudents) =>
      [...prevStudents].sort((a, b) => {
        if (a.companyId !== b.companyId) {
          return a.companyId ? 1 : -1; // Keep assigned students at the bottom
        }
        if (criteria === "gpa") return b.gpa - a.gpa;
        if (criteria === "name") return a.name.localeCompare(b.name);
        return a.scNumber.localeCompare(b.scNumber);
      })
    );
  }, []);

  const handleSortCompany = useCallback((companyId, criteria) => {
    setCompanySort((prev) => ({ ...prev, [companyId]: criteria }));
  }, []);

  const getSortedStudents = useCallback(() => {
    const panelStudents = students.filter((s) => !s.companyId);
    const sortedPanelStudents = [...panelStudents].sort((a, b) => {
      if (sortBy === "gpa") return b.gpa - a.gpa;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.scNumber.localeCompare(b.scNumber);
    });

    const companyStudents = students.filter((s) => s.companyId);
    const sortedCompanyStudents = companyStudents
      .map((student) => {
        const sortCriteria = companySort[student.companyId] || "scNumber";
        return {
          ...student,
          sortKey:
            sortCriteria === "gpa"
              ? student.gpa
              : sortCriteria === "name"
              ? student.name
              : student.scNumber,
        };
      })
      .sort((a, b) => {
        if (a.companyId !== b.companyId) return 0; // Already grouped by company
        if (typeof a.sortKey === "number") return b.sortKey - a.sortKey;
        return a.sortKey.localeCompare(b.sortKey);
      });

    return [...sortedPanelStudents, ...sortedCompanyStudents];
  }, [students, sortBy, companySort]);

  const sortedStudents = getSortedStudents();
  const panelStudents = sortedStudents.filter((s) => !s.companyId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen">
        <div className="flex-grow p-8 mr-80">
          {" "}
          {/* Right margin for fixed panel */}
          <h1 className="text-2xl font-bold mb-8 text-center">
            SELECT INTERNSHIPS
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {companies.map((company) => (
              <CompanyBox
                key={company.id}
                company={company}
                students={sortedStudents}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onSortCompany={handleSortCompany}
              />
            ))}
          </div>
        </div>

        <StudentPanel
          students={panelStudents}
          sortBy={sortBy}
          onSort={handleSort}
        />
      </div>
    </DndProvider>
  );
}
