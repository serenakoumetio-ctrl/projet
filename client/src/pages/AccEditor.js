import React, { useState, useEffect } from 'react';
import ImageSelector from '../components/ImageSelector'; // Vérifier cet import

const API_BASE = 'http://localhost:5000/api';

const AccEditor = () => {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    backgroundImage: ""
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/accueil`);
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

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/accueil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Section Accueil sauvegardée!");
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Édition - Section Accueil</h1>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre principal</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Titre de la section accueil"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sous-titre</label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full p-3 border rounded h-24"
            placeholder="Description sous le titre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Texte du bouton</label>
          <input
            type="text"
            value={content.buttonText}
            onChange={(e) => handleChange('buttonText', e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Texte du bouton"
          />
        </div>

        {/* Sélecteur d'image */}
        <ImageSelector
          value={content.backgroundImage}
          onChange={(imageUrl) => handleChange('backgroundImage', imageUrl)}
          label="Image de fond"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  );
};

export default AccEditor;