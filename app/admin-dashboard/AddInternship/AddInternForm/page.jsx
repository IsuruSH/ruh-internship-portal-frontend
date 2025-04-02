"use client";
import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [companies, setCompanies] = useState([]); // Store fetched companies
  const [companyId, setCompanyId] = useState(""); // Selected company ID
  const [designation, setDesignation] = useState("");
  const [duration, setDuration] = useState("3 months"); // Default time period

  const router = useRouter();
  // Fetch companies from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/company/list/names");

        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    const internshipData = { companyId, designation, duration };

    try {
      const response = await api.post("/internship", internshipData);

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/admin-dashboard/AddInternship");
      } else {
        toast.error("Error adding internship");
      }
    } catch (error) {
      toast.error("Error adding internship");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ADD INTERNSHIP DETAILS
      </h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-4xl mx-auto">
        {/* Company Dropdown */}
        <div className="mb-6">
          <label htmlFor="company" className="block text-base font-medium mb-2">
            Company Name
          </label>
          <select
            id="company"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Company</option>
            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Designation Input */}
        <div className="mb-6">
          <label
            htmlFor="designation"
            className="block text-base font-medium mb-2"
          >
            Designation
          </label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Time Period Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block text-base font-medium mb-2"
          >
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
