"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, User, Mail, Home, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import api from "../../../lib/axios";

const StudentHoverCard = ({ studentId, children }) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && !studentData) {
      fetchStudentData();
    }
  }, [isHovered, studentData]);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/student/${studentId}`);
      setStudentData(response.data);
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverEnd}
        >
          {children}
        </span>
      </HoverCardTrigger>

      {isHovered && (
        <HoverCardContent
          className="w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto"
          align="start"
          sideOffset={5}
          collisionPadding={20}
        >
          {loading ? (
            <div className="p-4 text-center">Loading student data...</div>
          ) : studentData ? (
            <div className="p-4 space-y-4">
              {/* Student Header */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={studentData.profileImage}
                    className="rounded-full border border-gray-300"
                  />
                  <AvatarFallback className="bg-gray-100 rounded-full flex items-center justify-center h-16 w-16">
                    <User className="h-8 w-8 text-gray-400" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-bold">
                    {studentData.first_name} {studentData.last_name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {studentData.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {studentData.student_id} | GPA: {studentData.gpa}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{studentData.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{studentData.contact_number}</span>
                </div>
              </div>

              {/* Academic Results Table */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Academic Results
                </h4>

                <div className="space-y-4">
                  {studentData.resultsByYear?.map((yearData) => (
                    <div key={yearData.year} className="border-t pt-2">
                      <h5 className="font-medium mb-2">Year {yearData.year}</h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {yearData.subjects.map((subject) => (
                              <tr key={subject.subject_code}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {subject.subject_name}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {subject.subject_code}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {subject.is_core ? "Core" : "Optional"}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">
                                  <span
                                    className={`font-bold ${
                                      subject.grade === "A+"
                                        ? "text-green-600"
                                        : subject.grade === "F"
                                        ? "text-red-600"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    {subject.grade}
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
              </div>
            </div>
          ) : (
            <div className="p-4 text-red-500">Failed to load student data</div>
          )}
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default StudentHoverCard;
