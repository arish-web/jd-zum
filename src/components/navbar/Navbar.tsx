import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useStore } from "../../store/index";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  // const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow">
      {/* Left: Brand */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        I n k L e n s
      </h1>

      {/* Right: Links + Toggle */}
      <div className="flex items-center space-x-6">

        {currentUser?.role === "tattoo" && (
          <Link
            to="/tattoos"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Tattoos
          </Link>
        )}

        {currentUser?.role === "photo" && (
          <Link
            to="/photos"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Photography
          </Link>
        )}
          {currentUser?.role === "client" && (
          <Link
            to="/service"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Services
          </Link>
        )}

        {currentUser?.role === "tattoo" && (
          <Link
            to="/dashboard/tattoo"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>
        )}

        {currentUser?.role === "photo" && (
          <Link
            to="/dashboard/photo"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>
        )}

        {currentUser?.role === "client" && (
          <Link
            to="/dashboard/client"
            className={`text-md font-medium hover:text-blue-600 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Dashboard
          </Link>
        )}

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
      </div>
    </nav>
  );
}
