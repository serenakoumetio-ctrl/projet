// Navbar.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';

// Création des Contextes pour le Thème et la Langue
export const ThemeContext = createContext();
export const LanguageContext = createContext();

// Fournisseurs de Contextes pour encapsuler l'application
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'

  useEffect(() => {
    // Appliquer ou retirer la classe 'dark' sur l'élément <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // 'fr' (français) ou 'en' (anglais)

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'fr' ? 'en' : 'fr'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext); // Utilisation du contexte de thème
  const { language, toggleLanguage } = useContext(LanguageContext); // Utilisation du contexte de langue

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const currentThemeIcon = theme === 'light' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.567l.707.707M4.929 4.929l.707.707M18.364 4.364l.707-.707M4.343 18.343l.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  return (
    // Navbar avec un fond semi-transparent pour l'effet "vie" et le flou (similaire à l'herbe/eau)
    <nav className="bg-green-600/70 p-4 shadow-lg fixed w-full z-10 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section (Left) - Espace dédié */}
        <div className="flex items-center">
          <a href="#" className="text-white text-2xl font-bold hover:text-green-200 transition duration-300 ease-in-out">
            GOV-AI
          </a>
        </div>

        {/* Navigation Items (Right - Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#accueil" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out hover:bg-green-700/80">Accueil</a>
          <a href="#a-propos" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out hover:bg-green-700/80">À Propos</a>
          <a href="#contact" className="text-white hover:text-green-200 px-3 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out hover:bg-green-700/80">Contact</a>

          {/* Bouton de changement de langue */}
          <button onClick={toggleLanguage} className="text-white hover:text-green-200 focus:outline-none transition duration-300 ease-in-out flex items-center">
            {/* Icône de globe + texte "Aa" */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M3 9h12M3 13h12M3 17h12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-1 font-semibold text-sm">{language.toUpperCase()}</span> {/* Affiche 'FR' ou 'EN' */}
          </button>

          {/* Bouton de changement de thème */}
          <button onClick={toggleTheme} className="text-white hover:text-green-200 focus:outline-none transition duration-300 ease-in-out">
            {currentThemeIcon} {/* Affiche l'icône Soleil ou Lune */}
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white hover:text-green-200 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default, shown with JavaScript) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-green-700 mt-2 rounded-md`}>
        <a href="#accueil" className="block text-white hover:text-green-200 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:bg-green-600">Accueil</a>
        <a href="#a-propos" className="block text-white hover:text-green-200 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:bg-green-600">À Propos</a>
        <a href="#contact" className="block text-white hover:text-green-200 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:bg-green-600">Contact</a>
        <button onClick={toggleLanguage} className="block w-full text-left text-white hover:text-green-200 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:bg-green-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M3 9h12M3 13h12M3 17h12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="ml-2">Langue ({language.toUpperCase()})</span>
        </button>
        <button onClick={toggleTheme} className="block w-full text-left text-white hover:text-green-200 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out hover:bg-green-600 flex items-center">
          {currentThemeIcon}
          <span className="ml-2">Thème</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;