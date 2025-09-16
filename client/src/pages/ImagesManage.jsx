import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiImage, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialImages = [
  { id: 1, name: "banniere.jpg", url: "https://via.placeholder.com/300x100", date: "18/08/2025", uploader: "Admin" },
  { id: 2, name: "logo.png", url: "https://via.placeholder.com/100x100", date: "15/08/2025", uploader: "Rédacteur" },
  { id: 3, name: "illustration.jpg", url: "https://via.placeholder.com/200x150", date: "10/08/2025", uploader: "Modérateur" },
];

const ImagesManage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState(initialImages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
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
            <span className="text-xl font-bold">GOV-AI_Admin</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Gérer les images du site vitrine
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{images.length} images enregistrées</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'une nouvelle image !")}
              >
                <FiPlus className="mr-2" /> Ajouter une image
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {images.map(image => (
                <div key={image.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md flex flex-col items-center">
                  <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded mb-2" />
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{image.name}</h3>
                      <p className="text-xs text-gray-500">Ajoutée le {image.date} par {image.uploader}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <div className="col-span-2 text-center text-gray-400 py-6">Aucune image enregistrée</div>
              )}
            </div>
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Utilisez des images optimisées pour garantir la rapidité et la qualité d’affichage sur le site vitrine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesManage;