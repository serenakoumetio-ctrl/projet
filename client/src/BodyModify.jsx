import React, { useState } from "react";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const BodyModify = () => {
  const navigate = useNavigate();

  // --- Présentation ---
  const [title, setTitle] = useState("Notre Présentation");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [subtitle, setSubtitle] = useState("Découvrez qui nous sommes");
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

  // --- Images ---
  const [images, setImages] = useState([
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
  ]);

  // --- Fonctionnalités (6 champs) ---
  const [features, setFeatures] = useState([
    { title: "Fonctionnalité 1", subtitle: "Description 1" },
    { title: "Fonctionnalité 2", subtitle: "Description 2" },
    { title: "Fonctionnalité 3", subtitle: "Description 3" },
    { title: "Fonctionnalité 4", subtitle: "Description 4" },
    { title: "Fonctionnalité 5", subtitle: "Description 5" },
    { title: "Fonctionnalité 6", subtitle: "Description 6" },
  ]);

  // --- Avantages (6 champs) ---
  const [advantages, setAdvantages] = useState([
    { title: "Avantage 1", subtitle: "Détail 1" },
    { title: "Avantage 2", subtitle: "Détail 2" },
    { title: "Avantage 3", subtitle: "Détail 3" },
    { title: "Avantage 4", subtitle: "Détail 4" },
    { title: "Avantage 5", subtitle: "Détail 5" },
    { title: "Avantage 6", subtitle: "Détail 6" },
  ]);

  // --- Fonctions helpers ---
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };

  const handleUpdateImage = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleFeatureUpdate = (index, field, value) => {
    const newFeatures = [...features];
    newFeatures[index][field] = value;
    setFeatures(newFeatures);
  };

  const handleAdvantageUpdate = (index, field, value) => {
    const newAdvantages = [...advantages];
    newAdvantages[index][field] = value;
    setAdvantages(newAdvantages);
  };
  const handleSave = () => {
  alert("Les modifications ont bien été enregistrées !");
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar identique */}
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/modify-design")}
              className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Retour
            </button>
            <img
              src="/images/armoiries_logo_cenadi.png"
              alt="Logo Dashboard"
              className="h-10"
            />
            <span className="text-xl font-bold">GOV-AI</span>
          </div>

           <div className="flex items-center space-x-4">
                      <FiBell className="text-xl cursor-pointer" />
                      <FiUser className="text-xl cursor-pointer" />
                      <FiSettings className="text-xl cursor-pointer" />
                      <FiLogOut className="text-xl cursor-pointer" />
             </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-6xl mx-auto bg-[#FFF9C4] rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-10">
            <h1 className="text-3xl font-bold text-green-700">
              Modifier le Body du site vitrine
            </h1>

            {/* --- Section Présentation --- */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Présentation
              </h2>
              {/* Titre */}
              <div className="flex items-center space-x-4">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="flex-1 text-gray-700">{title}</p>
                )}
                <button
                  onClick={() => setIsEditingTitle(!isEditingTitle)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => setTitle("")}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
              {/* Sous-titre */}
              <div className="flex items-center space-x-4">
                {isEditingSubtitle ? (
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                ) : (
                  <p className="flex-1 text-gray-700">{subtitle}</p>
                )}
                <button
                  onClick={() => setIsEditingSubtitle(!isEditingSubtitle)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => setSubtitle("")}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            {/* --- Section Images --- */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Images</h2>
              {images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {img && <img src={img} alt={`img-${index}`} className="object-cover w-full h-full" />}
                  </div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleUpdateImage(index, e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* --- Section Fonctionnalités --- */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Fonctionnalités
              </h2>
              {features.map((f, index) => (
                <div key={index} className="space-y-2 border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={f.title}
                      onChange={(e) =>
                        handleFeatureUpdate(index, "title", e.target.value)
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleFeatureUpdate(index, "title", "")
                      }
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={f.subtitle}
                      onChange={(e) =>
                        handleFeatureUpdate(index, "subtitle", e.target.value)
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleFeatureUpdate(index, "subtitle", "")
                      }
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Section Avantages --- */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Avantages
              </h2>
              {advantages.map((a, index) => (
                <div key={index} className="space-y-2 border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={a.title}
                      onChange={(e) =>
                        handleAdvantageUpdate(index, "title", e.target.value)
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleAdvantageUpdate(index, "title", "")
                      }
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={a.subtitle}
                      onChange={(e) =>
                        handleAdvantageUpdate(index, "subtitle", e.target.value)
                      }
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        handleAdvantageUpdate(index, "subtitle", "")
                      }
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bouton Enregistrer les modifications */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:from-green-600 hover:to-yellow-600 transition-colors"
        >
          ✅ Enregistrer les modifications
        </button>
      </div>
    </div>
  );
};

export default BodyModify;
