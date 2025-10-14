import React, { useState, useEffect } from 'react';

const Acc = () => {
  const fullText = "Gov-AI : Revolutionner l'accès aux textes de loi du Cameroun";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      setIndex((prev) => (prev + 1) % (fullText.length + 1));
    }, 100); // 100ms entre chaque lettre (ajuste la vitesse ici)

    return () => clearTimeout(timeout);
  }, [index, fullText]);

  return (
    <section
      className="parallax text-center text-white py-40 relative"
      style={{
        backgroundImage: "url('/img/DEL.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id='Acc'
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="z-10 px-4 md:px-10 max-w-4xl mx-auto">
        {/* Texte animé lettre par lettre */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up">
          {displayedText}
          <span className="blinking-cursor">|</span> {/* Curseur animé */}
        </h2>
        <p className="text-lg md:text-xl mb-8" data-aos="zoom-in" data-aos-delay="200">
          Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.
        </p>

        <a
          href="#Fonctionalite"
          className="bg-green-500 shadow-lg hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-block"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          En savoir plus
        </a>
      </div>

      {/* CSS pour le curseur qui clignote */}
      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 2rem;
          color: yellow;
          animation: blink 1s step-start infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Acc;
