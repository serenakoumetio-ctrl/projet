import React, { useState, useEffect } from "react"; //useState : Hook pour gérer l'état du menu (ouvert/fermé)
//import { Link } from "react-router-dom";  Composant React Router pour la navigation (importé mais non utilisé)

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false); // Variable qui stocke l'état (true = menu ouvert, false = fermé)
  //setMenuOpen : Fonction pour modifier l'état
  //useState(false) : Initialise le menu comme fermé au départ


  return (
    // className="fixed  w-full bg-green-500 dark:bg-gray-900 shadow-md p-3 z-50"> pour que la navbar reste fixe
    <header className="bg-gradient-to-r from-green-600 via-red-100 to-yellow-100 bg-opacity-90 backdrop-blur-md shadow-md fixed w-full z-50  ">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center ">
        {/* Logo */}

        <img src="/img/ll.png" alt="Logo du site" className="w-40 h-auto object-contain" />


        {/* Boutons et liens sur grand écran */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Liens */}
          <nav className="flex space-x-4 text-lg">
            <a href="#Acc" className="text-black border-b-2 border-transparent hover:border-white transition duration-300">  Accueil</a>
            <a href="#Apropos" className="text-black border-b-2 border-transparent hover:border-white transition duration-300">  À propos</a>
            <a href="#Fonctionalite" className="text-black border-b-2 border-transparent hover:border-white transition duration-300">Fonctionnalités</a>
            <a href="#Formulaire" className="text-black border-b-2 border-transparent hover:border-white transition duration-300"> Contact</a>

          </nav>

          {/* Boutons */}

          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded"
          >
            Français
          </button>
        </div>

        {/* Menu hamburger sur mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)} //Crée un élément cliquable qui inverse l'état du menu (ouvert/fermé)
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
          <a href="#Acc" className="block text-white  hover:text-purple-600 ">Accueil</a>
          <a href="#Apropos" className="block text-white  hover:text-purple-600">À propos</a>
          <a href="#Fonctionalite" className="block text-white hover:text-purple-600">Fonctionnalités</a>
          <a href="#Formulaire" className="block text-white hover:text-purple-600">Contact</a>

          {/* Boutons DarkMode et Langue en mobile */}
          <div className="flex space-x-4 pt-2">

            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded w-full"
            >
              Français
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
