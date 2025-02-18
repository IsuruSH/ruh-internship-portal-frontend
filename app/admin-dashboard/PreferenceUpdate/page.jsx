
import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Preferences = () => {
  const [preferences, setPreferences] = useState(['1st Preference']);

  const addPreference = () => {
    setPreferences([...preferences, `${preferences.length + 1}th Preference`]);
  };

  const savePreferences = () => {
    alert(`Preferences saved! You have ${preferences.length} preferences.`);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Indicate how many choices the student has.</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        {preferences.map((preference, index) => (
          <div key={index} className="mb-4">
            <label className="block text-base font-medium mb-2">{preference}</label>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={addPreference}
          className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={savePreferences}
          className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default function MainContent() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64">
        <h1 className="text-2xl font-bold mb-4 text-center">PREFERENCE UPDATE</h1>
        <div className="bg-slate-100 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
          <Preferences />
        </div>
      </div>
    </>
  );
}