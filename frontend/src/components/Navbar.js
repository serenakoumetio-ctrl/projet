import React, { useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaServicestack,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* --- Logo + bouton thème --- */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 hover:bg-green-400/30 text-yellow-300 dark:text-yellow-500 transition"
          >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>

          <div className="text-yellow-400 font-extrabold text-2xl animate-pulse cursor-pointer select-none">
            GOV-AI
          </div>
        </div>

        {/* --- Liens --- */}
        <ul className="flex space-x-8 text-gray-300 dark:text-gray-200 font-medium">
          <li className="flex items-center space-x-1 hover:text-green-600 transition">
            <FaInfoCircle className="w-5 h-5" />
            <a href="#Apropos">À propos</a>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 transition">
            <FaCogs className="w-5 h-5" />
            <a href="#Fonctionalite">Fonctionnalité</a>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 transition">
            <FaServicestack className="w-5 h-5" />
            <a href="#HomePage">Services</a>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 transition">
            <FaEnvelope className="w-5 h-5" />
            <a href="#Footer">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
