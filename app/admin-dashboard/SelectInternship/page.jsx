"use client";
import { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaTimes, FaInfoCircle, FaSort, FaEnvelope } from "react-icons/fa";
import EmailModal from "../../components/admin-dashboard/EmailModal";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";

// Student Component
const StudentCard = ({ student, onRemove, isInPanel, companyId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "STUDENT",
    item: { id: student.id },
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
          {isInPanel && student.companyIds.length > 0 && (
            <span className="ml-2 text-xs text-blue-600">
              (Assigned to {student.companyIds.length} company
              {student.companyIds.length !== 1 ? "s" : ""})
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href={`/cv/${student.id}`}
          className="text-gray-500 hover:text-black hover:bg-gray-100 text-sm border rounded px-[6px] py-[1px]"
          title="View CV"
          target="_blank"
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
            onClick={() => onRemove(student.id, companyId)}
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
const CompanyBox = ({
  company,
  students,
  onDrop,
  onRemove,
  onSortCompany,
  companySort,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "STUDENT",
    drop: (item) => onDrop(item.id, company.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [showEmailModal, setShowEmailModal] = useState(false);
  const companyStudents = students.filter((s) =>
    s.companyIds.includes(company.id)
  );

  const handleSendEmail = async (emailData) => {
    try {
      // Here you would call your API to send the email
      await api.post("/send-email", emailData);
      setShowEmailModal(false);
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <>
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
              value={companySort[company.id] || "scNumber"}
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
                key={`${student.id}-${company.id}`}
                student={student}
                onRemove={onRemove}
                isInPanel={false}
                companyId={company.id}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              Drag students here
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-3 w-full">
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
            onClick={() => setShowEmailModal(true)}
            disabled={companyStudents.length === 0}
          >
            <FaEnvelope className="mr-2" />
            Send Email
          </button>
        </div>
      </div>
      {showEmailModal && (
        <EmailModal
          company={company}
          students={companyStudents}
          onClose={() => setShowEmailModal(false)}
          onSend={handleSendEmail}
        />
      )}
    </>
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
export default function Main({ formId = 51 }) {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sortBy, setSortBy] = useState("scNumber");
  const [companySort, setCompanySort] = useState({});
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch companies
        const companiesResponse = await api.get(
          `preference-form/submission/companies?form_id=${formId}`
        );

        const companiesData = companiesResponse.data;

        // Fetch students
        const studentsResponse = await api.get(
          `preference-form/submission/students?form_id=${formId}`
        );

        const studentsData = studentsResponse.data;

        // Check if we have saved data in localStorage
        const savedStudents = localStorage.getItem("internship-students");
        const savedCompanies = localStorage.getItem("internship-companies");
        const savedSort = localStorage.getItem("internship-sort");

        // Use API data if no saved data exists
        if (!savedStudents || !savedCompanies) {
          setCompanies(companiesData.initialCompanies || []);
          setStudents(studentsData.initialStudents || []);
        } else {
          // Use saved data but ensure any new students/companies from API are included
          const parsedSavedStudents = JSON.parse(savedStudents);
          const parsedSavedCompanies = JSON.parse(savedCompanies);

          // Merge API students with saved students, preferring saved data
          const mergedStudents = [
            ...(studentsData.initialStudents || []).filter(
              (apiStudent) =>
                !parsedSavedStudents.some(
                  (savedStudent) => savedStudent.id === apiStudent.id
                )
            ),
            ...parsedSavedStudents,
          ];

          // Merge API companies with saved companies, preferring saved data
          const mergedCompanies = [
            ...(companiesData.initialCompanies || []).filter(
              (apiCompany) =>
                !parsedSavedCompanies.some(
                  (savedCompany) => savedCompany.id === apiCompany.id
                )
            ),
            ...parsedSavedCompanies,
          ];

          setStudents(mergedStudents);
          setCompanies(mergedCompanies);
        }

        if (savedSort) {
          const parsedSort = JSON.parse(savedSort);
          setCompanySort(parsedSort);
          if (parsedSort.global) {
            setSortBy(parsedSort.global);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading && students.length > 0 && companies.length > 0) {
      localStorage.setItem("internship-students", JSON.stringify(students));
      localStorage.setItem("internship-companies", JSON.stringify(companies));
      localStorage.setItem(
        "internship-sort",
        JSON.stringify({
          ...companySort,
          global: sortBy,
        })
      );
    }
  }, [students, companies, companySort, sortBy, loading]);

  const handleDrop = useCallback((studentId, companyId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              companyIds: [...new Set([...student.companyIds, companyId])],
            }
          : student
      )
    );
  }, []);

  const handleRemove = useCallback((studentId, companyId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              companyIds: student.companyIds.filter((id) => id !== companyId),
            }
          : student
      )
    );
  }, []);

  const handleSort = useCallback((criteria) => {
    setSortBy(criteria);
  }, []);

  const handleSortCompany = useCallback((companyId, criteria) => {
    setCompanySort((prev) => {
      const newSort = { ...prev, [companyId]: criteria };
      return newSort;
    });
  }, []);

  const getSortedStudents = useCallback(() => {
    if (loading) return [];

    // First create a copy of students to sort
    let sortedStudents = [...students];

    // Sort panel students (not assigned to any company)
    const panelStudents = sortedStudents
      .filter((s) => s.companyIds.length === 0)
      .sort((a, b) => {
        if (sortBy === "gpa") return b.gpa - a.gpa;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.scNumber.localeCompare(b.scNumber);
      });

    // Sort company students
    const companyStudents = sortedStudents
      .filter((s) => s.companyIds.length > 0)
      .map((student) => {
        // For company sorting, we need to determine which company's sort to use
        // This is a bit tricky since a student might be in multiple companies
        // We'll use the first company's sort preference as the primary sort
        const primaryCompanyId = student.companyIds[0];
        const sortCriteria = companySort[primaryCompanyId] || "scNumber";

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
        // First sort by the primary sort key
        if (typeof a.sortKey === "number") {
          if (b.sortKey !== a.sortKey) return b.sortKey - a.sortKey;
        } else {
          const nameCompare = a.sortKey.localeCompare(b.sortKey);
          if (nameCompare !== 0) return nameCompare;
        }

        // Then by student name as a secondary sort
        return a.name.localeCompare(b.name);
      });

    return [...panelStudents, ...companyStudents];
  }, [students, sortBy, companySort, loading]);

  const sortedStudents = getSortedStudents();
  const panelStudents = sortedStudents.filter((s) => s.companyIds.length === 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen">
        <div className="flex-grow p-8 mr-80">
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
                companySort={companySort}
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
