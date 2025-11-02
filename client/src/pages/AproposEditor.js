import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const AproposEditor = () => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    cards: [],
    conclusion: {
      title: "",
      points: []
    }
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/apropos`);
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

  const handleCardChange = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      cards: prev.cards.map((card, i) => 
        i === index ? { ...card, [field]: value } : card
      )
    }));
  };

  const handlePointChange = (index, value) => {
    setContent(prev => ({
      ...prev,
      conclusion: {
        ...prev.conclusion,
        points: prev.conclusion.points.map((point, i) => 
          i === index ? value : point
        )
      }
    }));
  };

  const addCard = () => {
    setContent(prev => ({
      ...prev,
      cards: [...prev.cards, { title: '', content: '' }]
    }));
  };

  const removeCard = (index) => {
    setContent(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
  };

  const addPoint = () => {
    setContent(prev => ({
      ...prev,
      conclusion: {
        ...prev.conclusion,
        points: [...prev.conclusion.points, '']
      }
    }));
  };

  const removePoint = (index) => {
    setContent(prev => ({
      ...prev,
      conclusion: {
        ...prev.conclusion,
        points: prev.conclusion.points.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/apropos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Section À Propos sauvegardée!");
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
      <h1 className="text-2xl font-bold mb-6">Édition - Section À Propos</h1>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Titre principal */}
        <div>
          <label className="block text-sm font-medium mb-2">Titre principal</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-3 border rounded"
            placeholder="Titre de la section À Propos"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description principale</label>
          <textarea
            value={content.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-3 border rounded h-32"
            placeholder="Description détaillée de GOV-AI"
          />
        </div>

        {/* Cartes */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Cartes informatives</h3>
            <button
              onClick={addCard}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter une carte
            </button>
          </div>

          <div className="space-y-4">
            {content.cards.map((card, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Carte {index + 1}</h4>
                  <button
                    onClick={() => removeCard(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Titre de la carte</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Titre de la carte"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Contenu de la carte</label>
                    <textarea
                      value={card.content}
                      onChange={(e) => handleCardChange(index, 'content', e.target.value)}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Contenu détaillé"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Section de conclusion</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre de conclusion</label>
              <input
                type="text"
                value={content.conclusion?.title || ''}
                onChange={(e) => handleChange('conclusion', {
                  ...content.conclusion,
                  title: e.target.value
                })}
                className="w-full p-3 border rounded"
                placeholder="Titre de la section conclusion"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">Points de conclusion</label>
                <button
                  onClick={addPoint}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  + Ajouter un point
                </button>
              </div>
              
              <div className="space-y-2">
                {content.conclusion?.points.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder={`Point ${index + 1}`}
                    />
                    <button
                      onClick={() => removePoint(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder la section'}
        </button>
      </div>
    </div>
  );
};

export default AproposEditor;