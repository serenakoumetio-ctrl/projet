import React from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-8">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne 1 */}
        <div>
          <p className="text-gray-900 font-medium mb-4">
            Centre National de Développement de l’Informatique.
          </p>
          <img
            src="/img/ll.png"
            alt="Logo CENADI"
            className="w-40 h-auto"
          />
        </div>

        {/* Colonne 2 */}
        <div>
          <h3 className="font-bold text-lg mb-4 border-l-4 border-green-600 pl-2">
            Navigation</h3>
             <a href="#Acc"className="block text-gray-500  hover:text-green-500 ">Accueil</a>
            <a href="#Apropos" className="block text-gray-500  hover:text-purple-600">À propos</a>
            <a href="#Fonctionalite" className="block text-gray-500 hover:text-purple-600">Fonctionnalités</a>
            <a href="#Formulaire" className="text-gray-500 hover:text-purple-600">Contact</a>
          
          {/* Tu peux ajouter ici une liste de liens */}
        </div>

        {/* Colonne 3 */}
        <div>
          <h3 className="font-bold text-lg mb-4 border-l-4 border-green-600 pl-2">
            Contact
          </h3>
          <p className="text-gray-500">Adresse: 13 750 Yaoundé, derrière le Musée National, Cameroun</p>
          <p className="text-gray-500">Tel: (+237) 222 235 965</p>
          <p className="text-gray-500">Email: contact@cenadi.cm</p>
        </div>
      </div>

      {/* Bas de page */}
      <div className="bg-green-600 py-8 relative">
        <p className="text-center text-white text-sm">
          © 2020 CENADI. Tous droits réservés
        </p>

        {/* Bouton retour haut */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

