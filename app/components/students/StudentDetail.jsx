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

export default function StudentDetail({ studentId }) {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      // Mock data - replace with API call
      const mockStudent = {
        id: studentId,
        name: `Student ${studentId.substring(2)}`,
        email: `${studentId.toLowerCase()}@university.edu`,
        phone: `07${Math.floor(Math.random() * 90000000) + 10000000}`,
        gpa: (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2),
        status: ["Active", "Inactive", "Graduated", "On Leave"][
          Math.floor(Math.random() * 4)
        ],
        registeredDate: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
        address: `${Math.floor(Math.random() * 100) + 1} Main Street, City`,
        cv: `https://example.com/cv/${studentId.toLowerCase()}.pdf`,
        courses: Array.from({ length: 5 }, (_, i) => ({
          code: `CS${Math.floor(Math.random() * 400) + 100}`,
          name: `Course ${i + 1}`,
          grade: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
          semester: `Semester ${Math.floor(Math.random() * 8) + 1}`,
        })),
      };
      setStudent(mockStudent);
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
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Students
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 mb-4">
                {student.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {student.name}
              </h2>
              <p className="text-gray-600">{student.id}</p>
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
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="text-gray-500 mr-3" />
                <span>Registered: {student.registeredDate}</span>
              </div>
              <div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${
                    student.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : student.status === "Graduated"
                      ? "bg-blue-100 text-blue-800"
                      : student.status === "On Leave"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">{student.address}</p>
            </div>

            <div className="mt-6">
              <a
                href={student.cv}
                download
                className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
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
              <div>
                <p className="text-sm text-gray-500">Credits Completed</p>
                <p className="text-2xl font-bold">
                  {Math.floor(Math.random() * 120) + 30}
                </p>
              </div>
            </div>

            <h4 className="font-medium text-gray-800 mb-3">Current Courses</h4>
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
                      Semester
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.courses.map((course, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {course.code}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {course.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {course.semester}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            course.grade === "A"
                              ? "bg-green-100 text-green-800"
                              : course.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : course.grade === "C"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
