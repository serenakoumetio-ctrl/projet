import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link


const Acc = () => { //Déclare un composant fonctionnel React.
  return (
    <section
      className="parallax text-center text-white py-32 relative" //Une classe personnalisée pour l'effet paralax,  relative: Position relative (utile pour placer des éléments en absolute à l'interieur)
      style={{
        backgroundImage: "url('/img/4.png')", // Change cette image selon tes besoins
        backgroundAttachment: "fixed", // ici l'image reste fixe pendant le scroll
        backgroundSize: "cover", // L’image couvre toute la zone, sans se déformer.
        backgroundPosition: "center", //Centre l’image.
    
      }}
    id='Acc'>
      
      {/* Overlay sombre pour contraste Cet overlay sert à assombrir l’image de fond pour améliorer la lisibilité du texte.  absolute: Positionnement absolu par rapport au parent (section qui est en relative).*/}
      {/* inset-0 → Étend le div sur toute la largeur et hauteur du parent (top:0; right:0; bottom:0; left:0;). */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Contenu principal, z-10 Place le contenu au-dessus de l’overlay sombre. */}
      <div className=" z-10 px-4 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up" >
          Gov-AI : Revolutionner l'accès aux textes de loi du Cameroun
        </h2>
        <p className="text-lg md:text-xl mb-8" data-aos="zoom-in" data-aos-delay="200">
  Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.
        </p>

        {/* Bouton qui redirige vers /home */}
        <Link
          to="/home"
          className="bg-green-500 shadow-lg hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-block"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          En savoir plus
        </Link>

      </div>
    </section>
  );
};

export default Acc;
