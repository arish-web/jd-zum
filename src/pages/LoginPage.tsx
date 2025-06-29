import { FiLogIn } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUser(payload);
      const token = response.data?.token;
      const user = response.data?.user;

      if (token && user) {
        sessionStorage.setItem("authToken", token);
        login(user);
        Notiflix.Notify.success("Login successful!");

        // 🔀 Navigate based on role
        switch (user.role) {
          case "client":
            navigate("/dashboard/client");
            break;
          case "photo":
            navigate("/dashboard/photo");
            break;
          case "tattoo":
            navigate("/dashboard/tattoo");
            break;
          default:
            navigate("/login"); // fallback
        }
      } else {
        throw new Error("Token or Role not found in response");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const msg =
        error?.response?.data?.msg ||
        error?.message ||
        "Something went wrong. Please try again.";
      Notiflix.Notify.failure(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <div className="flex justify-center text-blue-600 text-4xl mb-4">
          <FiLogIn />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border bg-gray-100 focus:ring-2 focus:ring-blue-500 pr-10"
              required
              minLength={8}
              maxLength={12}
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            {formData.password &&
              (formData.password.length < 8 ||
                formData.password.length > 12) && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be between 8 and 12 characters.
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
