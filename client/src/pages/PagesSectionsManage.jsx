import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/sections";

const PagesSectionsManage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Charger les sections depuis le backend
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(API_URL);
      setSections(res.data);
    } catch (err) {
      console.error("Erreur récupération sections :", err);
    }
  };

  // Commencer à éditer
  const handleEditClick = (section) => {
    setEditingId(section._id);
    setEditTitle(section.titre);
    setEditContent(section.contenu);
  };

  // Valider l'édition
  const handleValidateEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editingId}`, {
        titre: editTitle,
        contenu: editContent,
      });
      fetchSections(); // recharge depuis Mongo
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      console.error("Erreur modification section :", err);
    }
  };

  // Ajouter une nouvelle section
  const handleAddSection = async () => {
    try {
      const res = await axios.post(API_URL, {
        titre: "Nouvelle section",
        contenu: "Contenu à personnaliser...",
        position: sections.length + 1,
        page: "652e7f4d9b2e2f1f1f111111", // ⚠️ Mets ici l'ID d'une page existante en Mongo
      });
      setSections([...sections, res.data]);
    } catch (err) {
      console.error("Erreur ajout section :", err);
    }
  };

  // Supprimer une section
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette section ?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setSections(sections.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Erreur suppression section :", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Retour
            </button>
            <span className="text-xl font-bold">GOV-AI_Admin</span>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Gérer les sections
            </h1>

            {/* Bouton ajouter */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">
                {sections.length} sections enregistrées
              </span>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleAddSection}
              >
                <FiPlus className="mr-2" /> Ajouter une section
              </button>
            </div>

            {/* Tableau des sections */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4">Titre</th>
                  <th className="text-left py-2 px-4">Contenu</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr
                    key={section._id}
                    className="border-b border-gray-100 hover:bg-green-50"
                  >
                    <td className="py-3 px-4">
                      {editingId === section._id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        section.titre
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === section._id ? (
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-gray-700">{section.contenu}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === section._id ? (
                        <button
                          className="text-green-600 hover:text-green-800 mr-2"
                          onClick={handleValidateEdit}
                        >
                          <FiCheck className="text-xl" />
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          onClick={() => handleEditClick(section)}
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(section._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {sections.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center text-gray-400 py-6"
                    >
                      Aucune section enregistrée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Conseil */}
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Ajoutez et organisez vos sections pour structurer vos
                pages efficacement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesSectionsManage;


// import React, { useState, useEffect } from "react";
// import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // Backend

// const PagesSectionsManage = () => {
//   const navigate = useNavigate();
//   const [pages, setPages] = useState([]);
//   const [selectedPage, setSelectedPage] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [editingPage, setEditingPage] = useState(null);
//   const [editingSection, setEditingSection] = useState(null);

//   // ---------------------------
//   // Charger toutes les pages
//   // ---------------------------
//   const fetchPages = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/pages`);
//       setPages(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Charger les sections d'une page
//   // ---------------------------
//   const fetchSections = async (pageId) => {
//     try {
//       const res = await axios.get(`${API_URL}/sections?pageId=${pageId}`);
//       setSections(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, []);

//   // ---------------------------
//   // Sélection d'une page pour gérer ses sections
//   // ---------------------------
//   const handleSelectPage = (page) => {
//     setSelectedPage(page);
//     fetchSections(page._id);
//   };

//   // ---------------------------
//   // Ajouter une page
//   // ---------------------------
//   const handleAddPage = async () => {
//     const slug = prompt("Slug unique pour la page (ex: accueil) :");
//     const title = prompt("Titre de la page :");
//     if (!slug || !title) return;
//     try {
//       const res = await axios.post(`${API_URL}/pages`, { slug, title });
//       setPages([...pages, res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Modifier une page
//   // ---------------------------
//   const handleEditPage = async (page) => {
//     const title = prompt("Nouveau titre :", page.title);
//     const description = prompt("Nouvelle description :", page.description);
//     if (!title) return;
//     try {
//       const res = await axios.put(`${API_URL}/pages/${page.slug}`, { title, description });
//       setPages(pages.map(p => (p._id === page._id ? res.data : p)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Supprimer une page
//   // ---------------------------
//   const handleDeletePage = async (page) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer cette page ?")) return;
//     try {
//       await axios.delete(`${API_URL}/pages/${page.slug}`);
//       setPages(pages.filter(p => p._id !== page._id));
//       if (selectedPage?._id === page._id) setSelectedPage(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Ajouter une section
//   // ---------------------------
//   const handleAddSection = async () => {
//     if (!selectedPage) return alert("Sélectionnez une page !");
//     const titre = prompt("Titre de la section :");
//     const contenu = prompt("Contenu de la section :");
//     const position = sections.length + 1;
//     if (!titre || !contenu) return;
//     try {
//       const res = await axios.post(`${API_URL}/sections`, { titre, contenu, page: selectedPage._id, position });
//       setSections([...sections, res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Modifier une section
//   // ---------------------------
//   const handleEditSection = async (section) => {
//     const titre = prompt("Titre :", section.titre);
//     const contenu = prompt("Contenu :", section.contenu);
//     if (!titre || !contenu) return;
//     try {
//       const res = await axios.put(`${API_URL}/sections/${section._id}`, { titre, contenu });
//       setSections(sections.map(s => (s._id === section._id ? res.data : s)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------------------
//   // Supprimer une section
//   // ---------------------------
//   const handleDeleteSection = async (section) => {
//     if (!window.confirm("Voulez-vous supprimer cette section ?")) return;
//     try {
//       await axios.delete(`${API_URL}/sections/${section._id}`);
//       setSections(sections.filter(s => s._id !== section._id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-green-600 text-white p-4 fixed w-full z-50">
//         <div className="container mx-auto flex items-center justify-between">
//           <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
//             <FiArrowLeft /> Retour
//           </button>
//           <h1 className="text-xl font-bold">GOV-AI Admin</h1>
//         </div>
//       </nav>

//       <div className="container mx-auto pt-24 px-4 space-y-8">
//         {/* Pages */}
//         <div className="bg-white rounded shadow p-6">
//           <div className="flex justify-between mb-4">
//             <h2 className="text-lg font-bold">Pages</h2>
//             <button onClick={handleAddPage} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
//               <FiPlus /> Ajouter
//             </button>
//           </div>
//           <ul className="space-y-2">
//             {pages.map(page => (
//               <li key={page._id} className="flex justify-between items-center p-2 border rounded hover:bg-green-50">
//                 <span onClick={() => handleSelectPage(page)} className="cursor-pointer">{page.title}</span>
//                 <div className="flex gap-2">
//                   <button onClick={() => handleEditPage(page)} className="text-blue-500"><FiEdit2 /></button>
//                   <button onClick={() => handleDeletePage(page)} className="text-red-500"><FiTrash2 /></button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Sections */}
//         {selectedPage && (
//           <div className="bg-white rounded shadow p-6">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-lg font-bold">Sections de {selectedPage.title}</h2>
//               <button onClick={handleAddSection} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
//                 <FiPlus /> Ajouter
//               </button>
//             </div>
//             <ul className="space-y-2">
//               {sections.map(sec => (
//                 <li key={sec._id} className="flex justify-between items-center p-2 border rounded hover:bg-green-50">
//                   <span>{sec.titre}</span>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleEditSection(sec)} className="text-blue-500"><FiEdit2 /></button>
//                     <button onClick={() => handleDeleteSection(sec)} className="text-red-500"><FiTrash2 /></button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PagesSectionsManage;
