"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import api from "../../lib/axios";
import { Clock, AlertCircle, CheckCircle, CalendarOff } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MainContent() {
  const [batch, setBatch] = useState(null);
  const [preferenceForm, setPreferenceForm] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [timeLeft, setTimeLeft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useUser();

  // Fetch student batch
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/student/${user.id}`);
        setBatch(response.data.academic_year);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching batch data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user.id]);

  // Fetch preference form for batch and check submission status

  useEffect(() => {
    if (!batch) return;

    async function fetchData() {
      try {
        // First fetch the form data
        const formResponse = await api.get(
          `/preference-form/batch/batch?batch=${batch}`
        );
        const formData = formResponse.data?.forms || null;
        setPreferenceForm(formData);

        if (formData) {
          initializeCountdown(formData.deadline);

          // Then check for existing submission
          const submissionResponse = await api.get(
            `/preference-form/submission/check?student_id=${user.id}&form_id=${formData.id}`
          );

          // If already submitted, set the selected companies and disable form
          if (submissionResponse.data?.submitted) {
            setHasSubmitted(true);
            const initialSelected = {};
            submissionResponse.data.preferences.forEach((pref) => {
              initialSelected[pref.preference_id] = pref.company_id;
            });
            setSelectedCompanies(initialSelected);
          }
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [batch, user.id]);

  // Initialize countdown timer
  const initializeCountdown = (deadline) => {
    if (!deadline) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(deadline);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Deadline passed");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  };

  // Handle company selection (only if not submitted)
  const handleSelectCompany = (prefId, companyId) => {
    if (hasSubmitted) return;
    setSelectedCompanies((prev) => ({
      ...prev,
      [prefId]: companyId,
    }));
  };

  // Submit preferences
  const handleSubmit = async () => {
    if (hasSubmitted) return;

    try {
      if (
        preferenceForm.Preferences.some((pref) => !selectedCompanies[pref.id])
      ) {
        toast.error("Please select one company from each preference");
        return;
      }

      const submission = {
        student_id: user.id,
        form_id: preferenceForm.id,
        preferences: Object.entries(selectedCompanies).map(
          ([prefId, companyId]) => ({
            preference_id: Number(prefId),
            company_id: Number(companyId),
          })
        ),
      };

      const response = await api.post(
        `/preference-form/${preferenceForm.id}/submit`,
        submission
      );
      if (response.status === 200) {
        toast.success("Preferences submitted successfully!");
        setHasSubmitted(true);
      }
    } catch (error) {
      toast.error("Failed to submit preferences");
      console.error("Submission error:", error);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!preferenceForm) {
    return <NoFormsAvailable batch={batch} />;
  }

  return (
    <div className="flex-grow p-8 overflow-y-auto">
      <div className="bg-white p-8 shadow-sm rounded-lg w-full max-w-6xl mx-auto">
        {/* Header with countdown */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Internship Preferences</h1>
            <p className="text-gray-600">Batch: {preferenceForm.batch}</p>
          </div>
          <div className="flex items-center bg-red-50 px-4 py-2 rounded-lg mt-4 md:mt-0">
            <Clock className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-medium text-red-700">
              Deadline: {new Date(preferenceForm.deadline).toLocaleDateString()}{" "}
              • {timeLeft}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Instructions</h3>
              <p className="text-yellow-700">{preferenceForm.instructions}</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          {preferenceForm.Preferences.map((preference) => (
            <PreferenceSection
              key={preference.id}
              preference={preference}
              selectedCompanies={selectedCompanies}
              handleSelectCompany={handleSelectCompany}
              hasSubmitted={hasSubmitted}
            />
          ))}
        </div>

        {/* Submission */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={hasSubmitted}
            className={`w-full md:w-auto px-6 py-3 rounded-lg transition-colors ${
              hasSubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0F1D2F] text-white hover:bg-blue-700"
            }`}
          >
            {hasSubmitted ? "Already Submitted" : "Submit Preferences"}
          </button>
          <p
            className={`text-sm mt-2 ${
              hasSubmitted ? "text-gray-500 font-thin" : "text-gray-500"
            }`}
          >
            {hasSubmitted
              ? "Your preferences have been successfully submitted."
              : "You can not change your selections after submitting"}
          </p>
        </div>
      </div>
    </div>
  );
}

// Extracted Components for better readability

const LoadingState = () => (
  <div className="flex-grow p-8 overflow-y-auto">
    <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-40 bg-gray-100 rounded mt-6"></div>
      </div>
    </div>
  </div>
);

const NoFormsAvailable = ({ batch }) => (
  <div className="flex-grow p-2 overflow-y-auto">
    <div className="bg-white p-8 rounded-lg w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
          <CalendarOff className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          No Forms Available
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          There are currently no preference forms available for your batch (
          {batch}).
        </p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              What you can do
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Check back later for new forms</li>
                <li>Contact your department coordinator</li>
                <li>Review internship guidelines in the meantime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PreferenceSection = ({
  preference,
  selectedCompanies,
  handleSelectCompany,
  hasSubmitted,
}) => (
  <div className="border border-gray-200 rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{preference.name}</h2>
    <p className="text-gray-600 mb-4">Select one company:</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {preference.Companies.map((company) => (
        <CompanyOption
          key={company.id}
          company={company}
          preference={preference}
          selectedCompanies={selectedCompanies}
          handleSelectCompany={handleSelectCompany}
          hasSubmitted={hasSubmitted}
        />
      ))}
    </div>
  </div>
);

const CompanyOption = ({
  company,
  preference,
  selectedCompanies,
  handleSelectCompany,
  hasSubmitted,
}) => (
  <div
    onClick={() =>
      !hasSubmitted && handleSelectCompany(preference.id, company.id)
    }
    className={`p-4 border rounded-lg transition-all ${
      selectedCompanies[preference.id] === company.id
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200"
    } ${
      !hasSubmitted
        ? "cursor-pointer hover:border-blue-300 hover:bg-blue-50/50"
        : "cursor-default"
    }`}
  >
    <div className="flex items-center">
      <div
        className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
          selectedCompanies[preference.id] === company.id
            ? "bg-blue-500 border-blue-500"
            : "border-gray-300"
        }`}
      >
        {selectedCompanies[preference.id] === company.id && (
          <CheckCircle className="w-3 h-3 text-white" />
        )}
      </div>
      <span className="font-medium">{company.name}</span>
    </div>
  </div>
);
