import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialArticles = [
  { id: 1, title: "Nouvelle loi 2025", date: "18/08/2025", author: "Admin" },
  { id: 2, title: "Interview du DG", date: "15/08/2025", author: "Rédacteur" },
  { id: 3, title: "Rapport annuel", date: "10/08/2025", author: "Modérateur" },
];

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(initialArticles);

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
              Articles publiés
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{articles.length} articles publiés</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'un nouvel article !")}
              >
                <FiPlus className="mr-2" /> Ajouter un article
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">Titre</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Auteur</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="border-b border-gray-100 hover:bg-green-50">
                    <td className="py-3 px-4">{article.title}</td>
                    <td className="py-3 px-4">{article.date}</td>
                    <td className="py-3 px-4">{article.author}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2"><FiEdit2 /></button>
                      <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-6">Aucun article publié</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Ajoutez régulièrement des articles pour garder votre site dynamique et attractif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;