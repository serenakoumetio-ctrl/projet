import React from 'react';

const Hero = () => {
  return (
    <section
      className="parallax text-center text-white py-32 relative"
      style={{
        backgroundImage: "url('/img/4.png')", // Change cette image selon tes besoins
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay sombre pour contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Contenu principal */}
      <div className="relative z-10 px-4 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up">
          Gov-AI : L'intelligence au service de la gouvernance
        </h2>
        <p className="text-lg md:text-xl mb-8" data-aos="fade-up" data-aos-delay="200">
             Gov-IA est une solution d'intelligence artificielle développée par le CENANDI pour améliorer et faciliter l'accès au textes du Cameroun .
        </p>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          En savoir plus
        </button>

        
      </div>
    </section>
  );
};

export default Hero;
