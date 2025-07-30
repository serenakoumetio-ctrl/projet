import React from "react";

const Cards = () => {
  const cards = [
    {
      title: "Carte 1",
      description: "Zoom au survol avec animation d'entrée.",
      delay: "0",
    },
    {
      title: "Carte 2",
      description: "Animations au scroll avec AOS.",
      delay: "100",
    },
    {
      title: "Carte 3",
      description: "Design responsive et moderne.",
      delay: "200",
    },
  ];

  return (
    <div style={{
      backgroundImage: "url('/img/4.png')", // Change cette image selon tes besoins
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <section className="container mx-auto px-4 py-40 grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 transition-transform duration-300 ease-in-out hover:scale-105"
            data-aos="zoom-in"
            data-aos-delay={card.delay}
          >
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
          </div>
        ))}
      </section>
    </div>

  );
};

export default Cards;
