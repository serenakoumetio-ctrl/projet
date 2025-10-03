// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Apropos = () => {
//   const [images, setImages] = useState([]);
//   const API_URL = "http://localhost:5000"; // ton backend

//   // Charger les images depuis le backend
//   const fetchImages = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/images`);
//       setImages(res.data);
//     } catch (err) {
//       console.error("Erreur lors du chargement des images :", err);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   return (
//     <section id="Apropos">
//       {/* Section texte */}
//       <section className="text-center mt-10 px-4">
//         <h4 className="text-xl md:text-2xl font-bold mb-6" data-aos="zoom-in">
//           Une solution dédiée aux administrations publiques
//         </h4>

//         <p className="text-lg md:text-xl mb-14" data-aos="fade-up">
//           Gov-AI est une initiative du CENANDI visant à intégrer l’intelligence artificielle
//           au cœur des services publics. Elle aide les décideurs à anticiper les besoins,
//           optimiser les ressources et améliorer la qualité des services rendus aux citoyens.
//         </p>

//         <p className="text-lg md:text-xl font-semibold mb-6" data-aos="zoom-in">
//           Quelques images
//         </p>
//       </section>

//       {/* Section cartes */}
//       <section className="px-6 py-3">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {images.length > 0 ? (
//             images.map((img, index) => (
//               <div
//                 key={img._id}
//                 className="bg-green-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//               >
//                 <img
//                   src={`${API_URL}${img.url}`} // récupérer l’URL depuis la BDD
//                   alt={img.title}
//                   className="w-full h-60 object-cover"
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-3 text-gray-500">Aucune image disponible</p>
//           )}
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Apropos;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Apropos = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); // index de l'image sélectionnée
  const API_URL = "http://localhost:5000"; // ton backend

  // Charger les images depuis le backend
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/images`);
      setImages(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des images :", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Fonctions navigation modale
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="Apropos">
      {/* Section texte */}
      <section className="text-center mt-10 px-4">
        <h4 className="text-xl md:text-2xl font-bold mb-6" data-aos="zoom-in">
          Une solution dédiée aux administrations publiques
        </h4>

        <p className="text-lg md:text-xl mb-14" data-aos="fade-up">
          Gov-AI est une initiative du CENANDI visant à intégrer l’intelligence artificielle
          au cœur des services publics. Elle aide les décideurs à anticiper les besoins,
          optimiser les ressources et améliorer la qualité des services rendus aux citoyens.
        </p>

        <p className="text-lg md:text-xl font-semibold mb-6" data-aos="zoom-in">
          Quelques images
        </p>
      </section>

      {/* Section cartes */}
      <section className="px-6 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={img._id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={`${API_URL}${img.url}`}
                  alt={img.title}
                  className="w-full h-80 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              Aucune image disponible
            </p>
          )}
        </div>
      </section>

      {/* Modale pour l'image */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setCurrentIndex(null)}
        >
          <div className="relative flex items-center">
            {/* Flèche gauche */}
            <button
              className="absolute left-0 text-white text-4xl p-4 hover:text-gray-300"
              onClick={handlePrev}
            >
              ❮
            </button>

            {/* Image */}
            <img
              src={`${API_URL}${images[currentIndex].url}`}
              alt={images[currentIndex].title}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Flèche droite */}
            <button
              className="absolute right-0 text-white text-4xl p-4 hover:text-gray-300"
              onClick={handleNext}
            >
              ❯
            </button>

            {/* Bouton fermer */}
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 shadow hover:bg-gray-200"
              onClick={() => setCurrentIndex(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Apropos;
