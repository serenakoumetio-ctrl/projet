import React from 'react';
import { useLocation } from 'react-router-dom';

const DashboardNavbar = () => {
  const location = useLocation();
  const prenom = location.state?.prenom || 'Utilisateur';

  return (
    <nav className="bg-gradient-to-r from-white via-green-100 to-white bg-opacity-70 backdrop-blur-md shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Partie gauche : Logo + Titre */}
        <div className="flex items-center gap-3">
          <img
            src="/images/armoiries_logo_cenadi.png"
            alt="Logo"
            className="h-10 w-20 object-contain transform scale-125"
          />
          <span className="text-xl font-bold">GOV-AI</span>
        </div>
        {/* Partie droite : Message personnalisé */}
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
          Bienvenue, administrateur {prenom}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
