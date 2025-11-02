import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const ImageSelector = ({ value, onChange, label }) => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les images disponibles
  useEffect(() => {
    if (showModal) {
      loadImages();
    }
  }, [showModal]);

  const loadImages = async () => {
    try {
      setLoading(true);
      
      // Charger images par défaut
      const defaultResponse = await fetch(`${API_BASE}/upload/default-images`);
      const defaultData = await defaultResponse.json();
      
      // Charger images uploadées
      const uploadedResponse = await fetch(`${API_BASE}/upload/uploaded-images`);
      const uploadedData = await uploadedResponse.json();
      
      if (defaultData.success && uploadedData.success) {
        setImages([...uploadedData.images, ...defaultData.images]);
      }
    } catch (error) {
      console.error('Erreur chargement images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Recharger la liste des images
        await loadImages();
        // Sélectionner la nouvelle image
        onChange(result.imageUrl);
        alert('✅ Image téléchargée avec succès!');
      } else {
        alert('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('❌ Erreur lors du téléchargement');
    }
  };

  return (
    <div className="image-selector">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      
      {/* Aperçu actuel */}
      <div className="mb-3 p-3 bg-gray-50 rounded border">
        <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
        <div className="flex items-center space-x-4">
          <img 
            src={`http://localhost:5000${value}`}
            alt="Aperçu" 
            className="h-16 w-24 object-cover rounded border"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA5NiA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEMzMiAyNi4yMDkxIDMwLjIwOTEgMjggMjggMjhDMjUuNzkwOSAyOCAyNCAyNi4yMDkxIDI0IDI0QzI0IDIxLjc5MDkgMjUuNzkwOSAyMCAyOCAyMEMzMC4yMDkxIDIwIDMyIDIxLjc5MDkgMzIgMjRaIiBmaWxsPSIjOEU5MEE2Ii8+CjxwYXRoIGQ9Ik03MiA0MEw1NiA1Mkw0MCA0MEwyOCA1MlY1Nkg3MlY1MloiIGZpbGw9IiM4RTlBQTYiLz4KPC9zdmc+';
            }}
          />
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
          >
            Changer l'image
          </button>
        </div>
      </div>

      {/* Modal de sélection */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* En-tête */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Choisir une image</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto p-4">
              
              {/* Section Upload */}
              <div className="mb-6 p-4 bg-blue-50 rounded border">
                <h4 className="font-medium mb-3 text-blue-800">
                  📤 Télécharger une nouvelle image
                </h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  <span className="text-sm text-gray-500">(max 5MB)</span>
                </div>
              </div>

              {/* Galerie */}
              <div>
                <h4 className="font-medium mb-3">🖼️ Images disponibles</h4>
                
                {loading ? (
                  <p className="text-center py-8 text-gray-500">Chargement des images...</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`border-2 rounded-lg cursor-pointer overflow-hidden transition-all ${
                          value === imageUrl 
                            ? 'border-green-500 ring-2 ring-green-200' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => {
                          onChange(imageUrl);
                          setShowModal(false);
                        }}
                      >
                        <img
                          src={`http://localhost:5000${imageUrl}`}
                          alt={`Option ${index + 1}`}
                          className="h-24 w-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA5NiA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEMzMiAyNi4yMDkxIDMwLjIwOTEgMjggMjggMjhDMjUuNzkwOSAyOCAyNCAyNi4yMDkxIDI0IDI0QzI0IDIxLjc5MDkgMjUuNzkwOSAyMCAyOCAyMEMzMC4yMDkxIDIwIDMyIDIxLjc5MDkgMzIgMjRaIiBmaWxsPSIjOEU5MEE2Ii8+CjxwYXRoIGQ9Ik03MiA0MEw1NiA1Mkw0MCA0MEwyOCA1MlY1Nkg3MlY1MloiIGZpbGw9IiM4RTlBQTYiLz4KPC9zdmc+';
                          }}
                        />
                        <div className="p-2 text-xs text-center text-gray-600 bg-white">
                          {imageUrl.includes('/uploads/') ? '📁 Votre image' : '⭐ Par défaut'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pied de page */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;