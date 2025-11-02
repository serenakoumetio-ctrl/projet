import React from 'react';
import useContent from '../hooks/useContent';

const Acc = () => {
  const defaultContent = {
    title: "Gov-AI : Révolutionner l'accès aux textes de loi du Cameroun",
    subtitle: "Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.",
    buttonText: "En savoir plus",
    backgroundImage: "/default/background-1.jpg"
  };

  const { content, loading } = useContent('accueil', defaultContent);

  if (loading) {
    return (
      <section className="relative text-center text-white py-40 bg-gray-800">
        <div className="flex justify-center items-center h-40">
          <p>Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="Acc"
      className="relative text-center text-white py-40 overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url('http://localhost:5000${content.backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 px-6 md:px-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          {content.title}
        </h2>

        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
          {content.subtitle}
        </p>

        <a
          href="#Fonctionalite"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          {content.buttonText}
        </a>
      </div>
    </section>
  );
};

export default Acc;