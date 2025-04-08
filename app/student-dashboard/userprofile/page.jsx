"use client";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCamera,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaGraduationCap,
  FaFilePdf,
} from "react-icons/fa";
import SpiderWebChart from "../../components/student-dashboard/layouts/SpiderWeb";
import ResultsTable from "../../components/student-dashboard/layouts/ResultsTable";
import { useUser } from "../../context/UserContext";
import api from "../../lib/axios";

const Page = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    contact_number: "",
    profileImage: null,
    profilePreview: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const user = useUser();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`/student/${user.id}`);
        const data = response.data;
        setStudentData(data);
        setFormData({
          address: data.address || "",
          email: data.email || "",
          contact_number: data.contact_number || "",
          profilePreview: data.profileImage || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    if (user.id) {
      fetchStudentData();
    }
  }, [user.id]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value,
    }));

    if (id === "profileImage" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prevData) => ({ ...prevData, profilePreview: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("address", formData.address);
      formPayload.append("email", formData.email);
      formPayload.append("contact_number", formData.contact_number);
      if (formData.profileImage) {
        formPayload.append("profileImage", formData.profileImage);
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/student/${user.id}`,
        {
          method: "PUT",
          body: formPayload,
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setStudentData(updatedData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCvUpload = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      if (cvFile) {
        formPayload.append("cv", cvFile);
      }

      const response = await api.put(`/student/${user.id}/cv`, formPayload);
      if (response.ok) {
        const updatedData = await response.json();
        setStudentData(updatedData);
        setCvFile(null);
      }
    } catch (error) {
      console.error("Error updating CV:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <p className="text-red-500">Error loading student data</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Student Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
          <div className="md:flex">
            {/* Profile Image Section */}
            <div className="md:w-1/3 p-6 bg-gray-50 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {formData.profilePreview ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${formData.profilePreview}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <FaUser className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
                {editMode && (
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
                  >
                    <FaCamera className="text-blue-600" />
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {studentData.first_name} {studentData.last_name}
              </h2>
              <p className="text-gray-600 mb-4">{studentData.student_id}</p>

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#0F1D2F] text-white rounded-lg hover:bg-gradient-to-r from-[#0F1D2F] to-[#1E3A8A] transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 p-6">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FaUser className="text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {studentData.first_name}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FaUser className="text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {studentData.last_name}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Student ID
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FaIdCard className="text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {studentData.student_id}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Academic Year
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {studentData.academic_year}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none focus:ring-0 text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="contact_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="flex items-center p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                        <FaPhone className="text-gray-400 mr-2" />
                        <input
                          type="tel"
                          id="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none focus:ring-0 text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="flex items-center p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Curriculum Vitae
                    </label>
                    {studentData.cvLink && (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 mr-2" />
                        <a
                          href={`${process.env.NEXT_PUBLIC_SERVER_URL}${studentData.cvLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current CV
                        </a>
                      </div>
                    )}
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCvFile(e.target.files[0])}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {/* <button
                      type="button"
                      onClick={handleCvUpload}
                      className="mt-2 px-4 py-2 bg-[#0F1D2F] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
                      disabled={!cvFile}
                    >
                      Upload New CV
                    </button> */}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setFormData({
                          address: studentData.address || "",
                          email: studentData.email || "",
                          contact_number: studentData.contact_number || "",
                          profilePreview: studentData.profileImage || "",
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2  text-white rounded-lg bg-[#0F1D2F] hover:bg-[#1E3A8A] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaIdCard className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Student ID</p>
                        <p className="font-medium">{studentData.student_id}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaCalendarAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Academic Year</p>
                        <p className="font-medium">
                          {studentData.academic_year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{studentData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">
                          {studentData.contact_number}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium">
                        {studentData.address || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaGraduationCap className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">GPA</p>
                      <p className="font-medium">
                        {studentData.gpa || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaFilePdf className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Curriculum Vitae</p>
                      {studentData.cvLink ? (
                        <a
                          href={`${process.env.NEXT_PUBLIC_SERVER_URL}${studentData.cvLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          View CV
                        </a>
                      ) : (
                        <p className="font-medium text-gray-500">
                          No CV uploaded
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Performance Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Academic Performance
          </h2>
          <div className="mb-8">
            <SpiderWebChart />
          </div>
          <div>
            <ResultsTable results={studentData.resultsByYear} />
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-xl shadow overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Change Password
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mr-3"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white rounded-lg transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
