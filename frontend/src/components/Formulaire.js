import React from "react";

const Formulaire = () => {
  return (
    <div >
<div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">
        Contactez-nous
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Votre email"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
          required
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Votre message"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
        >
          Envoyer
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default Formulaire;
