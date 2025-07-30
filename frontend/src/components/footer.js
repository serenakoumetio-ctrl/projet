import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Logo & description */}
        <div className="">
          
          <img src="/img/logo.jpg" alt="logo"></img>
        </div>

        {/* Liens rapides */}
        <div className="">
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-purple-600 transition">Accueil</a></li>
            <li><a href="#" className="hover:text-purple-600 transition">À propos</a></li>
            <li><a href="#" className="hover:text-purple-600 transition">Fonctionnalités</a></li>
            <li><a href="#" className="hover:text-purple-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Ressources */}
       

        {/* Contact */}
        <div className="">
          <h3 className="text-lg font-semibold mb-3 ">Contact</h3>
          <p className="text-sm">Adresse: 13 750 Yaoundé , derrière le Musé National, Cameroun</p>
          <p className="text-sm mt-1">Email : contact@cenadi.cm</p>
          <p className="text-sm mt-1">Tél : (+237) 222 235 965</p>
        </div>
      </div>

      {/* Bas de page */}
      <div className="bg-gray-200 dark:bg-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} CENANDI.Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;


