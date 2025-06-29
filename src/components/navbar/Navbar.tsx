import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Menu } from "lucide-react";
import { useStore } from "../../store/index";
import { useState } from "react";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const currentUser = useStore((state) => state.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = `text-md font-medium hover:text-blue-600 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow">
      {/* Brand */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        InkLens
      </h1>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Desktop Links */}
      {/* <div className="hidden md:flex items-center space-x-6">
        {currentUser?.role === "tattoo" && (
          <>
            <Link to="/tattoos" className={linkClass}>Tattoos</Link>
            <Link to="/dashboard/tattoo" className={linkClass}>Dashboard</Link>
          </>
        )}
        {currentUser?.role === "photo" && (
          <>
            <Link to="/photos" className={linkClass}>Photography</Link>
            <Link to="/dashboard/photo" className={linkClass}>Dashboard</Link>
          </>
        )}
        {currentUser?.role === "client" && (
          <>
            <Link to="/service" className={linkClass}>Services</Link>
            <Link to="/dashboard/client" className={linkClass}>Dashboard</Link>
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
      </div> */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white dark:bg-gray-800 shadow-md p-4 rounded-md z-50 md:hidden flex flex-col space-y-4">
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
            className={`flex items-center justify-start space-x-2 text-sm px-2 py-1 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white dark:bg-gray-800 shadow-md p-4 rounded-md z-50 md:hidden">
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
        </div>
      )}
    </nav>
  );
}
