import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiImage, FiFileText, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialBlocks = [
  {
    id: 1,
    type: "Texte + Image",
    title: "Présentation GOV-AI",
    image: "https://via.placeholder.com/150",
    content: "Bienvenue sur notre site vitrine GOV-AI. Découvrez nos solutions innovantes.",
    lastUpdate: "20/08/2025",
    editor: "Admin"
  },
  {
    id: 2,
    type: "Galerie",
    title: "Galerie de réalisations",
    images: [
      "https://via.placeholder.com/80",
      "https://via.placeholder.com/80",
      "https://via.placeholder.com/80"
    ],
    lastUpdate: "18/08/2025",
    editor: "Rédacteur"
  },
  {
    id: 3,
    type: "Tableau",
    title: "Tableau des statistiques",
    table: [
      { label: "Visiteurs", value: 1200 },
      { label: "Articles", value: 15 }
    ],
    lastUpdate: "15/08/2025",
    editor: "Modérateur"
  }
];

const DynamicBlocksManage = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState(initialBlocks);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState('');

  // Commencer la modification
  const handleEditClick = (block) => {
    setEditingId(block.id);
    setEditTitle(block.title);
    setEditContent(block.content || '');
    setEditImage(block.image || '');
  };

  // Valider la modification
  const handleValidateEdit = () => {
    setBlocks(blocks.map(block =>
      block.id === editingId
        ? {
            ...block,
            title: editTitle,
            content: editContent,
            image: editImage,
            lastUpdate: new Date().toLocaleDateString('fr-FR'),
          }
        : block
    ));
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
    setEditImage('');
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
              Ajouter et gérer des blocs dynamiques
            </h1>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">{blocks.length} blocs enregistrés</span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => alert("Ajout d'un nouveau bloc dynamique !")}
              >
                <FiPlus className="mr-2" /> Ajouter un bloc
              </button>
            </div>
            <div className="space-y-6">
              {blocks.map(block => (
                <div key={block.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-green-700 mr-2">{block.type}</span>
                    <span className="text-xs text-gray-500">Modifié le {block.lastUpdate} par {block.editor}</span>
                  </div>
                  {editingId === block.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Titre du bloc"
                        required
                      />
                      {block.type === "Texte + Image" && (
                        <>
                          <input
                            type="text"
                            value={editImage}
                            onChange={e => setEditImage(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                            placeholder="URL de l'image"
                          />
                          <textarea
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Contenu du bloc"
                            rows={3}
                          />
                        </>
                      )}
                      <button
                        className="bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-yellow-600 transition-colors mt-2"
                        onClick={handleValidateEdit}
                      >
                        <FiCheck className="inline mr-1" /> Valider les modifications
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
                      {block.type === "Texte + Image" && (
                        <div className="flex items-center space-x-4">
                          <img src={block.image} alt={block.title} className="w-24 h-24 object-cover rounded" />
                          <p className="text-gray-700">{block.content}</p>
                        </div>
                      )}
                      {block.type === "Galerie" && (
                        <div className="flex space-x-2">
                          {block.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`Galerie ${idx}`} className="w-16 h-16 object-cover rounded" />
                          ))}
                        </div>
                      )}
                      {block.type === "Tableau" && (
                        <table className="mt-2 w-1/2">
                          <tbody>
                            {block.table.map((row, idx) => (
                              <tr key={idx}>
                                <td className="text-gray-600 font-medium py-1">{row.label}</td>
                                <td className="text-green-700 py-1">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(block)}
                          title="Modifier"
                        >
                          <FiEdit2 />
                        </button>
                        <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {blocks.length === 0 && (
                <div className="text-center text-gray-400 py-6">Aucun bloc dynamique enregistré</div>
              )}
            </div>
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Utilisez des blocs dynamiques pour enrichir le contenu et l’interactivité de votre site vitrine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBlocksManage;