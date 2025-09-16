import React, { useState } from 'react';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HeaderModify = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState('https://via.placeholder.com/1200x400/0099ff/ffffff?text=Header+Site+Vitrine');
  const [isEditingBackground, setIsEditingBackground] = useState(false);
  const [title, setTitle] = useState('Bienvenue sur notre site vitrine');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [subtitle, setSubtitle] = useState('Découvrez nos services et solutions');
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

  // Ajout de champs requis
  const [backgroundError, setBackgroundError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [subtitleError, setSubtitleError] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const handleBackgroundEdit = () => setIsEditingBackground(!isEditingBackground);
  const handleBackgroundUrlChange = (e) => setBackgroundImage(e.target.value);
  const handleTitleEdit = () => setIsEditingTitle(!isEditingTitle);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSubtitleEdit = () => setIsEditingSubtitle(!isEditingSubtitle);
  const handleSubtitleChange = (e) => setSubtitle(e.target.value);
  const handleDeleteBackground = () => setBackgroundImage('');
  const handleDeleteTitle = () => setTitle('');
  const handleDeleteSubtitle = () => setSubtitle('');

  // Validation des champs
  const handleValidate = () => {
    let valid = true;
    setBackgroundError('');
    setTitleError('');
    setSubtitleError('');
    if (!backgroundImage) {
      setBackgroundError("L'URL de l'image est requise.");
      valid = false;
    }
    if (!title) {
      setTitleError("Le titre est requis.");
      valid = false;
    }
    if (!subtitle) {
      setSubtitleError("Le sous-titre est requis.");
      valid = false;
    }
    setShowValidation(true);
    if (valid) {
      alert('Modifications validées !');
      setIsEditingBackground(false);
      setIsEditingTitle(false);
      setIsEditingSubtitle(false);
      setShowValidation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar du Dashboard (identique) */}
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/modify-design')}
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
        </div>
      </nav>

      {/* Contenu principal (avec marge pour la navbar fixe) */}
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-6xl mx-auto bg-[#FFF9C4] rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* En-tête de la section d'édition */}
            <div className="flex items-center mb-8">
              <h1 className="text-3xl font-bold text-green-700">
                Modifier le Header du site vitrine
              </h1>
            </div>

            {/* Section d'édition du header */}
            <div className="space-y-8">
              {/* Image de fond */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Image de fond</h2>
                <div className="flex items-center space-x-6">
                  <div className="w-48 h-24 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                    {backgroundImage && (
                      <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">URL actuelle : {backgroundImage}</p>
                    {isEditingBackground && (
                      <input
                        type="text"
                        value={backgroundImage}
                        onChange={handleBackgroundUrlChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nouvelle URL de l'image"
                        required
                      />
                    )}
                    {showValidation && backgroundError && (
                      <span className="text-red-600 text-sm">{backgroundError}</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleBackgroundEdit}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit className="text-xl" />
                    </button>
                    <button
                      onClick={handleDeleteBackground}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Titre */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Titre</h2>
                <div className="flex items-center space-x-6">
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">Texte actuel : {title}</p>
                    {isEditingTitle && (
                      <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nouveau titre"
                        required
                      />
                    )}
                    {showValidation && titleError && (
                      <span className="text-red-600 text-sm">{titleError}</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleTitleEdit}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit className="text-xl" />
                    </button>
                    <button
                      onClick={handleDeleteTitle}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sous-titre */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sous-titre</h2>
                <div className="flex items-center space-x-6">
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">Texte actuel : {subtitle}</p>
                    {isEditingSubtitle && (
                      <input
                        type="text"
                        value={subtitle}
                        onChange={handleSubtitleChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nouveau sous-titre"
                        required
                      />
                    )}
                    {showValidation && subtitleError && (
                      <span className="text-red-600 text-sm">{subtitleError}</span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSubtitleEdit}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit className="text-xl" />
                    </button>
                    <button
                      onClick={handleDeleteSubtitle}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-end mt-8">
              <button
                className="bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-green-600 hover:to-yellow-600 transition-colors"
                onClick={handleValidate}
              >
                Valider les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderModify;