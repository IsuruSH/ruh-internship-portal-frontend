'use client';
import { useState } from 'react';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleSaveChanges = () => {
    // Handle save changes logic here (such as saving to backend or state)
    console.log('Changes Saved');
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ADD INTERNSHIPS DETAILS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <label htmlFor="name" className="block text-base font-medium mb-2">Company Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="designation" className="block text-base font-medium mb-2">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="timePeriod" className="block text-base font-medium mb-2">Time Period</label>
          <input
            type="text"
            id="timePeriod"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
