"use client";
import React, { useState } from "react";
import { Save, Settings, AlertCircle, Plus, Minus } from "lucide-react";

function App() {
  const [formData, setFormData] = useState({
    batch: "",
    numberOfPreferences: 1,
  });
  const [savedPreferences, setSavedPreferences] = useState([]);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const incrementPreferences = () => {
    setFormData((prev) => ({
      ...prev,
      numberOfPreferences: prev.numberOfPreferences + 1,
    }));
  };

  const decrementPreferences = () => {
    if (formData.numberOfPreferences > 1) {
      setFormData((prev) => ({
        ...prev,
        numberOfPreferences: prev.numberOfPreferences - 1,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.batch) {
      alert("Please enter the batch");
      return;
    }

    const newPreference = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setSavedPreferences((prev) => [...prev, newPreference]);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);

    // Reset form
    setFormData({
      batch: "",
      numberOfPreferences: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Preference Settings
          </h1>
          <p className="text-gray-600">
            Set the number of company preferences for each batch
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
            <p className="text-sm text-gray-600">
              Students will be able to select companies based on these
              preference settings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch*
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                placeholder="e.g., 2020/21"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Preferences
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={decrementPreferences}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={formData.numberOfPreferences <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {formData.numberOfPreferences}
                </span>
                <button
                  type="button"
                  onClick={incrementPreferences}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-6 py-3 bg-[#0F1D2F] text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </button>
            </div>
          </form>
        </div>

        {/* Saved Preferences Table */}
        {savedPreferences.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Preferences</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number of Preferences
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedPreferences.map((pref) => (
                    <tr key={pref.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pref.batch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pref.numberOfPreferences}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pref.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSaveMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            Preferences saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
