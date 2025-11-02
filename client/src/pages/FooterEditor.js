import React, { useState, useEffect } from 'react';
import ImageSelector from '../components/ImageSelector';

const API_BASE = 'http://localhost:5000/api';

// Options d'icônes pour les réseaux sociaux
const SOCIAL_ICON_OPTIONS = [
  { value: "FaFacebook", label: "📘 Facebook" },
  { value: "FaTwitter", label: "🐦 Twitter" },
  { value: "FaLinkedin", label: "💼 LinkedIn" },
  { value: "FaInstagram", label: "📷 Instagram" },
  { value: "FaYoutube", label: "📺 YouTube" },
  { value: "FaEnvelope", label: "✉️ Email" }
];

const FooterEditor = () => {
  const [content, setContent] = useState({
    institution: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    navigation: [],
    socialLinks: [],
    copyright: ""
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE}/content/footer`);
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

  const handleNavigationChange = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      navigation: prev.navigation.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addNavigationItem = () => {
    setContent(prev => ({
      ...prev,
      navigation: [...prev.navigation, { name: '', href: '#' }]
    }));
  };

  const removeNavigationItem = (index) => {
    setContent(prev => ({
      ...prev,
      navigation: prev.navigation.filter((_, i) => i !== index)
    }));
  };

  const addSocialLink = () => {
    setContent(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '#', icon: 'FaFacebook' }]
    }));
  };

  const removeSocialLink = (index) => {
    setContent(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_BASE}/content/footer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Footer sauvegardé!");
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
      <h1 className="text-2xl font-bold mb-6">Édition - Footer (Pied de page)</h1>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Informations de l'institution */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Informations de l'institution</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de l'institution</label>
              <input
                type="text"
                value={content.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Ex: Centre National de Développement de l'Informatique"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Copyright</label>
              <input
                type="text"
                value={content.copyright}
                onChange={(e) => handleChange('copyright', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Ex: © 2025 CENADI. Tous droits réservés."
              />
            </div>
          </div>

          <div className="mt-4">
            <ImageSelector
              value={content.logo}
              onChange={(imageUrl) => handleChange('logo', imageUrl)}
              label="Logo de l'institution"
            />
          </div>
        </div>

        {/* Informations de contact */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Informations de contact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <input
                type="text"
                value={content.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Adresse complète"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Numéro de téléphone"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={content.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Adresse email"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Liens de navigation</h3>
            <button
              onClick={addNavigationItem}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter un lien
            </button>
          </div>

          <div className="space-y-4">
            {content.navigation.map((item, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Lien {index + 1}</h4>
                  <button
                    onClick={() => removeNavigationItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Texte du lien</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleNavigationChange(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: Accueil"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Lien (URL)</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleNavigationChange(index, 'href', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: #Acc ou /accueil"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.navigation.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun lien de navigation ajouté.</p>
              <p className="text-sm">Cliquez sur "Ajouter un lien" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Réseaux sociaux */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Réseaux sociaux</h3>
            <button
              onClick={addSocialLink}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
            >
              + Ajouter un réseau
            </button>
          </div>

          <div className="space-y-4">
            {content.socialLinks.map((social, index) => (
              <div key={index} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Réseau social {index + 1}</h4>
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Plateforme</label>
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: Facebook"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">URL</label>
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Lien vers le profil"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Icône</label>
                    <select
                      value={social.icon}
                      onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {SOCIAL_ICON_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.socialLinks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun réseau social ajouté.</p>
              <p className="text-sm">Cliquez sur "Ajouter un réseau" pour commencer.</p>
            </div>
          )}
        </div>

        {/* Aperçu du footer */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="text-lg font-medium mb-4">Aperçu du Footer</h3>
          
          <div className="bg-white rounded p-4 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Colonne institution */}
              <div>
                <h4 className="font-semibold mb-2">{content.institution || "Nom de l'institution"}</h4>
                {content.logo && (
                  <img 
                    src={`http://localhost:5000${content.logo}`}
                    alt="Logo" 
                    className="h-12 mb-2"
                  />
                )}
              </div>

              {/* Colonne navigation */}
              <div>
                <h4 className="font-semibold mb-2 border-l-4 border-green-500 pl-2">Navigation</h4>
                <ul className="space-y-1">
                  {content.navigation.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-blue-600 hover:underline">
                        {item.name || `Lien ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne contact */}
              <div>
                <h4 className="font-semibold mb-2 border-l-4 border-green-500 pl-2">Contact</h4>
                <ul className="space-y-1">
                  {content.address && <li className="text-sm">{content.address}</li>}
                  {content.phone && <li className="text-sm">{content.phone}</li>}
                  {content.email && <li className="text-sm">{content.email}</li>}
                </ul>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {content.copyright || "Copyright"}
              </span>
              
              {content.socialLinks.length > 0 && (
                <div className="flex space-x-2">
                  {content.socialLinks.map((social, index) => (
                    <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {social.platform || "Réseau social"}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-600">
            {content.navigation.length} lien(s) navigation • {content.socialLinks.length} réseau(x) social(aux)
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder le Footer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;