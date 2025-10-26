import React from 'react';

const Acc = () => {
  return (
    <section
      id="Acc"
      className="relative text-center text-white py-40 overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/img/STAND.png')" }}
    >
      {/* Superposition sombre */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenu principal */}
      <div className="relative z-10 px-6 md:px-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Titre */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Gov-AI : Révolutionner l'accès aux textes de loi du Cameroun
        </h2>

        {/* Sous-texte */}
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
          Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.
        </p>

        {/* Bouton */}
        <a
          href="#Fonctionalite"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          En savoir plus
        </a>
      </div>
    </section>
  );
};

export default Acc;
