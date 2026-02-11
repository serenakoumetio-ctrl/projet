import React, { useState } from "react";

const Formulaire = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch("http://https://3ph6tdz7-5000.use.devtunnels.ms//api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMsg("✅ " + result.message);
        setFormData({ nom: "", email: "", message: "" });
      } else {
        setResponseMsg("❌ " + result.message);
      }
    } catch (err) {
      setResponseMsg("❌ Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Formulaire">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 rounded-lg shadow-lg hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Contactez-nous
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom complet"
              className="w-full px-4 py-2 border outline-green-400 rounded-md"
              required
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre adresse email"
              className="w-full px-4 py-2 border outline-green-400 rounded-md"
              required
              disabled={loading}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Votre message..."
              className="w-full px-4 py-2 border outline-green-400 rounded-md"
              required
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white py-2 rounded-md hover:bg-green-500 p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>

        {responseMsg && (
          <div className={`mt-4 p-3 rounded text-center ${
            responseMsg.includes('✅') 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {responseMsg}
          </div>
        )}
      </div>
    </section>
  );
};

export default Formulaire;