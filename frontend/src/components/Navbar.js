import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Entreprise Pro</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/a-propos" className="hover:underline">À propos</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;