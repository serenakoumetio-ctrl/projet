import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

// Options d'icônes pour le menu
const MENU_ICON_OPTIONS = [
  { value: "FaInfoCircle", label: "ℹ️ Info (À propos)" },
  { value: "FaCogs", label: "⚙️ Rouages (Fonctionnalités)" },
  { value: "FaServicestack", label: "🛠️ Services" },
  { value: "FaEnvelope", label: "✉️ Envelope (Contact)" },
  { value: "FaHome", label: "🏠 Maison (Accueil)" },
  { value: "FaUser", label: "👤 Utilisateur" },
  { value: "FaShield", label: "🛡️ Sécurité" },
  { value: "FaGlobe", label: "🌐 Globe" },
  { value: "FaPhone", label: "📞 Téléphone" },
  { value: "FaQuestionCircle", label: "❓ Question" }
];

const NavbarEditor = () => {
  const [content, setContent] = useState({
    logoText: "",
    menuItems: [],
    themeToggle: true
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/navbar`);
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

  const handleMenuItemChange = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      menuItems: prev.menuItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addMenuItem = () => {
    setContent(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, { 
        name: '', 
        href: '#', 
        icon: 'FaInfoCircle' 
      }]
    }));
  };

  const removeMenuItem = (index) => {
    setContent(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }));
  };

  const moveMenuItem = (index, direction) => {
    const newItems = [...content.menuItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      setContent(prev => ({ ...prev, menuItems: newItems }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/navbar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Navigation sauvegardée!");
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
      <h1 className="text-2xl font-bold mb-6">Édition - Navigation (Navbar)</h1>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Configuration générale */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Configuration générale</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Texte du logo</label>
              <input
                type="text"
                value={content.logoText}
                onChange={(e) => handleChange('logoText', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Ex: GOV-AI"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="themeToggle"
                checked={content.themeToggle}
                onChange={(e) => handleChange('themeToggle', e.target.checked)}
                className="w-4 h-4 text-green-500 rounded"
              />
              <label htmlFor="themeToggle" className="text-sm font-medium">
                Afficher le bouton de changement de thème
              </label>
            </div>
          </div>
        </div>

        {/* Éléments du menu */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Éléments du menu</h3>
            <button
              onClick={addMenuItem}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter un élément
            </button>
          </div>

          <div className="space-y-4">
            {content.menuItems.map((item, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-lg">Élément {index + 1}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveMenuItem(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le haut"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveMenuItem(index, 'down')}
                      disabled={index === content.menuItems.length - 1}
                      className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                      title="Déplacer vers le bas"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Nom de l'élément</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: À propos"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Lien (URL ou ancre)</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleMenuItemChange(index, 'href', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: #apropos ou /page"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Icône</label>
                    <select
                      value={item.icon}
                      onChange={(e) => handleMenuItemChange(index, 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {MENU_ICON_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Aperçu de l'élément */}
                <div className="mt-4 p-3 bg-white border rounded">
                  <h5 className="text-sm font-medium mb-2 text-gray-600">Aperçu :</h5>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {MENU_ICON_OPTIONS.find(opt => opt.value === item.icon)?.label.split(' ')[0]}
                    </span>
                    <span className="font-medium text-gray-700">
                      {item.name || "Nom de l'élément"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({item.href || "lien"})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.menuItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun élément de menu ajouté.</p>
              <p className="text-sm">Cliquez sur "Ajouter un élément" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Aperçu de la navigation */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="text-lg font-medium mb-4">Aperçu de la navigation</h3>
          
          <div className="bg-white rounded-lg border overflow-hidden">
            {/* Barre de navigation simulée */}
            <div className="bg-white/80 backdrop-blur-md border-b p-4">
              <div className="flex justify-between items-center">
                {/* Logo et thème */}
                <div className="flex items-center space-x-4">
                  {content.themeToggle && (
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 text-sm">☀️</span>
                    </div>
                  )}
                  <div className="text-yellow-400 font-bold text-xl">
                    {content.logoText || "LOGO"}
                  </div>
                </div>

                {/* Menu desktop */}
                <div className="hidden md:flex space-x-6">
                  {content.menuItems.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                      <span>{MENU_ICON_OPTIONS.find(opt => opt.value === item.icon)?.label.split(' ')[0]}</span>
                      <span>{item.name || `Item ${index + 1}`}</span>
                    </div>
                  ))}
                </div>

                {/* Bouton menu mobile */}
                <div className="md:hidden">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            {/* Menu mobile simulé */}
            <div className="md:hidden p-4 border-t">
              <div className="space-y-2">
                {content.menuItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <span className="text-sm">
                      {MENU_ICON_OPTIONS.find(opt => opt.value === item.icon)?.label.split(' ')[0]}
                    </span>
                    <span className="text-sm text-gray-700">
                      {item.name || `Item ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Légende */}
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                  <span>Version desktop (≥768px)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                  <span>Version mobile (768px)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-600">
            {content.menuItems.length} élément(s) de menu • {content.themeToggle ? 'Thème activé' : 'Thème désactivé'}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder la navigation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarEditor;