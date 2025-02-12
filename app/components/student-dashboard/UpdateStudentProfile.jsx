"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/axios";
import { useUser } from "../../student-dashboard/context/UserContext";

export default function Home() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    contact_number: "",
    academic_year: "",
    gpa: "",
    profileImage: null,
    resultSheet: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "profileImage" && file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePreview(imageUrl);
      setFormData({ ...formData, profileImage: file });
    }
    if (fileType === "resultSheet" && file?.type === "application/pdf") {
      setFormData({ ...formData, resultSheet: file });
    } else if (fileType === "resultSheet") {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate an API call to update student details
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await api.put(
        `/api/v1/student/${user.id}`,
        formDataToSend
      );
      console.log(response.data);
    } catch (error) {}

    router.push("/student-dashboard/userprofile"); // Redirect after submission
  };

  return (
    <div className="font-sans max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-lg ">
      <h1 className="text-2xl font-bold mb-2">Update Your Profile</h1>
      <p className="text-gray-600 mb-6">
        {currentDateTime.toLocaleDateString()}{" "}
        {currentDateTime.toLocaleTimeString()}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="text-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-200 flex items-center justify-center">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-2xl">+</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profileImage")}
          />
        </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Your First Name"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Your Last Name"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            rows="3"
            required
          />
        </div>

        {/* Contact Number & Academic Year */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="Your Contact Number"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              pattern="\d{10}"
              title="Enter a valid 10-digit phone number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Academic Year
            </label>
            <input
              type="text"
              name="academic_year"
              value={formData.academic_year}
              onChange={handleChange}
              placeholder="20XX/XX"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
        </div>

        {/* GPA & CV Upload */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="Your GPA"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CV (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "resultSheet")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 p-2"
            />
            {formData.resultSheet && (
              <p className="text-sm text-gray-600 mt-2">
                Uploaded: {formData.resultSheet.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#0F1D2F] text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
