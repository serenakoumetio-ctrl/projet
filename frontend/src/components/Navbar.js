import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Active/désactive la classe dark sur le <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Nom du site */}
        <h1 className="text-xl font-bold text-purple-700 dark:text-white">Mon Site</h1>

        {/* Boutons et liens sur grand écran */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Liens */}
          <nav className="flex space-x-4">
            <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Accueil</Link>
            <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">À propos</Link>
             <Link to="/Fonctionalite" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600">Fonctionnalités</Link>
            <Link to="/Formulaire" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Contact</Link>
          </nav>

          {/* Boutons */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded"
          >
            FR
          </button>
        </div>

        {/* Menu hamburger sur mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300"
          aria-label="Ouvrir le menu"
        >
          {/* Icône SVG : menu ou croix */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu déroulant en mobile */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
                     <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Accueil</Link>
            <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">À propos</Link>
             <Link to="/Fonctionalite" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600">Fonctionnalités</Link>
            <Link to="/Formulaire" className="text-gray-700 dark:text-gray-300 hover:text-purple-600">Contact</Link>
      

          {/* Boutons DarkMode et Langue en mobile */}
          <div className="flex space-x-4 pt-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded w-full"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded w-full"
            >
              FR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
