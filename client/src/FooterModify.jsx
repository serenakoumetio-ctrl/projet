import React, { useState } from 'react';
import { FiArrowLeft, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FooterModify = () => {
  const navigate = useNavigate();
  const [text1, setText1] = useState("Texte du footer par défaut");
  const [imageUrl, setImageUrl] = useState("");
  const [text2, setText2] = useState("Copyright © 2025 GOV-AI");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar (identique à ModifyDesign) */}
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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Que voulez-vous modifier au sein du footer ?
            </h1>

            {/* Champ 1 : Texte */}
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-lg font-medium text-gray-700">Texte principal</label>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Champ 2 : Image */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-lg font-medium text-gray-700">Image/Logo</label>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL de l'image"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Champ 3 : Copyright */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-lg font-medium text-gray-700">Texte de copyright</label>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Pied de carte avec conseils */}
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Pour une meilleure accessibilité, utilisez des images avec un bon contraste et un texte alternatif.
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-yellow-600 transition-colors"
                onClick={() => alert('Modifications enregistrées !')}
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterModify;
