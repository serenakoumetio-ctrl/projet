// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [prenom, setPrenom] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Bienvenue sur votre dashboard !');
//     navigate('/dashboard', { state: { prenom } });
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/images/ouiCENADI.webp')",
//         backgroundSize: '100%',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg animate-fade-in">
//         <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
//           CONNEXION
//         </h2>
//         <form className="space-y-6 text-white" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium mb-1">Matricule</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Votre matricule"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Mot de passe</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
//               placeholder="Votre mot de passe"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-green-800 hover:brightness-110 transition duration-300 py-3 rounded-lg font-semibold text-white mt-4"
//           >
//             Se connecter
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    setLoading(true);
    try {
      // Appel à l'API pour créer l'utilisateur
      const res = await axios.post("http://localhost:5000/api/users/register", {
        matricule,
        nom,
        prenom,
        password,
      });

      const user = res.data.user;

      // On sauvegarde l'utilisateur pour session persistante
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirection automatique vers le dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300"
      style={{ backgroundImage: "url('/img/ouiCENADI.webp')", backgroundSize: "cover" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
          Inscription
        </h2>

        {error && (
          <div className="bg-red-500 text-white px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form className="space-y-6 text-white" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre prénom"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Matricule</label>
            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre matricule"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-800 hover:brightness-110 transition duration-300 py-3 rounded-lg font-semibold text-white mt-4"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
