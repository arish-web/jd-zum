import { useState } from "react";
import { UserPlus } from "lucide-react"; // optional icon
import { registerUser } from "../api/auth"; // Make sure this is correctly set up
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function Register() {
  const navigate = useNavigate();
  const [isDarkMode] = useState(false); // You can later manage this via context or settings
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as "client" | "tattoo" | "photo",
        company:
          formData.role === "photo" || formData.role === "tattoo"
            ? formData.company
            : undefined,
      };
      await registerUser(payload);
      Notiflix.Notify.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      const msg =
        error?.response?.data?.msg ||
        error?.message ||
        "Something went wrong. Please try again.";
      Notiflix.Notify.failure(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-xl p-8 w-full max-w-md`}
      >
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="w-10 h-10 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
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
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } focus:ring-2 focus:ring-blue-500 pr-10`}
            />

            {/* Toggle Icon */}
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            {/* Validation message */}
            {formData.password.length > 0 &&
              (formData.password.length < 8 ||
                formData.password.length > 12) && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be between 8 and 12 characters.
                </p>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Account Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } focus:ring-2 focus:ring-blue-500`}
            >
              <option value="client">Client</option>
              <option value="tattoo">Tattoo Artist</option>
              <option value="photo">Photographer</option>
            </select>
          </div>

          {(formData.role === "tattoo" || formData.role === "photo") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Studio Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition shadow"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
