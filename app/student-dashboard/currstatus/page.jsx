"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaCircle,
  FaChevronRight,
  FaBuilding,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function CurrentStatus() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    supervisorEmail: "",
    supervisorPhone: "",
  });
  const [showCompanyForm, setShowCompanyForm] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Application Sent",
      description: "Your application has been submitted",
    },
    {
      id: 2,
      title: "Interview Call",
      description: "Received interview invitation",
    },
    {
      id: 3,
      title: "Interview Completed",
      description: "Attended the interview",
    },
    {
      id: 4,
      title: "Selection Status",
      description: "Received selection decision",
    },
    {
      id: 5,
      title: "Internship Started",
      description: "Began internship program",
    },
    {
      id: 6,
      title: "Internship Completed",
      description: "Successfully finished internship",
    },
  ];

  const handleCompanyDetailsChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusUpdate = (stepId) => {
    if (stepId === 4 && activeStep >= 4) {
      setShowCompanyForm(!showCompanyForm);
    } else {
      setActiveStep(Math.max(activeStep, stepId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Internship Progress Tracker
      </h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="relative">
            {/* Timeline */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex flex-col items-center cursor-pointer ${
                      activeStep >= step.id ? "text-blue-600" : "text-gray-400"
                    }`}
                    onClick={() => handleStatusUpdate(step.id)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        activeStep >= step.id ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      {activeStep > step.id ? (
                        <FaCheckCircle className="text-2xl text-green-500" />
                      ) : (
                        <FaCircle
                          className={`text-2xl ${
                            activeStep === step.id
                              ? "text-blue-500"
                              : "text-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        activeStep >= step.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        activeStep > step.id ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Current Status Card */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Current Status
              </h3>
              <p className="text-blue-700">
                {steps[activeStep - 1].description}
                {activeStep >= 4 && activeStep < 6 && (
                  <button
                    onClick={() => handleStatusUpdate(4)}
                    className="ml-2 text-blue-600 hover:underline flex items-center"
                  >
                    Update details <FaChevronRight className="ml-1" />
                  </button>
                )}
              </p>
            </div>

            {/* Company Details Form (Conditional) */}
            {showCompanyForm && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBuilding className="mr-2 text-blue-500" /> Company
                  Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={companyDetails.name}
                      onChange={handleCompanyDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaEnvelope className="mr-1" /> Supervisor Email
                    </label>
                    <input
                      type="email"
                      name="supervisorEmail"
                      value={companyDetails.supervisorEmail}
                      onChange={handleCompanyDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="supervisor@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaPhone className="mr-1" /> Supervisor Phone
                    </label>
                    <input
                      type="tel"
                      name="supervisorPhone"
                      value={companyDetails.supervisorPhone}
                      onChange={handleCompanyDetailsChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+94 76 123 4567"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowCompanyForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Save logic here
                        setShowCompanyForm(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Save Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              {activeStep < steps.length && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Mark as {steps[activeStep].title}
                </button>
              )}

              {activeStep === 4 && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setActiveStep(3); // Revert to "Interview Completed"
                      setShowCompanyForm(false);
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Not Selected
                  </button>
                  <button
                    onClick={() => setShowCompanyForm(true)}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  >
                    Selected - Add Company Details
                  </button>
                </div>
              )}

              {activeStep === 6 && (
                <button
                  onClick={() => router.push("/student-dashboard/feedback")}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Submit Internship Feedback
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
