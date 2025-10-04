import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiTrash, FiPlusCircle, FiCheck, FiXCircle } from "react-icons/fi";

const BodyModify = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCardId, setEditingCardId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", type: "fonctionnalité", images: [] });

  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ title: "", description: "", type: "fonctionnalité", images: [] });

  const API_URL = "http://localhost:5000/api/cards";

  const fetchCards = async () => {
    try {
      const res = await axios.get(API_URL);
      setCards(res.data);
    } catch (err) {
      console.error("Erreur GET cards :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const startEditing = (card) => {
    setEditingCardId(card._id);
    setEditForm({
      title: card.title || "",
      description: card.description || "",
      type: card.type || "fonctionnalité",
      images: card.images || [],
    });
  };

  const handleEditChange = (field, value) => setEditForm((prev) => ({ ...prev, [field]: value }));
  const handleEditImageChange = (index, value) => {
    const newImages = [...editForm.images];
    newImages[index] = value;
    setEditForm({ ...editForm, images: newImages });
  };
  const addEditImageField = () => setEditForm({ ...editForm, images: [...editForm.images, ""] });
  const removeEditImageField = (index) => {
    const newImages = [...editForm.images];
    newImages.splice(index, 1);
    setEditForm({ ...editForm, images: newImages });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`${API_URL}/bulk/update`, { cards: [{ _id: editingCardId, ...editForm }] });
      const updatedCard = res.data.updatedCards[0];
      setCards((prev) => prev.map((c) => (c._id === updatedCard._id ? updatedCard : c)));
      setEditingCardId(null);
    } catch (err) {
      console.error("Erreur save card :", err);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCards((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Erreur delete card :", err);
    }
  };

  const handleNewChange = (field, value) => setNewCardForm({ ...newCardForm, [field]: value });
  const handleNewImageChange = (index, value) => {
    const newImages = [...newCardForm.images];
    newImages[index] = value;
    setNewCardForm({ ...newCardForm, images: newImages });
  };
  const addNewImageField = () => setNewCardForm({ ...newCardForm, images: [...newCardForm.images, ""] });
  const removeNewImageField = (index) => {
    const newImages = [...newCardForm.images];
    newImages.splice(index, 1);
    setNewCardForm({ ...newCardForm, images: newImages });
  };

  const handleSaveNewCard = async () => {
    try {
      const res = await axios.post(API_URL, newCardForm);
      setCards([...cards, res.data]);
      setShowNewCardForm(false);
      setNewCardForm({ title: "", description: "", type: "fonctionnalité", images: [] });
    } catch (err) {
      console.error("Erreur création card :", err);
    }
  };

  if (loading) return <p className="text-center text-green-700 font-semibold">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Bouton retour */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl shadow-md transition"
      >
        <FiArrowLeft /> Retour
      </button>

      <h1 className="text-3xl font-extrabold mb-8 text-black">🌿 Gestion des Cards</h1>

      {/* === Cards existantes === */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
            {editingCardId === card._id ? (
              <>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                  placeholder="Titre"
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                  placeholder="Description"
                  className="border p-2 w-full mb-2 rounded"
                />
                <select
                  value={editForm.type}
                  onChange={(e) => handleEditChange("type", e.target.value)}
                  className="border p-2 w-full mb-3 rounded"
                >
                  <option value="fonctionnalité">Fonctionnalité</option>
                  <option value="avantage">Avantage</option>
                  <option value="presentation">Présentation</option>
                </select>

                <h4 className="font-semibold text-black">Images</h4>
                {editForm.images.map((img, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input 
                      type="text" 
                      value={img} 
                      onChange={(e) => handleEditImageChange(idx, e.target.value)} 
                      className="border p-2 flex-1 rounded" 
                    />
                    <button onClick={() => removeEditImageField(idx)} className="ml-2 text-red-600">
                      <FiTrash />
                    </button>
                  </div>
                ))}
                <button onClick={addEditImageField} className="mb-2 text-green-600 flex items-center gap-1">
                  <FiPlusCircle /> Ajouter image
                </button>

                <div className="flex space-x-3">
                  <button onClick={handleSaveEdit} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
                    <FiCheck /> Enregistrer
                  </button>
                  <button onClick={() => setEditingCardId(null)} className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl">
                    <FiXCircle /> Annuler
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-lg text-black">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
                <p className="italic text-sm text-gray-500">Type: {card.type}</p>
                <div className="flex mt-3 space-x-3">
                  <button onClick={() => startEditing(card)} className="flex items-center gap-1 text-green-600 hover:text-green-800">
                    <FiEdit /> Modifier
                  </button>
                  <button onClick={() => handleDeleteCard(card._id)} className="flex items-center gap-1 text-red-600 hover:text-red-800">
                    <FiTrash /> Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* === Formulaire nouvelle card === */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-black">➕ Ajouter une nouvelle Card</h2>
        {!showNewCardForm && (
          <button 
            onClick={() => setShowNewCardForm(true)} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl shadow-md transition"
          >
            <FiPlusCircle /> Nouvelle Card
          </button>
        )}
        {showNewCardForm && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-4">
            <input
              type="text"
              value={newCardForm.title}
              onChange={(e) => handleNewChange("title", e.target.value)}
              placeholder="Titre"
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              value={newCardForm.description}
              onChange={(e) => handleNewChange("description", e.target.value)}
              placeholder="Description"
              className="border p-2 w-full mb-2 rounded"
            />
            <select
              value={newCardForm.type}
              onChange={(e) => handleNewChange("type", e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            >
              <option value="fonctionnalité">Fonctionnalité</option>
              <option value="avantage">Avantage</option>
              <option value="presentation">Présentation</option>
            </select>

            <h4 className="font-semibold text-black">Images</h4>
            {newCardForm.images.map((img, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input 
                  type="text" 
                  value={img} 
                  onChange={(e) => handleNewImageChange(idx, e.target.value)} 
                  className="border p-2 flex-1 rounded" 
                />
                <button onClick={() => removeNewImageField(idx)} className="ml-2 text-red-600">
                  <FiTrash />
                </button>
              </div>
            ))}
            <button onClick={addNewImageField} className="mb-3 text-green-600 flex items-center gap-1">
              <FiPlusCircle /> Ajouter image
            </button>

            <div className="flex space-x-3">
              <button onClick={handleSaveNewCard} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                <FiCheck /> Enregistrer
              </button>
              <button onClick={() => setShowNewCardForm(false)} className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl">
                <FiXCircle /> Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyModify;
