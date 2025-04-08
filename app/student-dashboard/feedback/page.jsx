"use client";
import { useState, useEffect } from "react";
import savefeedback from "../../api/feedbackapi.js";
import { useUser } from "../../context/UserContext";

export default function Feedback() {
  const [scNumber, setScNumber] = useState("");
  const [company, setCompany] = useState("");
  const [feedback, setFeedback] = useState("");
  const user = useUser();

  useEffect(() => {
    if (user?.student_id) {
      setScNumber(user.student_id);
    }
  }, [user]);

  const feedbackData = {
    sc_number: scNumber,
    company_name: company,
    feedback: feedback,
  };

  const handleSaveChanges = () => {
    console.log(feedbackData);
    savefeedback(feedbackData);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Internship Feedback</h1>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
          <p className="text-gray-600 mb-8 text-center">
            Share your valuable experience after completing the internship
          </p>

          <div className="space-y-6">
            {/* SC Number */}
            <div>
              <label htmlFor="sc_no" className="block text-sm font-medium text-gray-700 mb-2">
                SC Number
              </label>
              <input
                type="text"
                id="sc_no"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={scNumber}
                readOnly
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Where did you complete your internship?"
              />
            </div>

            {/* Feedback */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none min-h-[150px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Share your experience, what you learned, and any suggestions..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveChanges}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}