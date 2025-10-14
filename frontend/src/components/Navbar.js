import React from "react";
import { FaInfoCircle, FaCogs, FaEnvelope, FaServicestack } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-500/80 to-white/30 backdrop-blur-md fixed w-full z-50 rounded-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo GOV-AI */}
        <div className="text-yellow-400 font-extrabold text-2xl animate-pulse cursor-pointer select-none">
          GOV-AI
        </div>

        {/* Liens */}
        <ul className="flex space-x-8 text-gray-300 font-medium">
          <li className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition">
            <FaInfoCircle className="w-5 h-5" />
            <span>À propos</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition">
            <FaCogs className="w-5 h-5" />
            <span>Fonctionnalités</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition">
            <FaEnvelope className="w-5 h-5" />
            <span>Contact</span>
          </li>
          <li className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition">
            <FaServicestack className="w-5 h-5" />
            <span>Services</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
