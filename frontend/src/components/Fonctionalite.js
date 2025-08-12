import React from "react";

const goals = [
  {
    title: "Accès facilité aux textes",
    description:
      "Permettre à tous les citoyens de consulter rapidement et intuitivement les textes officiels camerounais grâce à une IA performante.",
  },
  {
    title: "Base documentaire centralisée",
    description:
      "Structurer et centraliser l’ensemble des documents administratifs du Cameroun en un seul endroit sécurisé et accessible.",
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

const Fonctionalite = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center text-purple-700 dark:text-white mb-10"
          data-aos="fade-up"
        >
          Fonctionnalités de GOV-AI
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold text-purple-700 dark:text-white mb-3">
                {goal.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {goal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Illustration en bas */}

        <div className=" flex mt-14  " data-aos="zoom-in">
          <img
            src="/img/gov2.jpg" // place ton image dans /public/
            alt="Illustration GOV-AI"
            className="my-3 object-fit-cover   max-w-md rounded-lg shadow-lg"
          />

        </div>
        <p className="text-xl text-gray-500 dark:text-gray-400 mt-2">
          Une IA au service du gouvernement camerounais
        </p>
      </div>
    </section>
  );
};

export default Fonctionalite;
