import React, { useState } from 'react';

const CompanyBox = ({ company }) => {
  // State for email input field
  const [email, setEmail] = useState(company.email);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle sending CVs to company
  const sendToCompany = () => {
    // Implement email sending logic here
  };

  return (
    <div className="border rounded-lg p-4 m-2 bg-gray-200 w-64">
      <h3 className="font-bold text-lg">{`Company Name: ${company.name}`}</h3>
      {/* Students section with vertical scroll */}
      <div className="overflow-y-auto h-32 mt-2">
        {company.students.slice(0, 3).map((student) => (
          <div key={student.id} className="bg-gray-300 p-2 my-1 rounded">
            {`${student.name} (${student.scNumber})`}
          </div>
        ))}
      </div>
      {/* Email input field */}
      <div className="mt-2">
        <label className="block text-sm">Email:</label>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          className="border rounded p-2 w-full"
        />
      </div>
      {/* Send to Company button */}
      <button
        onClick={sendToCompany}
        className="bg-gray-800 text-white p-2 mt-2 rounded w-full"
      >
        Send to Company
      </button>
    </div>
  );
};

export default CompanyBox;