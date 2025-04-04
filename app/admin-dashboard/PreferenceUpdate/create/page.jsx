// app/preferences/create/page.js

"use client";
import CreatePreferenceForm from "../../../components/admin-dashboard/preferenceupdate/CreatePreferenceForm";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreatePreferencePage() {
  const router = useRouter();
  const handleSave = async (formData) => {
    console.log("Form data to save:", formData);
    // Here you would typically:
    // 1. Save to your API
    // 2. Redirect to the preferences list
    // 3. Show success message

    const response = await api.post("/preference-form", formData);
    if (response.status === 201) {
      toast.success("Form created successfully!");
      router.push("/admin-dashboard/PreferenceUpdate");
    } else {
      toast.error("Error saving preference");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <CreatePreferenceForm onSave={handleSave} />
      </div>
    </div>
  );
}
