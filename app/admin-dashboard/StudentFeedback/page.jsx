"use client";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaExclamationTriangle, FaSync } from "react-icons/fa";
import axios from "axios"
import toast from "react-hot-toast";

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080/api/feedback/all";

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        const formattedData = response.data.map(item => ({
          id: item.feedbackId || item.feedback_id,
          scNumber: item.scNumber || item.sc_number,
          companyName: item.companyName || item.company_name,
          feedback: item.feedback || item.feedbackNotes || item.feedback_notes,
          submittedAt: item.submittedAt || item.submit_at || item.date
        }));
        
        console.log("Formatted Data:", formattedData);
        setFeedbacks(formattedData);
      } else {
        setError("API returned empty array or invalid data structure");
        console.error("Unexpected data format:", response.data);
      }
    } catch (err) {
      console.error("API Error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(`Failed to load data: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (feedback.scNumber?.toLowerCase().includes(searchLower)) ||
      (feedback.companyName?.toLowerCase().includes(searchLower)) ||
      (feedback.feedback?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="flex-grow p-4 md:p-8 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Student Internship Feedbacks
        </h1>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by SC number, company, or feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <p>{error}</p>
            </div>
            <button
              onClick={fetchFeedbacks}
              className="mt-3 flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <FaSync className="mr-2" /> Retry
            </button>
          </div>
        )}

        {/* Data Display */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Loading feedback data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredFeedbacks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        SC Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Feedback
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFeedbacks.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {feedback.scNumber || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {feedback.companyName || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 max-w-xs">
                            {feedback.feedback || "No feedback provided"}
                          </div>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <FaUser className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  {feedbacks.length === 0 
                    ? "No feedback records found" 
                    : "No matching records found"}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDashboard;