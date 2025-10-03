


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BodyModify = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // === Edition des cards existantes ===
  const [editingCardId, setEditingCardId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", type: "fonctionnalité", images: [] });

  // === Création nouvelle card ===
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ title: "", description: "", type: "fonctionnalité", images: [] });

  const API_URL = "http://localhost:5000/api/cards";

  // ======================
  // Récupération des cards
  // ======================
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

  // ======================
  // Edition card existante
  // ======================
  const startEditing = (card) => {
    setEditingCardId(card._id);
    setEditForm({
      title: card.title || "",
      description: card.description || "",
      type: card.type || "fonctionnalité",
      images: card.images || [],
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

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

  // ======================
  // Supprimer card
  // ======================
  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCards((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Erreur delete card :", err);
    }
  };

  // ======================
  // Création nouvelle card
  // ======================
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

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => navigate(-1)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">⬅ Retour</button>
      <h1 className="text-2xl font-bold mb-6">Modifier les Cards</h1>

      {/* === Cards existantes === */}
      {cards.map((card) => (
        <div key={card._id} className="bg-white p-4 mb-4 rounded shadow">
          {editingCardId === card._id ? (
            <>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => handleEditChange("title", e.target.value)}
                placeholder="Titre"
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => handleEditChange("description", e.target.value)}
                placeholder="Description"
                className="border p-2 w-full mb-2"
              />
              <select
                value={editForm.type}
                onChange={(e) => handleEditChange("type", e.target.value)}
                className="border p-2 w-full mb-2"
              >
                <option value="fonctionnalité">Fonctionnalité</option>
                <option value="avantage">Avantage</option>
                <option value="presentation">Présentation</option>
              </select>

              <h4 className="font-semibold">Images</h4>
              {editForm.images.map((img, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input type="text" value={img} onChange={(e) => handleEditImageChange(idx, e.target.value)} className="border p-2 flex-1" />
                  <button onClick={() => removeEditImageField(idx)} className="ml-2 text-red-600">🗑️</button>
                </div>
              ))}
              <button onClick={addEditImageField} className="mb-2 text-green-600">➕ Ajouter image</button>

              <div className="flex space-x-2">
                <button onClick={handleSaveEdit} className="bg-green-600 text-white px-4 py-2 rounded">✅ Enregistrer</button>
                <button onClick={() => setEditingCardId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">❌ Annuler</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold">{card.title}</h3>
              <p>{card.description}</p>
              <p className="italic text-sm">Type: {card.type}</p>
              <div className="flex mt-2 space-x-2">
                <button onClick={() => startEditing(card)} className="text-blue-600">✏️ Modifier</button>
                <button onClick={() => handleDeleteCard(card._id)} className="text-red-600">🗑️ Supprimer</button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* === Formulaire nouvelle card === */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Ajouter une nouvelle Card</h2>
        {!showNewCardForm && (
          <button onClick={() => setShowNewCardForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">➕ Ajouter Card</button>
        )}
        {showNewCardForm && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <input
              type="text"
              value={newCardForm.title}
              onChange={(e) => handleNewChange("title", e.target.value)}
              placeholder="Titre"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              value={newCardForm.description}
              onChange={(e) => handleNewChange("description", e.target.value)}
              placeholder="Description"
              className="border p-2 w-full mb-2"
            />
            <select
              value={newCardForm.type}
              onChange={(e) => handleNewChange("type", e.target.value)}
              className="border p-2 w-full mb-2"
            >
              <option value="fonctionnalité">Fonctionnalité</option>
              <option value="avantage">Avantage</option>
              <option value="presentation">Présentation</option>
            </select>

            <h4 className="font-semibold">Images</h4>
            {newCardForm.images.map((img, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input type="text" value={img} onChange={(e) => handleNewImageChange(idx, e.target.value)} className="border p-2 flex-1" />
                <button onClick={() => removeNewImageField(idx)} className="ml-2 text-red-600">🗑️</button>
              </div>
            ))}
            <button onClick={addNewImageField} className="mb-2 text-green-600">➕ Ajouter image</button>

            <div className="flex space-x-2">
              <button onClick={handleSaveNewCard} className="bg-green-600 text-white px-4 py-2 rounded">✅ Enregistrer</button>
              <button onClick={() => setShowNewCardForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">❌ Annuler</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyModify;
