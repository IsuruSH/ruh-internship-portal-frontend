"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiEdit, FiDownload } from "react-icons/fi";

export default function InternshipDetail({ internshipId }) {
  const [internship, setInternship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with API call
  useEffect(() => {
    const fetchInternship = async () => {
      setIsLoading(true);
      // Mock data
      const mockInternship = {
        id: internshipId,
        studentId: `SC${Math.floor(Math.random() * 100) + 100}`,
        studentName: `Student ${internshipId.substring(3)}`,
        studentEmail: `sc${internshipId.substring(3)}@university.edu`,
        company: `Company ${
          ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]
        }`,
        companyAddress: `${
          Math.floor(Math.random() * 100) + 1
        } Business Ave, City`,
        position: ["Developer", "Designer", "Analyst", "Tester"][
          Math.floor(Math.random() * 4)
        ],
        startDate: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
        endDate: new Date(Date.now() + Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
        status: ["Active", "Completed", "Terminated"][
          Math.floor(Math.random() * 3)
        ],
        supervisor: `Supervisor ${internshipId.substring(3)}`,
        supervisorEmail: `supervisor${internshipId.substring(3)}@company.com`,
        supervisorPhone: `07${Math.floor(Math.random() * 90000000) + 10000000}`,
        evaluation:
          Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : null,
        evaluationComments:
          Math.random() > 0.5
            ? "The student has shown excellent progress and technical skills during the internship period."
            : null,
        report: `test.pdf`,
      };
      setInternship(mockInternship);
      setIsLoading(false);
    };

    fetchInternship();
  }, [internshipId]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading internship details...</div>;
  }

  if (!internship) {
    return <div className="p-8 text-center">Internship not found</div>;
  }

  return (
    <div className="p-6 mt-10 mr-3">
      <Link
        href="/admin-dashboard/internships"
        className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A] mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Internships
      </Link>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {internship.position} at {internship.company}
            </h2>
            <p className="text-gray-600">
              {internship.studentName} ({internship.studentId})
            </p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full 
            ${
              internship.status === "Active"
                ? "bg-green-100 text-green-800"
                : internship.status === "Completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {internship.status}
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Student Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Student Name</p>
                <p className="font-medium">{internship.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{internship.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Student Email</p>
                <p className="font-medium">{internship.studentEmail}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Internship Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{internship.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{internship.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {internship.startDate} to {internship.endDate}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Supervisor Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Supervisor Name</p>
                <p className="font-medium">{internship.supervisor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supervisor Email</p>
                <p className="font-medium">{internship.supervisorEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supervisor Phone</p>
                <p className="font-medium">{internship.supervisorPhone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Evaluation
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                {internship.evaluation ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < internship.evaluation
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Not yet evaluated</p>
                )}
              </div>
              {internship.evaluationComments && (
                <div>
                  <p className="text-sm text-gray-500">Comments</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {internship.evaluationComments}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <a
            href={internship.report}
            download
            className="flex items-center bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded-md "
          >
            <FiDownload className="mr-2" /> Download Final Report
          </a>
          <button className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            <FiEdit className="mr-2" /> Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}
