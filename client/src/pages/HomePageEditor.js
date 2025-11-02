import React, { useState, useEffect } from 'react';
import ImageSelector from '../components/ImageSelector';

const API_BASE = 'http://localhost:5000/api';

const HomePageEditor = () => {
  const [content, setContent] = useState({
    title: "",
    paragraphs: [],
    carouselImages: []
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/homepage`);
      const result = await response.json();
      if (result.success) {
        setContent(result.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleParagraphChange = (index, value) => {
    setContent(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((paragraph, i) => 
        i === index ? value : paragraph
      )
    }));
  };

  const handleCarouselImageChange = (index, value) => {
    setContent(prev => ({
      ...prev,
      carouselImages: prev.carouselImages.map((image, i) => 
        i === index ? value : image
      )
    }));
  };

  const addParagraph = () => {
    setContent(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, '']
    }));
  };

  const removeParagraph = (index) => {
    setContent(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index)
    }));
  };

  const addCarouselImage = () => {
    setContent(prev => ({
      ...prev,
      carouselImages: [...prev.carouselImages, '']
    }));
  };

  const removeCarouselImage = (index) => {
    setContent(prev => ({
      ...prev,
      carouselImages: prev.carouselImages.filter((_, i) => i !== index)
    }));
  };

  const moveParagraph = (index, direction) => {
    const newParagraphs = [...content.paragraphs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newParagraphs.length) {
      [newParagraphs[index], newParagraphs[targetIndex]] = [newParagraphs[targetIndex], newParagraphs[index]];
      setContent(prev => ({ ...prev, paragraphs: newParagraphs }));
    }
  };

  const moveCarouselImage = (index, direction) => {
    const newImages = [...content.carouselImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      setContent(prev => ({ ...prev, carouselImages: newImages }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/homepage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Section HomePage sauvegardée!");
      } else {
        setMessage("❌ Erreur lors de la sauvegarde");
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Édition - Section HomePage</h1>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Titre principal */}
        <div>
          <label className="block text-sm font-medium mb-2">Titre principal</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Titre de la section HomePage"
          />
        </div>

        {/* Paragraphes */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Paragraphes de texte</h3>
            <button
              onClick={addParagraph}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter un paragraphe
            </button>
          </div>

          <div className="space-y-4">
            {content.paragraphs.map((paragraph, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Paragraphe {index + 1}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveParagraph(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le haut"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveParagraph(index, 'down')}
                      disabled={index === content.paragraphs.length - 1}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le bas"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeParagraph(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  className="w-full p-3 border rounded h-24"
                  placeholder="Saisissez le contenu du paragraphe..."
                />
                
                <div className="mt-2 text-xs text-gray-500">
                  {paragraph.length} caractères
                </div>
              </div>
            ))}
          </div>

          {content.paragraphs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun paragraphe ajouté.</p>
              <p className="text-sm">Cliquez sur "Ajouter un paragraphe" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Carrousel d'images */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Images du carrousel</h3>
            <button
              onClick={addCarouselImage}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter une image
            </button>
          </div>

          <div className="space-y-4">
            {content.carouselImages.map((image, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Image {index + 1}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveCarouselImage(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le haut"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveCarouselImage(index, 'down')}
                      disabled={index === content.carouselImages.length - 1}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le bas"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeCarouselImage(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <ImageSelector
                  value={image}
                  onChange={(imageUrl) => handleCarouselImageChange(index, imageUrl)}
                  label="Sélectionner l'image"
                />
                
                {/* Aperçu de l'image */}
                {image && (
                  <div className="mt-3 p-3 bg-white border rounded">
                    <h5 className="text-sm font-medium mb-2 text-gray-600">Aperçu :</h5>
                    <img 
                      src={`http://localhost:5000${image}`}
                      alt={`Aperçu ${index + 1}`}
                      className="h-32 w-full object-cover rounded border"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDQwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgNDhDMTYwIDU1LjA0NiAxNTEuMDQ2IDY0IDE0MCA2NEMxMjguOTU0IDY0IDEyMCA1NS4wNDYgMTIwIDQ4QzEyMCA0MC45NTQgMTI4Ljk1NCAzMiAxNDAgMzJDMTUxLjA0NiAzMiAxNjAgNDAuOTU0IDE2MCA0OFoiIGZpbGw9IiM4RTlBNjYiLz4KPHBhdGggZD0iTTI4MCA2NEwyMjAgOTZMMTYwIDY0TDEyMCA5NlYxMDRIMjgwVjk2WiIgZmlsbD0iIzhFOUE2NiIvPgo8L3N2Zz4=';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {content.carouselImages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune image ajoutée au carrousel.</p>
              <p className="text-sm">Cliquez sur "Ajouter une image" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Aperçu global */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="text-lg font-medium mb-4">Aperçu de la section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Texte :</h4>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-green-700">{content.title || "Titre de la section"}</h3>
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {paragraph || `Paragraphe ${index + 1}...`}
                  </p>
                ))}
                {content.paragraphs.length === 0 && (
                  <p className="text-sm text-gray-400 italic">Aucun paragraphe configuré</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Carrousel :</h4>
              <div className="border rounded p-3 bg-white">
                {content.carouselImages.length > 0 ? (
                  <div className="space-y-2">
                    {content.carouselImages.slice(0, 3).map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <img 
                          src={`http://localhost:5000${image}`}
                          alt={`Aperçu ${index + 1}`}
                          className="h-12 w-16 object-cover rounded border"
                        />
                        <span className="text-sm text-gray-600">Image {index + 1}</span>
                      </div>
                    ))}
                    {content.carouselImages.length > 3 && (
                      <p className="text-xs text-gray-500">
                        + {content.carouselImages.length - 3} autre(s) image(s)
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Aucune image dans le carrousel</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-600">
            {content.paragraphs.length} paragraphe(s) • {content.carouselImages.length} image(s)
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder la section'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageEditor;