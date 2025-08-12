import React from "react";

const Av = () => {
  const cards = [
    {
      title: "Disponibilite bilingue",
      description: "Le cameroun etant un pays bilingue , l'assurance de la disponibilite des textes  dans les deux langues officielles est un atout majeur, garantissant l'equite d'acces pour tous les citoyens.",
      delay: "0",
    },
    {
      title: "Transparence et droit ",
      description: "Comprenez mieux vos droits et obligations grace a un acces direct et clair aux textes qui regissent votre quotidien.",
      delay: "100",
    },
    {
      title: "Reduction des delais et des erreurs.",
      description: "Accedez rapidement a l'information fiable pour voos demarches, reduisnat ainsi les attentes et les erreurs couteuses.",
      delay: "200",
    },
    {
      title: "Information ajour .",
      description: "Le systeme de versioning garantit que les citoyens consultent toujour la version la plus recente et valide d'un texte, evitant ainsi l'utilisation de documents obselete ou abroges.",
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

      <h2 className="text-3xl text-center  text-white ">Avantages de Gov-AI</h2>
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

export default Av;
