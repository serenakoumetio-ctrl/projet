import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiFileAlt, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialPages = [
  { id: 1, title: "Accueil", sections: ["Présentation", "Actualités"], lastUpdate: "20/08/2025", editor: "Admin" },
  { id: 2, title: "Contact", sections: ["Formulaire", "Coordonnées"], lastUpdate: "17/08/2025", editor: "Modérateur" },
  { id: 3, title: "Services", sections: ["Nos offres", "Tarifs"], lastUpdate: "15/08/2025", editor: "Rédacteur" },
];

const PagesSectionsManage = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState(initialPages);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSections, setEditSections] = useState('');

  // Commencer la modification
  const handleEditClick = (page) => {
    setEditingId(page.id);
    setEditTitle(page.title);
    setEditSections(page.sections.join(', '));
  };

  // Valider la modification
  const handleValidateEdit = () => {
    setPages(pages.map(page =>
      page.id === editingId
        ? {
            ...page,
            title: editTitle,
            sections: editSections.split(',').map(s => s.trim()),
            lastUpdate: new Date().toLocaleDateString('fr-FR'),
          }
        : page
    ));
    setEditingId(null);
    setEditTitle('');
    setEditSections('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Retour
            </button>
            <img
              src="/images/armoiries_logo_cenadi.png"
              alt="Logo"
              className="h-10"
            />
            <span className="text-xl font-bold">GOV-AI_Admin</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Gérer les pages et sections
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{pages.length} pages enregistrées</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'une nouvelle page !")}
              >
                <FiPlus className="mr-2" /> Ajouter une page
              </button>
            </div>
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">Titre</th>
                  <th className="text-left py-2 px-4">Sections</th>
                  <th className="text-left py-2 px-4">Dernière modification</th>
                  <th className="text-left py-2 px-4">Éditeur</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page.id} className="border-b border-gray-100 hover:bg-green-50">
                    <td className="py-3 px-4">
                      {editingId === page.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                      ) : (
                        page.title
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === page.id ? (
                        <input
                          type="text"
                          value={editSections}
                          onChange={e => setEditSections(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Séparez les sections par une virgule"
                          required
                        />
                      ) : (
                        page.sections.map((section, idx) => (
                          <span key={idx} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded mr-2 text-xs">{section}</span>
                        ))
                      )}
                    </td>
                    <td className="py-3 px-4">{page.lastUpdate}</td>
                    <td className="py-3 px-4">{page.editor}</td>
                    <td className="py-3 px-4">
                      {editingId === page.id ? (
                        <button
                          className="text-green-600 hover:text-green-800 mr-2"
                          onClick={handleValidateEdit}
                          title="Valider"
                        >
                          <FiCheck className="text-xl" />
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          onClick={() => handleEditClick(page)}
                          title="Modifier"
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-6">Aucune page enregistrée</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Organisez vos pages et sections pour une navigation claire et efficace sur le site vitrine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesSectionsManage;