"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaUserTie, FaBuilding, FaIdBadge, FaUser, FaFilePdf } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import saveinternshipdetails from "../../api/internshipapi.js";
import { useUser } from "../../context/UserContext";

export default function AboutInternship() {
  const [scNumber, setScNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [appointmentLetter, setAppointmentLetter] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [supervisorName, setSupervisorName] = useState("");
  const user = useUser();

  useEffect(() => {
    if (user?.student_id) {
      setScNumber(user.student_id);
    }
  }, [user]);

  const handleClearForm = () => {
    setEmail("");
    setPhoneNumber("");
    setCompany("");
    setDesignation("");
    setAppointmentLetter(null);
    setStartDate(null);
    setEndDate(null);
    setSupervisorName("");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const internshipData = {
      sc_number: scNumber,
      email,
      phoneNumber: phoneNumber,
      company,
      designation,
      appointment_letter_pdf: appointmentLetter,
      start_date: startDate,
      end_date: endDate,
      supervisor_name: supervisorName,
    };

    saveinternshipdetails(internshipData);
    console.log("Form data saved:", internshipData);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          About Your Internship
        </h1>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSaveChanges}>
            {/* SC Number */}
            <div className="mb-6">
              <label htmlFor="scNumber" className="block text-sm font-medium text-gray-700 mb-2">
                SC Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdBadge className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="scNumber"
                  value={scNumber}
                  onChange={(e) => setScNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  readOnly
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserTie className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Appointment Letter */}
            <div className="mb-6">
              <label htmlFor="appointmentLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Letter (PDF)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <FaFilePdf className="text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      {appointmentLetter ? 
                        <span className="font-medium text-blue-600">{appointmentLetter.name}</span> : 
                        'Click to upload or drag and drop'}
                    </p>
                  </div>
                  <input 
                    id="appointmentLetter" 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => setAppointmentLetter(e.target.files[0])}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholderText="Select start date"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate || new Date()}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholderText="Select end date"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Supervisor */}
            <div className="mb-8">
              <label htmlFor="supervisorName" className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="supervisorName"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}