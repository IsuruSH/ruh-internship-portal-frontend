"use client";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCamera } from "react-icons/fa";
import SpiderWebChart from "../../components/student-dashboard/layouts/SpiderWeb";
import ResultsTable from "../../components/student-dashboard/layouts/ResultsTable";

const Page = () => {
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phone: "",
    projects: "",
    cv1: null,
    cv2: null,
    profileImage: null,
    profilePreview: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value, // Handle file input
    }));

    if (id === "profileImage" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prevData) => ({ ...prevData, profilePreview: imageUrl }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">USER PROFILE</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <label htmlFor="profileImage" className="relative cursor-pointer">
            <img
              src={formData.profilePreview || ""}
              alt="Profile"
              className="rounded-full w-20 h-20 mr-6 border border-gray-300 object-cover"
            />
            <FaCamera className="absolute bottom-0 right-0 bg-white p-1 rounded-full text-gray-700 text-xl" />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p>SC/20XX/XXXXX</p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-base font-medium mb-2">
            Address
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <FaMapMarkerAlt className="text-gray-500 ml-2" />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border-0 ml-2"
            />
          </div>
        </div>

        <div className="flex mb-6">
          <div className="w-1/2 pr-2">
            <label htmlFor="email" className="block text-base font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaEnvelope className="text-gray-500 ml-2" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-0 ml-2"
              />
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="phone" className="block text-base font-medium mb-2">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <FaPhone className="text-gray-500 ml-2" />
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border-0 ml-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="projects"
            className="block text-base font-medium mb-2"
          >
            Projects
          </label>
          <input
            type="text"
            id="projects"
            value={formData.projects}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-red-600 mr-4">
            Cancel
          </button>
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="flex mb-6">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="currentPassword"
              className="block text-base font-medium mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label
              htmlFor="newPassword"
              className="block text-base font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-base font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-end">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-red-600 mr-4">
            Cancel
          </button>
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>

        <div className="mb-8">
          <SpiderWebChart />
        </div>
        <div className="mb-8">
          <ResultsTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
