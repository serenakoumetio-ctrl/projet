import React from "react";

const Formulaire = () => {
  return (
    <section id="Formulaire">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center" data-aos="fade-up">
          Contactez-nous
        </h2>

        <form className="space-y-4 " data-aos="fade-up">
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            className="w-full px-4 py-2 border outline-green-400 rounded-md "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            className="w-full px-4 py-2 border outline-green-400 rounded-md "
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Votre message"
            className="w-full px-4 py-2 border outline-green-400 rounded-md dark:bg-gray-700"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white py-2 rounded-md hover:bg-green-500 p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>

  );
};

export default Formulaire;
