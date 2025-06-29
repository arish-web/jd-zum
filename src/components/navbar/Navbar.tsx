import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useStore } from "../../store/index";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const currentUser = useStore((state) => state.currentUser);

  console.log("Navbar currentUser:", currentUser); // ✅ check this output in devtools

  const linkClass = `text-md font-medium hover:text-blue-600 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow">
      {/* Left: Brand */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        I n k L e n s
      </h1>

      {/* Right: Links + Toggle */}
      <div className="flex items-center space-x-6">
        {currentUser?.role === "tattoo" && (
          <>
            <Link to="/tattoos" className={linkClass}>
              Tattoos
            </Link>
            <Link to="/dashboard/tattoo" className={linkClass}>
              Dashboard
            </Link>
          </>
        )}

        {currentUser?.role === "photo" && (
          <>
            <Link to="/photos" className={linkClass}>
              Photography
            </Link>
            <Link to="/dashboard/photo" className={linkClass}>
              Dashboard
            </Link>
          </>
        )}

        {currentUser?.role === "client" && (
          <>
            <Link to="/service" className={linkClass}>
              Services
            </Link>
            <Link to="/dashboard/client" className={linkClass}>
              Dashboard
            </Link>
          </>
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
