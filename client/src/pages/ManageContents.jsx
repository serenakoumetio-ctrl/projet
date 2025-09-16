import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiSearch, FiEdit2, FiTrash2, FiFileText, FiImage, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ManageContents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const contentCategories = [
    {
      id: 1,
      title: "Articles",
      icon: <FiFileText className="text-xl" />,
      count: 12,
      description: "Gérez les articles et actualités du site",
      path: "/Article",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Pages statiques",
      icon: <FiFileText className="text-xl" />,
      count: 5,
      description: "Modifiez les pages fixes (Accueil, Contact, etc.)",
      path: "/pages",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Médias",
      icon: <FiImage className="text-xl" />,
      count: 43,
      description: "Uploadez et gérez les images et documents",
      path: "/medias",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "Utilisateurs",
      icon: <FiUsers className="text-xl" />,
      count: 8,
      description: "Ajoutez ou modifiez les comptes utilisateurs",
      path: "/users",
      color: "bg-yellow-500"
    }
  ];

  const recentActivities = [
    { id: 1, action: "Article 'Nouvelle loi 2025' publié", date: "18/08/2025", user: "Admin" },
    { id: 2, action: "Page 'Contact' mise à jour", date: "17/08/2025", user: "Modérateur" },
    { id: 3, action: "3 images ajoutées à la galerie", date: "16/08/2025", user: "Rédacteur" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar (identique) */}
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/dashboard')}
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

      {/* Contenu principal */}
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Gestion des contenus
            </h1>

            {/* Barre de recherche et bouton ajouter */}
            <div className="flex justify-between items-center mb-8">
              <div className="relative w-1/2">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un contenu..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // Navigation automatique si correspondance exacte
                    const found = contentCategories.find(category =>
                      category.title.toLowerCase() === e.target.value.trim().toLowerCase()
                    );
                    if (found) {
                      navigate(found.path);
                    }
                  }}
                />
              </div>
              <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <FiPlus className="mr-2" /> Ajouter un contenu
              </button>
            </div>

            {/* Catégories de contenu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {contentCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => navigate(category.path)}
                  className="bg-gray-50 p-6 rounded-lg hover:bg-green-50 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className={`p-3 mb-4 ${category.color} rounded-full text-white`}>
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{category.title}</h2>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.count} éléments</span>
                    <span className="text-green-500 text-lg">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activités récentes */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Activités récentes</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4">Action</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Utilisateur</th>
                    <th className="text-left py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 hover:bg-white">
                      <td className="py-3 px-4">{activity.action}</td>
                      <td className="py-3 px-4">{activity.date}</td>
                      <td className="py-3 px-4">{activity.user}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-500 hover:text-blue-700 mr-2"><FiEdit2 /></button>
                        <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pied de carte avec conseils */}
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Pour une maintenance optimale, archivez régulièrement les anciens contenus et vérifiez les liens morts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContents;
