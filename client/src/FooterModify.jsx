import React, { useEffect, useState } from "react";
import axios from "axios";

const FooterModify = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/configuration");
        setConfig(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedChange = (section, subSection, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [key]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/api/configuration", config);
      alert("Configuration mise à jour !");
      setConfig(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!config) return <p>Aucune configuration disponible.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Général */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Général</h2>
          <label className="block mb-1">Nom du site</label>
          <input
            type="text"
            value={config.siteName}
            onChange={e => setConfig(prev => ({ ...prev, siteName: e.target.value }))}
            className="w-full border p-2 rounded mb-2"
          />
          <label className="block mb-1">Logo URL</label>
          <input
            type="text"
            value={config.logoUrl}
            onChange={e => setConfig(prev => ({ ...prev, logoUrl: e.target.value }))}
            className="w-full border p-2 rounded"
          />
        </section>

        {/* Thème global */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Thème</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Couleur principale</label>
              <input
                type="color"
                value={config.theme.primaryColor}
                onChange={e => handleNestedChange("theme", null, "primaryColor", e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block mb-1">Couleur secondaire</label>
              <input
                type="color"
                value={config.theme.secondaryColor}
                onChange={e => handleNestedChange("theme", null, "secondaryColor", e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">Couleur de fond</label>
              <input
                type="color"
                value={config.theme.backgroundColor}
                onChange={e => handleNestedChange("theme", null, "backgroundColor", e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block mb-1">Couleur du texte</label>
              <input
                type="color"
                value={config.theme.textColor}
                onChange={e => handleNestedChange("theme", null, "textColor", e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
        </section>

        {/* Navbar */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Navbar</h2>
          {["backgroundColor","textColor","hoverColor","activeColor"].map(key => (
            <div className="mb-2" key={key}>
              <label className="block mb-1">{key}</label>
              <input
                type="color"
                value={config.theme.navbar[key]}
                onChange={e => handleNestedChange("theme","navbar",key,e.target.value)}
                className="w-full h-10"
              />
            </div>
          ))}
        </section>

        {/* Footer */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Footer</h2>
          {["backgroundColor","textColor","linkColor","hoverColor"].map(key => (
            <div className="mb-2" key={key}>
              <label className="block mb-1">{key}</label>
              <input
                type="color"
                value={config.theme.footer[key]}
                onChange={e => handleNestedChange("theme","footer",key,e.target.value)}
                className="w-full h-10"
              />
            </div>
          ))}
        </section>

        {/* Boutons */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Boutons</h2>
          {["backgroundColor","textColor","hoverBackground","hoverText"].map(key => (
            <div className="mb-2" key={key}>
              <label className="block mb-1">{key}</label>
              <input
                type="color"
                value={config.theme.button[key]}
                onChange={e => handleNestedChange("theme","button",key,e.target.value)}
                className="w-full h-10"
              />
            </div>
          ))}
          <div className="mb-2">
            <label className="block mb-1">Border Radius</label>
            <input
              type="text"
              value={config.theme.button.borderRadius}
              onChange={e => handleNestedChange("theme","button","borderRadius",e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </section>

        {/* Sections */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Sections</h2>
          {["headerBackground","headerTextColor","cardBackground","cardTextColor"].map(key => (
            <div className="mb-2" key={key}>
              <label className="block mb-1">{key}</label>
              <input
                type="color"
                value={config.theme.section[key]}
                onChange={e => handleNestedChange("theme","section",key,e.target.value)}
                className="w-full h-10"
              />
            </div>
          ))}
        </section>

        {/* Contact */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Contact</h2>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={config.contact.email}
            onChange={e => handleNestedChange("contact",null,"email",e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <label className="block mb-1">Téléphone</label>
          <input
            type="text"
            value={config.contact.phone}
            onChange={e => handleNestedChange("contact",null,"phone",e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <label className="block mb-1">Adresse</label>
          <input
            type="text"
            value={config.contact.address}
            onChange={e => handleNestedChange("contact",null,"address",e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
        </section>

        {/* Contenu */}
        <section className="border p-4 rounded shadow-sm">
          <h2 className="font-bold text-xl mb-2">Contenu du site</h2>
          {Object.keys(config.content).map(key => (
            <div className="mb-2" key={key}>
              <label className="block mb-1">{key}</label>
              <input
                type="text"
                value={config.content[key]}
                onChange={e => handleNestedChange("content",null,key,e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
        </section>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default FooterModify;
