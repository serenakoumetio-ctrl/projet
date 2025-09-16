import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiImage, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialMedias = [
  { id: 1, name: "banniere.jpg", type: "Image", date: "18/08/2025", uploader: "Admin" },
  { id: 2, name: "rapport2025.pdf", type: "Document", date: "15/08/2025", uploader: "Rédacteur" },
  { id: 3, name: "logo.png", type: "Image", date: "10/08/2025", uploader: "Modérateur" },
];

const Medias = () => {
  const navigate = useNavigate();
  const [medias, setMedias] = useState(initialMedias);

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
              Gestion des médias
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{medias.length} médias enregistrés</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'un nouveau média !")}
              >
                <FiPlus className="mr-2" /> Ajouter un média
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">Nom</th>
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Uploader</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medias.map(media => (
                  <tr key={media.id} className="border-b border-gray-100 hover:bg-green-50">
                    <td className="py-3 px-4">{media.name}</td>
                    <td className="py-3 px-4">{media.type}</td>
                    <td className="py-3 px-4">{media.date}</td>
                    <td className="py-3 px-4">{media.uploader}</td>
                    <td className="py-3 px-4">
                      <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
                {medias.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-6">Aucun média enregistré</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Optimisez la taille de vos images pour améliorer la rapidité de chargement du site vitrine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medias;