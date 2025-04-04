// components/CreatePreferenceForm.js
"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, X, Save } from "lucide-react";
import Link from "next/link";
import api from "../../../lib/axios"; // Adjust the import based on your project structure
import toast from "react-hot-toast";

export default function CreatePreferenceForm({ onSave }) {
  const [formData, setFormData] = useState({
    batch: "",
    instructions:
      "Select your preferred companies for internship. You must choose one company from each preference.",
    deadline: "",
    preferences: [{ name: "Preference 1", companies: [] }],
  });

  const [allCompanies, setAllCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [activePreferenceIndex, setActivePreferenceIndex] = useState(0);

  const fetchCompanies = async () => {
    try {
      // Fetch companies from the backend
      const response = await api.get("/company/list/names");
      setAllCompanies(response.data.companies);
      setFilteredCompanies(response.data.companies);
    } catch (error) {
      toast.error("Error fetching companies");
    }
  };

  // Fetch companies from API
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filter companies based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCompanies(allCompanies);
    } else {
      setFilteredCompanies(
        allCompanies.filter((company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allCompanies]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceNameChange = (index, value) => {
    const updatedPreferences = [...formData.preferences];
    updatedPreferences[index].name = value;
    setFormData((prev) => ({ ...prev, preferences: updatedPreferences }));
  };

  const addCompanyToPreference = (companyId) => {
    const updatedPreferences = [...formData.preferences];
    if (
      !updatedPreferences[activePreferenceIndex].companies.includes(companyId)
    ) {
      updatedPreferences[activePreferenceIndex].companies.push(companyId);
      setFormData((prev) => ({ ...prev, preferences: updatedPreferences }));
    }
  };

  const removeCompanyFromPreference = (prefIndex, companyId) => {
    const updatedPreferences = [...formData.preferences];
    updatedPreferences[prefIndex].companies = updatedPreferences[
      prefIndex
    ].companies.filter((id) => id !== companyId);
    setFormData((prev) => ({ ...prev, preferences: updatedPreferences }));
  };

  const addNewPreference = () => {
    setFormData((prev) => ({
      ...prev,
      preferences: [
        ...prev.preferences,
        { name: `Preference ${prev.preferences.length + 1}`, companies: [] },
      ],
    }));
    setActivePreferenceIndex(formData.preferences.length);
  };

  const removePreference = (index) => {
    if (formData.preferences.length > 1) {
      const updatedPreferences = formData.preferences.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({ ...prev, preferences: updatedPreferences }));
      setActivePreferenceIndex(
        Math.min(activePreferenceIndex, updatedPreferences.length - 1)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.batch || !formData.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    if (typeof onSave === "function") {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Preference Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch* <span className="text-gray-500">(e.g., 2020/21)</span>
            </label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline*
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Preferences Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Preferences</h3>
            <button
              type="button"
              onClick={addNewPreference}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Preference
            </button>
          </div>

          {/* Preference Tabs */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {formData.preferences.map((pref, index) => (
              <div
                key={index}
                type="button"
                onClick={() => setActivePreferenceIndex(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activePreferenceIndex === index
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {pref.name}
                {formData.preferences.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePreference(index);
                    }}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Active Preference Content */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preference Name
              </label>
              <input
                type="text"
                value={formData.preferences[activePreferenceIndex].name}
                onChange={(e) =>
                  handlePreferenceNameChange(
                    activePreferenceIndex,
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search and Add Companies
              </label>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Only show company list when there's a search term */}
              {/* max-h-60 overflow-y-auto border border-gray-200 rounded-lg */}
              {searchTerm && (
                <div className="absolute z-50 w-[50%] mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-y-auto ">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => {
                          addCompanyToPreference(company.id);
                          setSearchTerm("");
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center gap-8"
                      >
                        <span>{company.name}</span>
                        {formData.preferences[
                          activePreferenceIndex
                        ].companies.includes(company.id) && (
                          <span className="text-green-500 text-sm">Added</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-center">
                      No companies found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Companies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Companies (
                {formData.preferences[activePreferenceIndex].companies.length})
              </label>
              {formData.preferences[activePreferenceIndex].companies.length >
              0 ? (
                <div className="space-y-2 grid md:grid-cols-4 grid-cols-2 space-x-2">
                  {formData.preferences[activePreferenceIndex].companies.map(
                    (companyId) => {
                      const company = allCompanies.find(
                        (c) => c.id === companyId
                      );
                      return company ? (
                        <div
                          key={companyId}
                          className="flex justify-between items-center bg-white p-2 rounded border border-gray-200"
                        >
                          <span>{company.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              removeCompanyFromPreference(
                                activePreferenceIndex,
                                companyId
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : null;
                    }
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-sm py-2">
                  No companies selected yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end space-x-4">
          <Link
            href="/admin-dashboard/PreferenceUpdate" // Or wherever you want to navigate back to
            className="inline-flex justify-center items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex justify-center items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </button>
        </div>
      </form>
    </div>
  );
}
