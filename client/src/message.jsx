import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  // Charger les messages depuis le backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/message")
      .then(res => setMessages(res.data))
      .catch(err => console.error("Erreur :", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📩 Messages reçus</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">Aucun message pour l’instant.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li key={msg._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <h3 className="font-semibold text-lg">{msg.nom}</h3>
              <p className="text-sm text-gray-600">{msg.email}</p>
              <p className="mt-2">{msg.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
