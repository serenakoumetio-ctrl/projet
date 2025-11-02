import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!matricule || !nom || !prenom || !password) {
      setError("Tous les champs sont requis.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricule,
          nom,
          prenom,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("adminUser", JSON.stringify(result.user));
        navigate("/dashboard");
      } else {
        setError(result.error || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/ouiCENADI.webp')" }}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 drop-shadow-md">
          Inscription Admin
        </h2>

        {error && (
          <div className="bg-red-500 text-white px-3 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form className="space-y-6 text-gray-800" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Votre nom"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Votre prénom"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Matricule</label>
            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Votre matricule"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Au moins 6 caractères"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-700 via-green-500 to-yellow-400 hover:brightness-110 transition duration-300 py-3 rounded-lg font-semibold text-white mt-4 disabled:opacity-50"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;