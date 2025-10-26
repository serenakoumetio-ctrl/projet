import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="Footer"
      className="
        relative mt-12 overflow-hidden
        bg-gradient-to-br from-lime-200/70 via-white/60 to-green-100/70
        dark:from-gray-800/70 dark:via-gray-900/70 dark:to-black/70
        backdrop-blur-md shadow-inner rounded-t-2xl
        text-gray-800 dark:text-gray-200 transition-all duration-700
      "
    >
      {/* 🌈 Bordure supérieure animée */}
      <div
        className="
          absolute top-0 left-0 w-full h-[4px]
          bg-[linear-gradient(90deg,#22c55e,#facc15,#22c55e,#facc15)]
          bg-[length:300%_300%]
          animate-[gradientMove_4s_linear_infinite]
          rounded-t-2xl
        "
      ></div>

      {/* 🧩 Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne 1 */}
        <div>
          <p className="text-gray-900 dark:text-gray-100 font-semibold mb-4">
            Centre National de Développement de l’Informatique
          </p>
          <img
            src="/img/ll.png"
            alt="Logo CENADI"
            className="w-40 h-auto opacity-90 hover:opacity-100 transition"
          />
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="font-bold text-lg mb-4 border-l-4 border-green-500 pl-2">
            Navigation
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#Acc"
                className="block hover:text-green-600 transition"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#Apropos"
                className="block hover:text-green-600 transition"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="#Fonctionalite"
                className="block hover:text-green-600 transition"
              >
                Fonctionnalités
              </a>
            </li>
            <li>
              <a
                href="#HomePage"
                className="block hover:text-green-600 transition"
              >
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 - Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4 border-l-4 border-green-500 pl-2">
            Contact
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-500" />
              <span>13 750 Yaoundé, derrière le Musée National, Cameroun</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhone className="text-green-500" />
              <span>(+237) 222 235 965</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-green-500" />
              <span>contact@cenadi.cm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Ligne de séparation subtile */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

      {/* Bas de page */}
      <div className="py-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <p className="text-sm text-center md:text-left">
          © 2025 CENADI. Tous droits réservés.
        </p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-green-500 transition">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="hover:text-green-500 transition">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="hover:text-green-500 transition">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
