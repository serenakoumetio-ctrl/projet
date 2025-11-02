import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const ImageSelector = ({ value, onChange, label }) => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
      loadImages();
    }
  }, [showModal]);

  const loadImages = async () => {
    try {
      setLoading(true);
      
      const [defaultRes, uploadedRes] = await Promise.all([
        fetch(`${API_BASE}/upload/default-images`),
        fetch(`${API_BASE}/upload/uploaded-images`)
      ]);
      
      const defaultData = await defaultRes.json();
      const uploadedData = await uploadedRes.json();
      
      if (defaultData.success && uploadedData.success) {
        setImages([...uploadedData.images, ...defaultData.images]);
      }
    } catch (error) {
      console.error('Erreur:', error);
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
        await loadImages();
        onChange(result.imageUrl);
        alert('✅ Image téléchargée!');
      } else {
        alert('❌ ' + result.message);
      }
    } catch (error) {
      alert('❌ Erreur lors du téléchargement');
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      
      {/* Aperçu */}
      <div className="mb-3 p-3 bg-gray-50 rounded border">
        <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
        <div className="flex items-center space-x-4">
          <img 
            src={`http://localhost:5000${value}`}
            alt="Aperçu" 
            className="h-16 w-24 object-cover rounded border"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Choisir une image</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl">
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Upload */}
              <div className="mb-6 p-4 bg-blue-50 rounded border">
                <h4 className="font-medium mb-3">📤 Télécharger une image</h4>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>

              {/* Galerie */}
              <div>
                <h4 className="font-medium mb-3">🖼️ Images disponibles</h4>
                {loading ? (
                  <p className="text-center py-8">Chargement...</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`border-2 rounded-lg cursor-pointer overflow-hidden ${
                          value === imageUrl ? 'border-green-500' : 'border-gray-200'
                        }`}
                        onClick={() => {
                          onChange(imageUrl);
                          setShowModal(false);
                        }}
                      >
                        <img
                          src={`http://localhost:5000${imageUrl}`}
                          alt={`Option ${index + 1}`}
                          className="h-20 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t">
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