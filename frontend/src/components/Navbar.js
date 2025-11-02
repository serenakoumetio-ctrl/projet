// import React, { useState, useEffect } from "react";
// import {
//   FaInfoCircle,
//   FaCogs,
//   FaEnvelope,
//   FaServicestack,
//   FaMoon,
//   FaSun,
// } from "react-icons/fa";

// export default function Navbar() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     if (newMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* --- Logo + bouton thème --- */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-white/20 hover:bg-green-400/30 text-yellow-300 dark:text-yellow-500 transition"
//           >
//             {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
//           </button>

//           <div className="text-yellow-400 font-extrabold text-2xl animate-pulse cursor-pointer select-none">
//             GOV-AI
//           </div>
//         </div>

//         {/* --- Liens --- */}
//         <ul className="flex space-x-8 text-gray-300 dark:text-gray-200 font-medium">
//           <li className="flex items-center space-x-1 hover:text-green-600 transition">
//             <FaInfoCircle className="w-5 h-5" />
//             <a href="#Apropos">À propos</a>
//           </li>
//           <li className="flex items-center space-x-1 hover:text-green-600 transition">
//             <FaCogs className="w-5 h-5" />
//             <a href="#Fonctionalite">Fonctionnalité</a>
//           </li>
//           <li className="flex items-center space-x-1 hover:text-green-600 transition">
//             <FaServicestack className="w-5 h-5" />
//             <a href="#HomePage">Services</a>
//           </li>
//           <li className="flex items-center space-x-1 hover:text-green-600 transition">
//             <FaEnvelope className="w-5 h-5" />
//             <a href="#Footer">Contact</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }


import React, { useState, useEffect } from "react";
import useContent from '../hooks/useContent';
import {
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaServicestack,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contenu par défaut
  const defaultNavbarContent = {
    logoText: "GOV-AI",
    menuItems: [],
    themeToggle: true
  };

  const { content, loading } = useContent('navbar', defaultNavbarContent);

  // Sécuriser les données
  const safeMenuItems = Array.isArray(content.menuItems) ? content.menuItems : [];

  // Mapping des icônes
  const iconComponents = {
    FaInfoCircle,
    FaCogs,
    FaEnvelope,
    FaServicestack,
    FaMoon,
    FaSun,
    FaBars,
    FaTimes
  };

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    // Smooth scroll vers la section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 font-extrabold text-2xl">GOV-AI</div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300  border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo + bouton thème - Côté gauche */}
          <div className="flex items-center space-x-4">
            {/* Bouton thème */}
            {content.themeToggle && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/20 hover:bg-green-400/30 text-yellow-500 dark:text-yellow-400 transition"
                aria-label="Changer le thème"
              >
                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
            )}

            {/* Logo */}
            <div className="text-yellow-400 font-extrabold text-2xl animate-pulse cursor-pointer select-none">
              {content.logoText}
            </div>
          </div>

          {/* Menu Desktop - Côté droit */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
              {safeMenuItems.map((item, index) => {
                const IconComponent = iconComponents[item.icon] || FaInfoCircle;
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="flex items-center space-x-1 hover:text-green-600 transition group"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 "></div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              {safeMenuItems.map((item, index) => {
                const IconComponent = iconComponents[item.icon] || FaInfoCircle;
                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition text-gray-700 dark:text-gray-200 font-medium"
                  >
                    <IconComponent className="w-5 h-5 text-green-500" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
              
              {/* Thème toggle dans le menu mobile */}
              {content.themeToggle && (
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition text-gray-700 dark:text-gray-200 font-medium w-full"
                >
                  {darkMode ? (
                    <>
                      <FaSun className="w-5 h-5 text-yellow-400" />
                      <span>Mode clair</span>
                    </>
                  ) : (
                    <>
                      <FaMoon className="w-5 h-5 text-yellow-500" />
                      <span>Mode sombre</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;