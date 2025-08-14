import React from "react";

const goals = [
  {
    title: "Accès facilité aux textes",
    description:
      "Permettre au gouvernement de consulter rapidement et intuitivement les textes officiels camerounais grâce à une IA performante.",
  },
  {
    title: "Centralisation et Structuration des données",
    description:
      "Gov-AI rassemble tous les textes officiels du Cameroun dans un seul espace sécurisé et les organise par catégorie, thème et date. Résultat : une recherche rapide, une consultation claire et une gestion optimisée des documents gouvernementaux.",
  },
  {
    title: "Recherche intelligente",
    description:
      "Offrir une recherche contextuelle et intelligente des textes, avec prise en compte du langage naturel en français et en anglais.",
  },
  {
    title: "Disponibilité bilingue",
    description:
      "Garantir l’accès aux textes officiels dans les deux langues officielles du Cameroun : le français et l’anglais.",
  },
  {
    title: "Mise à jour continue",
    description:
      "Intégrer un système de versioning pour suivre les évolutions des textes et assurer l’accès aux dernières versions en temps réel.",
  },
  {
    title: "Réduction des erreurs",
    description:
      "Automatiser la gestion documentaire afin de réduire les délais de traitement et minimiser les erreurs humaines.",
  },
];
const cards = [
  {
    title: "Gain de temps",
    description: "Accédez instantanément aux textes officiels sans passer par de longues recherches manuelles, plus besoin de chercher dans 10 sites ou d’appeler un autre ministère pour retrouver un texte tout est déjà au même endroit.",
    delay: "0",
  },
  {
    title: "Transparence et droit ",
    description: "Comprenez mieux vos droits et obligations grace a un acces direct et clair aux textes qui regissent votre quotidien.",
    delay: "100",
  },
  {
    title: "Réduction des erreurs et Transparence",
    description: "Minimisez les incohérences grâce à des textes fiables et toujours à jour, Offrez un accès clair et équitable aux textes officiels à tous les fonctionnaires.",
    delay: "200",
  },
  {
    title: "Information ajour .",
    description: "Le système de versioning garantit que les administrations disposent toujours de la version la plus récente et valide d’un texte officiel, évitant ainsi la référence à des documents obsolètes ou abrogés, et assurant la cohérence des décisions gouvernementales.",
    delay: "200",
  },
];


const Fonctionalite = () => {
  return ( // bg-gradient-to-r from-green-500 to-yellow-400
    <section className="py-16 bg-white" id="Fonctionalite">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-10"
          data-aos="fade-up"
        >
          Fonctionnalités de GOV-AI
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white  shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl mb-10"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-2xl font-semibold  mb-3">
                {goal.title}
              </h3>
              <p className="  text-lg">
                {goal.description}
              </p>
            </div>
          ))}

        </div>
        <div className="mx-auto flex justify-center mt-10 ">
          <a
            href="#Avantages"
            className="bg-gradient-to-r from-green-500 to-yellow-400  shadow-lg  text-white font-semibold py-3 px-6 rounded-full  hover:bg-black hover:from-transparent  transition duration-300 "
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Découvrez les Avantages de Gov-AI
          </a>
        </div>



      </div>
      <div >


        <section id="Avantages" className="container mx-auto px-4 py-40 grid md:grid-cols-3 gap-8 ">
          <h2 className="text-4xl text-center font-medium mt-20 ">Avantages de Gov-AI</h2>
          {cards.map((card, index) => (
            <div
              key={index}
              className="card bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg p-6 
             transition duration-300 hover:bg-black hover:from-transparent hover:to-transparent "
              data-aos="zoom-in"
              data-aos-delay={card.delay}
            >
              <h3 className="text-2xl text-white font-bold mb-2">
                {card.title}
              </h3>
              <p className="text-white text-lg">{card.description}</p>
            </div>
          ))}
        </section>
        <section id="centralisation" className="px-6 py-16 bg-green-50">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold  mb-6"
              data-aos="fade-up"
            >
              Centraliser et structurer le corpus gouvernemental
            </h2>

            <p className="text-gray-500 mb-6" data-aos="fade-up" data-aos-delay="100">
              Cela veut dire deux choses principales :
            </p>

            {/* 1) Centraliser */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100"
              data-aos="fade-up" data-aos-delay="150">
              <h3 className="text-xl font-semibold mb-3">1. Centraliser</h3>
              <p className=" mb-4">
                Actuellement, les documents officiels (lois, décrets, arrêtés, circulaires, notes de service…)
                peuvent être <span className="font-medium">dispersés</span> :
              </p>
              <ul className="space-y-2 ">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-600"></span>
                  Dans différents ministères
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-600"></span>
                  Dans des archives papier
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-600"></span>
                  Sur des sites web séparés
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-600"></span>
                  Ou même dans des ordinateurs internes non connectés entre eux
                </li>
              </ul>

              <p className=" mt-4">
                <span className="font-semibold">Centraliser</span> consiste à rassembler toutes ces données
                dans un seul point d’accès sécurisé.
              </p>
              <p className=" mt-2">
                Avec <span className="font-semibold">Gov-AI</span>, cette “centralisation” veut dire que tous
                les textes officiels se retrouvent dans une seule base de données, consultable par les
                administrations autorisées.
              </p>
            </div>

            {/* 2) Structurer (accroche courte pour la suite si tu veux l'ajouter) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
              data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold mb-3">2. Structurer</h3>
              <p className="">
                Organiser les textes par catégories, thèmes, dates, ministères et métadonnées pour
                permettre une recherche rapide et une consultation claire (bloc détaillé à ajouter si besoin).
              </p>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
};

export default Fonctionalite;
