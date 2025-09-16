


// export default Formulaire;
import React, { useState } from "react";
import axios from "axios";

const Formulaire = () => {
  // State pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  // State pour afficher le message de confirmation ou d'erreur
  const [responseMsg, setResponseMsg] = useState("");

  // Met à jour le state quand l'utilisateur écrit dans un champ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Envoi des données au backend
      const res = await axios.post("http://localhost:5000/api/messages", formData);
      setResponseMsg(res.data.message); // Message de succès
      setFormData({ nom: "", email: "", message: "" }); // Réinitialise le formulaire
    } catch (err) {
      setResponseMsg("Erreur lors de l'envoi du message");
    }
  };

  return (
    <section id="Formulaire">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 rounded-lg shadow-lg hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center" data-aos="fade-up">
          Contactez-nous
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" data-aos="fade-up">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-2 border outline-green-400 rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre email"
            className="w-full px-4 py-2 border outline-green-400 rounded-md"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
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

        {responseMsg && <p className="mt-4 text-center text-green-700">{responseMsg}</p>}
      </div>
    </section>
  );
};

export default Formulaire;

