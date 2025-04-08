"use client";
import { useState, useEffect } from "react";
import {
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";
import api from "../../lib/axios"; // Adjust the import based on your project structure
import Image from "next/image";

export default function StudentDetail({ studentId }) {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      const res = await api.get(`/student/${studentId}`);
      // Mock data - replace with API call
      console.log("Fetched data:", res.data);
      setStudent(res.data);
      setIsLoading(false);
    };

    fetchStudent();
  }, [studentId]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading student details...</div>;
  }

  if (!student) {
    return <div className="p-8 text-center">Student not found</div>;
  }

  return (
    <div className="p-6">
      <Link
        href="/admin-dashboard/students"
        className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A]  mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Students
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 mb-4">
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${student.profileImage}`} // Default avatar if no image is provided
                  alt="Student Avatar"
                  width={96}
                  height={96}
                  className="rounded-full "
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-gray-600">{student.student_id}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <FiMail className="text-gray-500 mr-3" />
                <a
                  href={`mailto:${student.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {student.email}
                </a>
              </div>
              <div className="flex items-center">
                <FiPhone className="text-gray-500 mr-3" />
                <span>{student.contact_number}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="text-gray-500 mr-3" />
                <span>Academic Year: {student.academic_year}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">{student.address}</p>
            </div>

            <div className="mt-6">
              <a
                href={`${process.env.NEXT_PUBLIC_SERVER_URL}${student.cvLink}`}
                download
                className="flex items-center justify-center w-full bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white py-2 rounded-md "
                target="_blank"
              >
                <FiDownload className="mr-2" /> Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">GPA</p>
                <p className="text-2xl font-bold">{student.gpa}</p>
              </div>
            </div>

            <h4 className="font-medium text-gray-800 mb-3">Current Courses</h4>
            {student?.resultsByYear?.map((subjects, yearIndex) => (
              <div key={yearIndex} className="mb-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-2">
                  Year {yearIndex + 1}
                </h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Core
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subjects.subjects?.map((subject, subjectIndex) => (
                        <tr key={subjectIndex}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                            {subject.subject_code}{" "}
                            {/* Changed from course.code */}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {subject.subject_name}{" "}
                            {/* Changed from course.name */}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {subject.is_core ? "Yes" : "No"}{" "}
                            {/* Changed from course.semester */}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    subject.grade === "A"
                      ? "bg-green-100 text-green-800"
                      : subject.grade === "B"
                      ? "bg-blue-100 text-blue-800"
                      : subject.grade === "C"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                            >
                              {subject.grade} {/* Changed from course.grade */}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Internship Information
            </h3>
            {Math.random() > 0.5 ? (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">Tech Solutions Inc.</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-medium">Software Developer Intern</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">2023-05-15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">2023-08-15</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Supervisor Evaluation
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-700">
                      "Student has shown excellent progress and technical skills
                      during the internship period."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No internship record found for this student</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
