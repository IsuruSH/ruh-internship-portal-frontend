"use client";
import React, { useState } from "react";
import { User, Lock, X, LogIn } from "lucide-react";
import api from "../../../lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Email is required";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Call API to login
    try {
      const response = await api.post("/auth/login/admin", formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/admin-dashboard");
      }
    } catch (error) {
      toast.error(error.message); // Show backend error message
    }
  };

  const onClose = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative w-[500px] p-8 rounded-[24px] bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Sign in</h2>
          <p className="mt-2 text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 flex items-center justify-center gap-2 text-white bg-[#0F1D2F] hover:bg-gray-600 rounded-lg font-semibold transition-colors focus:outline-none "
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
