import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

// Options d'icônes disponibles
const ICON_OPTIONS = [
  { value: "MagnifyingGlassCircleIcon", label: "🔍 Loupe (Recherche)" },
  { value: "BellAlertIcon", label: "🔔 Cloche (Alertes)" },
  { value: "DocumentCheckIcon", label: "📄 Document (Analyse)" },
  { value: "ChatBubbleBottomCenterTextIcon", label: "💬 Chat (Assistance)" },
  { value: "DevicePhoneMobileIcon", label: "📱 Mobile (Multi-plateforme)" },
  { value: "GlobeAltIcon", label: "🌐 Globe (International)" },
  { value: "ShieldCheckIcon", label: "🛡️ Bouclier (Sécurité)" },
  { value: "BoltIcon", label: "⚡ Éclair (Rapidité)" },
  { value: "UserGroupIcon", label: "👥 Utilisateurs (Collaboration)" },
  { value: "CogIcon", label: "⚙️ Rouage (Configuration)" }
];

const FonctionnaliteEditor = () => {
  const [content, setContent] = useState({
    title: "",
    features: []
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/fonctionnalite`);
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

  const handleFeatureChange = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const addFeature = () => {
    setContent(prev => ({
      ...prev,
      features: [...prev.features, { 
        title: '', 
        description: '', 
        icon: 'MagnifyingGlassCircleIcon' 
      }]
    }));
  };

  const removeFeature = (index) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const moveFeature = (index, direction) => {
    const newFeatures = [...content.features];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newFeatures.length) {
      [newFeatures[index], newFeatures[targetIndex]] = [newFeatures[targetIndex], newFeatures[index]];
      setContent(prev => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/fonctionnalite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Section Fonctionnalités sauvegardée!");
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
      <h1 className="text-2xl font-bold mb-6">Édition - Section Fonctionnalités</h1>
      
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
            placeholder="Titre de la section Fonctionnalités"
          />
        </div>

        {/* Fonctionnalités */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Fonctionnalités</h3>
            <button
              onClick={addFeature}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter une fonctionnalité
            </button>
          </div>

          <div className="space-y-6">
            {content.features.map((feature, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-lg">Fonctionnalité {index + 1}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveFeature(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le haut"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveFeature(index, 'down')}
                      disabled={index === content.features.length - 1}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le bas"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeFeature(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Titre de la fonctionnalité</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: Recherche intelligente"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Icône</label>
                    <select
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {ICON_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm mb-2">Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded h-24"
                    placeholder="Description détaillée de la fonctionnalité..."
                  />
                </div>

                {/* Aperçu de la fonctionnalité */}
                <div className="mt-4 p-3 bg-white border rounded">
                  <h5 className="text-sm font-medium mb-2 text-gray-600">Aperçu :</h5>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm">
                        {ICON_OPTIONS.find(opt => opt.value === feature.icon)?.label.split(' ')[0]}
                      </span>
                    </div>
                    <div>
                      <h6 className="font-medium text-green-700">{feature.title || "Titre de la fonctionnalité"}</h6>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description || "Description de la fonctionnalité..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.features.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune fonctionnalité ajoutée.</p>
              <p className="text-sm">Cliquez sur "Ajouter une fonctionnalité" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-600">
            {content.features.length} fonctionnalité(s) configurée(s)
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder les fonctionnalités'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FonctionnaliteEditor;