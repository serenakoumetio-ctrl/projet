import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000/api/config";

  // Charger la config
  const fetchConfig = async () => {
    try {
      const res = await axios.get(API_URL);
      setConfig(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur fetch config:", err);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Sauvegarder la configuration
  const handleSave = async () => {
    try {
      await axios.put(API_URL, config);
      alert("Configuration mise à jour !");
    } catch (err) {
      console.error("Erreur update config:", err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!config) return <p>Aucune configuration disponible</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Configuration</h2>

      {/* Nom du site */}
      <div>
        <label className="block font-semibold mb-1">Nom du site</label>
        <input
          type="text"
          value={config.siteName}
          onChange={e => setConfig({...config, siteName: e.target.value})}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block font-semibold mb-1">Logo URL</label>
        <input
          type="text"
          value={config.logoUrl}
          onChange={e => setConfig({...config, logoUrl: e.target.value})}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Couleurs principales */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block font-semibold mb-1">Couleur primaire</label>
          <input
            type="color"
            value={config.theme.primaryColor}
            onChange={e => setConfig({...config, theme: {...config.theme, primaryColor: e.target.value}})}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Couleur secondaire</label>
          <input
            type="color"
            value={config.theme.secondaryColor}
            onChange={e => setConfig({...config, theme: {...config.theme, secondaryColor: e.target.value}})}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Couleur fond</label>
          <input
            type="color"
            value={config.theme.backgroundColor}
            onChange={e => setConfig({...config, theme: {...config.theme, backgroundColor: e.target.value}})}
          />
        </div>
      </div>

      {/* Navbar */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">Navbar</h3>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block font-semibold mb-1">Fond</label>
            <input
              type="color"
              value={config.theme.navbar.backgroundColor}
              onChange={e => setConfig({...config, theme: {...config.theme, navbar: {...config.theme.navbar, backgroundColor: e.target.value}}})}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Texte</label>
            <input
              type="color"
              value={config.theme.navbar.textColor}
              onChange={e => setConfig({...config, theme: {...config.theme, navbar: {...config.theme.navbar, textColor: e.target.value}}})}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Hover</label>
            <input
              type="color"
              value={config.theme.navbar.hoverColor}
              onChange={e => setConfig({...config, theme: {...config.theme, navbar: {...config.theme.navbar, hoverColor: e.target.value}}})}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">Footer</h3>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block font-semibold mb-1">Fond</label>
            <input
              type="color"
              value={config.theme.footer.backgroundColor}
              onChange={e => setConfig({...config, theme: {...config.theme, footer: {...config.theme.footer, backgroundColor: e.target.value}}})}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Texte</label>
            <input
              type="color"
              value={config.theme.footer.textColor}
              onChange={e => setConfig({...config, theme: {...config.theme, footer: {...config.theme.footer, textColor: e.target.value}}})}
            />
          </div>
        </div>
      </div>

      {/* Contenu du site */}
      <div className="border-t pt-4 space-y-2">
        <h3 className="font-bold mb-2">Contenu du site</h3>
        <div>
          <label className="block font-semibold mb-1">Texte du footer</label>
          <input
            type="text"
            value={config.content.footerText}
            onChange={e => setConfig({...config, content: {...config.content, footerText: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Titre Accueil</label>
          <input
            type="text"
            value={config.content.homeTitle}
            onChange={e => setConfig({...config, content: {...config.content, homeTitle: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Sous-titre Accueil</label>
          <input
            type="text"
            value={config.content.homeSubtitle}
            onChange={e => setConfig({...config, content: {...config.content, homeSubtitle: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="border-t pt-4 space-y-2">
        <h3 className="font-bold mb-2">Contact</h3>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="text"
            value={config.contact.email}
            onChange={e => setConfig({...config, contact: {...config.contact, email: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Téléphone</label>
          <input
            type="text"
            value={config.contact.phone}
            onChange={e => setConfig({...config, contact: {...config.contact, phone: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Adresse</label>
          <input
            type="text"
            value={config.contact.address}
            onChange={e => setConfig({...config, contact: {...config.contact, address: e.target.value}})}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sauvegarder toutes les modifications
      </button>
    </div>
  );
};

export default DashboardConfig;
