// app/preferences/edit/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CreatePreferenceForm from "../../../../components/admin-dashboard/preferenceupdate/CreatePreferenceForm";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

export default function EditPreferencePage() {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing form data
  useEffect(() => {
    async function fetchFormData() {
      try {
        setIsLoading(true);
        console.log("Fetching form data for ID:", params.id);
        const response = await api.get(`/preference-form/${params.id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to load form");
        router.push("/admin-dashboard/PreferenceUpdate");
      } finally {
        setIsLoading(false);
      }
    }
    fetchFormData();
  }, [params.id, router]);

  const handleSave = async (formData) => {
    try {
      const response = await api.put(`/preference-form/${params.id}`, formData);
      if (response.status === 200) {
        toast.success("Form updated successfully!");
        router.push("/admin-dashboard/PreferenceUpdate");
      } else {
        toast.error("Error updating form");
      }
    } catch (error) {
      toast.error("Failed to update form");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">Loading form data...</div>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">Form not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Preference Form</h1>
        <CreatePreferenceForm
          onSave={handleSave}
          initialData={initialData}
          isEditMode={true}
        />
      </div>
    </div>
  );
}
