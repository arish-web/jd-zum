import React from "react";
import { useState } from "react";
import { registerUser } from "../api/auth"; // Make sure this is correctly set up
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { FiEye, FiEyeOff } from "react-icons/fi";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function RegisterModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  //   const [isDarkMode] = useState(false); // You can later manage this via context or settings
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role as "client" | "tattoo" | "photo",
        company:
          formData.role === "photo" || formData.role === "tattoo"
            ? formData.company
            : undefined,
      };

      const response = await registerUser(payload);

      // ✅ Save token to sessionStorage
      sessionStorage.setItem("authToken", response.token);

      // ✅ Optional: Save user info (if needed)
      sessionStorage.setItem("user", JSON.stringify(response.user));

      Notiflix.Notify.success("Registration successful!");

      // Close modal or navigate
      onClose(); // Close the modal
      navigate("/"); // Optional: navigate to home or dashboard
    } catch (error: any) {
      console.error("Registration failed:", error);
      const msg =
        error?.response?.data?.msg ||
        error?.message ||
        "Something went wrong. Please try again.";
      Notiflix.Notify.failure(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transform transition-all scale-100 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign up to book appointments and manage your studio.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              required
              minLength={8}
              maxLength={12}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {formData.password.length > 0 &&
              (formData.password.length < 8 ||
                formData.password.length > 12) && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be between 8 and 12 characters.
                </p>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Phone
            </label>
            <PhoneInput
              country={"in"} // Default country: India
              value={formData.phone}
              onChange={(phone: string) => setFormData({ ...formData, phone })}
              inputClass="!w-full !bg-gray-100 dark:!bg-gray-800 !text-gray-800 dark:!text-white !border-gray-300 dark:!border-gray-700 !rounded-lg"
              buttonClass="!bg-gray-100 dark:!bg-gray-800"
              containerClass="!w-full"
              inputStyle={{
                height: "42px",
              }}
              enableSearch
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="client">Client</option>
              {/* <option value="tattoo">Tattoo Artist</option>
              <option value="photo">Photographer</option> */}
            </select>
          </div>

          {(formData.role === "tattoo" || formData.role === "photo") && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Studio Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-lg transition text-white shadow-md ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
