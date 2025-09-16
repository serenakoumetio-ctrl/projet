import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Bienvenue sur votre dashboard !');
    navigate('/dashboard', { state: { prenom } });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/ouiCENADI.webp')",
        backgroundSize: '100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
          CONNEXION
        </h2>
        <form className="space-y-6 text-white" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Matricule</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre matricule"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-800 hover:brightness-110 transition duration-300 py-3 rounded-lg font-semibold text-white mt-4"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
