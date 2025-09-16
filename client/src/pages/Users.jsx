import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Exemple de données utilisateurs
const initialUsers = [
  { id: 1, name: "Yannick Obam", role: "Admin", email: "yannick@gov-ai.com", lastLogin: "26/08/2025" },
  { id: 2, name: "Marie Dupont", role: "Rédacteur", email: "marie@gov-ai.com", lastLogin: "25/08/2025" },
  { id: 3, name: "Paul Nguema", role: "Modérateur", email: "paul@gov-ai.com", lastLogin: "24/08/2025" },
  { id: 4, name: "Alice Mbarga", role: "Admin", email: "alice@gov-ai.com", lastLogin: "23/08/2025" },
];

// Exemple de statistiques de visites (données fictives)
const userStats = [
  { month: "Jan", visits: 120 },
  { month: "Fév", visits: 180 },
  { month: "Mar", visits: 150 },
  { month: "Avr", visits: 200 },
  { month: "Mai", visits: 170 },
  { month: "Juin", visits: 220 },
  { month: "Juil", visits: 190 },
  { month: "Août", visits: 210 },
];

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);

  // Calcul pour le graphique
  const maxVisits = Math.max(...userStats.map(s => s.visits));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/dashboard/pages/ManageContents')}
              className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Retour
            </button>
            <img
              src="/images/armoiries_logo_cenadi.png"
              alt="Logo"
              className="h-10"
            />
            <span className="text-xl font-bold">GOV-AI</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Gestion des utilisateurs
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{users.length} comptes enregistrés</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'un nouvel utilisateur !")}
              >
                <FiPlus className="mr-2" /> Ajouter un utilisateur
              </button>
            </div>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">Nom</th>
                  <th className="text-left py-2 px-4">Rôle</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Dernière connexion</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-green-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2"><FiEdit2 /></button>
                      <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-6">Aucun utilisateur enregistré</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Graphique des statistiques de visites */}
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Statistiques des visites utilisateurs</h2>
              <div className="flex items-end space-x-2 h-40">
                {userStats.map(stat => (
                  <div key={stat.month} className="flex flex-col items-center justify-end h-full">
                    <div
                      className="w-8 rounded-t-lg bg-gradient-to-t from-green-500 to-yellow-400 shadow"
                      style={{ height: `${(stat.visits / maxVisits) * 100}%` }}
                      title={`${stat.visits} visites`}
                    ></div>
                    <span className="text-xs text-gray-700 mt-2">{stat.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-green-700 font-medium">
                Total visites sur l'année : {userStats.reduce((acc, s) => acc + s.visits, 0)}
              </div>
            </div>

                    <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
                      <p className="text-green-700 font-medium">
                        Conseil : Attribuez des rôles adaptés à chaque utilisateur pour sécuriser la gestion du site vitrine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> );
};

export default Users;