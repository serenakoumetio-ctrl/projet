import React from "react";

const cardImages = [
  "/img/gov1.jpg",
  "/img/gov2.jpg",
  "/img/gov3.jpg",
];

const Apropos = () => {
  return (
    <section id="Apropos">
      {/* Section texte */}
      <section className="parallax text-center mt-10 px-4 ">
        <h4 className="text-xl md:text-2xl font-bold mb-6" data-aos="zoom-in">
        Une solution dédiée aux administrations publiques
        </h4>

        <p className="text-lg md:text-xl mb-14" data-aos="fade-up">
         Gov-AI est une initiative du CENANDI visant à intégrer l’intelligence artificielle au cœur des services publics.
          Elle aide les décideurs à anticiper les besoins, optimiser les ressources et améliorer la qualité des services rendus aux citoyens.
        </p>
       

        <p className="text-lg md:text-xl font-semibold mb-6" data-aos="zoom-in">
          Quelques images
        </p>
      </section>

      {/* Section cartes */}
      <section className="px-6 py-3 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardImages.map((src, index) => (
            <div
              key={index}
              className="bg-green-100 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={src}
                alt={`Gov-AI ${index + 1}`}
                className=" h-17 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Apropos;
