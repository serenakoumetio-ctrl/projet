import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImagesManage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // id de l'image en modification
  const [editFile, setEditFile] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const API_URL = "http://localhost:5000";

  // Charger les images
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/images`);
      setImages(res.data);
    } catch (err) {
      console.error("Erreur fetch images:", err);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  // Ajouter une image
  const handleAdd = async () => {
    if (!newImage) return alert("Veuillez choisir un fichier");

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post(`${API_URL}/api/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setNewImage(null);
      setTitle("");
      setDescription("");
      fetchImages();
    } catch (err) {
      console.error("Erreur ajout image:", err);
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/images/${id}`);
      fetchImages();
    } catch (err) {
      console.error("Erreur suppression image:", err);
    }
  };

  // Activer le mode édition
  const startEdit = (img) => {
    setEditingId(img._id);
    setEditTitle(img.title);
    setEditDescription(img.description);
    setEditFile(null);
  };

  // Annuler modification
  const cancelEdit = () => {
    setEditingId(null);
    setEditFile(null);
  };

  // Sauvegarder modification
  const saveEdit = async (id) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    if (editFile) formData.append("image", editFile);

    try {
      await axios.put(`${API_URL}/api/images/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setEditingId(null);
      setEditFile(null);
      fetchImages();
    } catch (err) {
      console.error("Erreur modification image:", err);
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
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
            Gérer les images du site vitrine
          </h1>

          {/* Formulaire ajout */}
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <input type="file" onChange={e => setNewImage(e.target.files[0])} />
            <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="p-1 border rounded" />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="p-1 border rounded" />
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Ajouter</button>
          </div>

          {/* Liste des images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map(img => (
              <div key={img._id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
                {editingId === img._id ? (
                  // Mode édition
                  <div className="w-full">
                    <input
                      type="file"
                      onChange={(e) => setEditFile(e.target.files[0])}
                      className="mb-2"
                    />
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => saveEdit(img._id)} className="bg-green-600 text-white px-3 py-1 rounded flex items-center">
                        <FiSave className="mr-1" /> Sauver
                      </button>
                      <button onClick={cancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded flex items-center">
                        <FiX className="mr-1" /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  // Mode affichage normal
                  <>
                    <img
                      src={`${API_URL}${img.url}`}
                      alt={img.title}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                    <div className="w-full flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{img.title}</h3>
                        <p className="text-sm text-gray-500">
                          {img.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Ajoutée le {new Date(img.createdAt).toLocaleDateString()} par {img.uploader || "Admin"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => startEdit(img)} className="text-blue-500 hover:text-blue-700"><FiEdit2 /></button>
                        <button onClick={() => handleDelete(img._id)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            {images.length === 0 && (
              <div className="col-span-2 text-center text-gray-400 py-6">Aucune image enregistrée</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesManage;
