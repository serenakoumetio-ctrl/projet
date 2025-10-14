import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    // Navigue vers la page de connexion lorsque le bouton est cliqué
    navigate('/auth'); // Assurez-vous que le chemin correspond à celui défini dans votre routeur
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 via-red-100 to-yellow-100 bg-opacity-90 backdrop-blur-md text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Texte + Logo */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-800 via-red-800 to-yellow-100 bg-clip-text text-transparent">
            GOV-AI_Admin
          </div>
          <img
            src="\IMG-20250712-WA0005.jpg"
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>
        {/* Bouton Se connecter */}
        <div className="hidden md:flex items-center">
          <button
            className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleConnectClick}
          >
            S'inscrire
          </button>
        </div>
        {/* Menu hamburger mobile */}
        <button className="md:hidden focus:outline-none text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
