"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaCircle,
  FaChevronDown,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaFileAlt,
  FaCalendarAlt,
  FaUserTie,
  FaHandshake,
  FaGraduationCap,
} from "react-icons/fa";
import exp from "constants";

export default function CurrentStatus() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    supervisorEmail: "",
    supervisorPhone: "",
  });
  const [expandedStep, setExpandedStep] = useState(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  useEffect(() => {
    console.log(expandedStep);
    console.log(activeStep);
  }, [expandedStep, activeStep]);

  const steps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your application has been successfully submitted",
      icon: <FaFileAlt className="text-blue-500" />,
      date: "2023-10-15",
      action: "No action needed",
    },
    {
      id: 2,
      title: "Interview Invitation",
      description: "You've received an interview invitation",
      icon: <FaCalendarAlt className="text-orange-500" />,
      date: "2023-10-22",
      action: "Confirm your attendance",
    },
    {
      id: 3,
      title: "Interview Completed",
      description: "You've attended the interview session",
      icon: <FaUserTie className="text-purple-500" />,
      date: "2023-10-29",
      action: "Wait for response",
    },
    {
      id: 4,
      title: "Selection Decision",
      description: "You've received the selection result",
      icon: <FaHandshake className="text-green-500" />,
      date: "2023-11-05",
      action: "Accept/decline offer",
    },
    {
      id: 5,
      title: "Internship Started",
      description: "You've begun your internship program",
      icon: <FaBuilding className="text-red-500" />,
      date: "2023-11-15",
      action: "Complete weekly logs",
    },
    {
      id: 6,
      title: "Internship Completed",
      description: "You've successfully finished your internship",
      icon: <FaGraduationCap className="text-yellow-500" />,
      date: "2024-02-15",
      action: "Submit final report",
    },
  ];

  const handleCompanyDetailsChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const updateStatus = (stepId) => {
    if (stepId <= activeStep + 1) {
      setActiveStep(stepId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Internship Journey
      </h1>

      <div className="relative">
        {/* Vertical Timeline */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative pl-10 pb-8 border-l-2 ${
                activeStep >= step.id ? "border-[#0F1D2F]" : "border-gray-200"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center -left-3 ${
                  activeStep > step.id
                    ? "bg-green-500"
                    : activeStep === step.id
                    ? "bg-[#0F1D2F]"
                    : "bg-gray-300"
                }`}
              >
                {activeStep > step.id ? (
                  <FaCheckCircle className="text-white text-sm" />
                ) : (
                  <FaCircle className="text-white text-sm" />
                )}
              </div>

              {/* Step content */}
              <div
                className={`bg-white rounded-lg shadow-sm p-5 cursor-pointer transition-all hover:shadow-md ${
                  expandedStep === step.id ? "ring-2 ring-[#0F1D2F]" : ""
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{step.icon}</div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          activeStep >= step.id
                            ? "text-gray-800"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                  <FaChevronDown
                    className={`text-gray-400 mt-1 transition-transform ${
                      expandedStep === step.id ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Expanded content */}
                {expandedStep === step.id && (
                  <div className="mt-4 pl-10 space-y-4">
                    <p className="text-gray-700">{step.description}</p>
                    <p className="text-sm font-medium text-[#0F1D2F]">
                      {step.action}
                    </p>

                    {/* Step-specific content */}
                    {step.id === 4 && activeStep >= 4 && (
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#0F1D2F] mb-3">
                          Selection Status
                        </h4>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => updateStatus(3)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                          >
                            Not Selected
                          </button>
                          <button
                            onClick={() => {
                              setShowCompanyDetails(true);
                              setExpandedStep(4.1);
                            }}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                          >
                            Selected
                          </button>
                        </div>
                      </div>
                    )}

                    {showCompanyDetails && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg animate-fadeIn">
                        <h4 className="font-medium flex items-center text-gray-800 mb-3">
                          <FaBuilding className="mr-2 text-blue-500" />
                          Company Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={companyDetails.name}
                              onChange={handleCompanyDetailsChange}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#0F1D2F] focus:border-[#0F1D2F]"
                              placeholder="Enter company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Supervisor Email
                            </label>
                            <input
                              type="email"
                              name="supervisorEmail"
                              value={companyDetails.supervisorEmail}
                              onChange={handleCompanyDetailsChange}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#0F1D2F] focus:border-[#0F1D2F]"
                              placeholder="supervisor@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Supervisor Phone
                            </label>
                            <input
                              type="tel"
                              name="supervisorPhone"
                              value={companyDetails.supervisorPhone}
                              onChange={handleCompanyDetailsChange}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#0F1D2F] focus:border-[#0F1D2F]"
                              placeholder="+94 76 123 4567"
                            />
                          </div>
                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              onClick={() => setExpandedStep(4)}
                              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                updateStatus(4);
                                setExpandedStep(4);
                              }}
                              className="px-3 py-1 bg-[#0F1D2F] text-white rounded text-sm hover:bg-[#1E3A8A]"
                            >
                              Save & Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progress controls */}
                    {step.id === activeStep && step.id < steps.length && (
                      <div className="pt-4 border-t border-gray-100">
                        <button
                          onClick={() => updateStatus(step.id + 1)}
                          className="px-4 py-2 bg-[#0F1D2F] text-white rounded-md text-sm hover:bg-[#1E3A8A]"
                        >
                          Mark as {steps[step.id].title}
                        </button>
                      </div>
                    )}

                    {step.id === 6 && activeStep === 6 && (
                      <div className="pt-4 border-t border-gray-100">
                        <button
                          onClick={() =>
                            router.push("/student-dashboard/feedback")
                          }
                          className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
                        >
                          Submit Final Feedback
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress summary */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#0F1D2F] mb-3">
            Your Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#0F1D2F] h-2.5 rounded-full"
              style={{ width: `${(activeStep / steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Completed {activeStep} of {steps.length} steps (
            {Math.round((activeStep / steps.length) * 100)}%)
          </p>
          <p className="mt-3 text-[#0F1D2F] font-medium">
            Current stage: {steps[activeStep - 1].title}
          </p>
        </div>
      </div>
    </div>
  );
}
