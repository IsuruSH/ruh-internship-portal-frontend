// components/Home.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js uses its own router hook

export default function Home() {
  const [profileImage, setProfileImage] = useState(null);
  const [resultSheet, setResultSheet] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); // Next.js router

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleResultSheetChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResultSheet(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

    // Use Next.js router to navigate
    router.push("/userprofile");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="font-sans max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Welcome</h1>
      <p className="text-gray-600 mb-6">
        {currentDateTime.toLocaleDateString()}{" "}
        {currentDateTime.toLocaleTimeString()}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gray-200 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
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
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="Your First Name"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Your Last Name"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
              required
            />
          </div>
        </div>

        <div className="mb-7">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            placeholder="Your Address"
            className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Your Contact Number"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Academic Year
            </label>
            <input
              type="text"
              placeholder="20XX/XX"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current GPA
            </label>
            <input
              type="text"
              placeholder="Your GPA"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CV
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResultSheetChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 h-9"
            />
            {resultSheet && (
              <p className="text-sm text-gray-600 mt-3">
                Uploaded: {resultSheet.name}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#0F1D2F] text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-9"
        >
          Submit
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg mx-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              Form Submitted
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Your form has been submitted successfully!
            </p>
            <button
              onClick={closePopup}
              className="w-full py-2 px-4 bg-[#0F1D2F] text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
