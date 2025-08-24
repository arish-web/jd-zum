import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Menu } from "lucide-react";
import { useStore } from "../../store/index";
import { useState } from "react";
import { useEffect } from "react";

const linkClass = "text-md font-medium hover:text-blue-600 dark:text-white";

export default function Navbar() {
  const { currentUser } = useStore();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLinks = () => {
    if (!currentUser) return null;

    switch (currentUser?.role) {
      case "tattoo":
        return (
          <>
            <Link to="/tattoos" className={linkClass}>Tattoos</Link>
            <Link to="/dashboard/tattoo" className={linkClass}>Dashboard</Link>
          </>
        );
      case "photo":
        return (
          <>
            <Link to="/photos" className={linkClass}>Photography</Link>
            <Link to="/dashboard/photo" className={linkClass}>Dashboard</Link>
          </>
        );
      case "client":
        return (
          <>
            <Link to="/service" className={linkClass}>Services</Link>
            <Link to="/dashboard/client" className={linkClass}>Dashboard</Link>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
  const storedUser = sessionStorage.getItem("user"); // ✅ Make sure your sessionStorage key is 'user'
  if (storedUser && !currentUser) {
    useStore.getState().setCurrentUser(JSON.parse(storedUser));
  }
}, []);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">InkLens</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        {renderLinks()}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-48 flex flex-col space-y-3 z-50 md:hidden">
          {renderLinks()}
          <button
            onClick={toggleDarkMode}
            className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
