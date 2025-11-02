import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, nonLus: 0, lus: 0 });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/messages`);
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/messages/stats`);
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  const markAsRead = async (messageId, isRead) => {
    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lu: isRead })
      });

      const result = await response.json();
      if (result.success) {
        await fetchMessages();
        await fetchStats();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        await fetchMessages();
        await fetchStats();
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.lu;
    if (filter === 'read') return message.lu;
    return true;
  });

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p>Chargement des messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion des Messages</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Total des messages</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.nonLus}</div>
          <div className="text-sm text-yellow-800">Messages non lus</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.lus}</div>
          <div className="text-sm text-green-800">Messages lus</div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Tous ({stats.total})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded ${
            filter === 'unread' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
        >
          Non lus ({stats.nonLus})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded ${
            filter === 'read' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Lus ({stats.lus})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des messages */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Messages reçus</h2>
          
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun message trouvé.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? 'border-green-500 bg-green-50'
                      : message.lu
                      ? 'border-gray-200 bg-white'
                      : 'border-yellow-300 bg-yellow-50'
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {message.nom}
                    </h3>
                    {!message.lu && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {message.email}
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {message.message}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{formatDate(message.date)}</span>
                    <div className="flex space-x-1">
                      {!message.lu ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(message.id, true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="Marquer comme lu"
                        >
                          ✓
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(message.id, false);
                          }}
                          className="text-gray-600 hover:text-gray-800"
                          title="Marquer comme non lu"
                        >
                          ↶
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="text-red-600 hover:text-red-800 ml-2"
                        title="Supprimer"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Détail du message sélectionné */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedMessage.nom}
                  </h2>
                  <p className="text-green-600 font-medium">
                    {selectedMessage.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedMessage.date)}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {!selectedMessage.lu ? (
                    <button
                      onClick={() => markAsRead(selectedMessage.id, true)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Marquer comme lu
                    </button>
                  ) : (
                    <button
                      onClick={() => markAsRead(selectedMessage.id, false)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      Marquer comme non lu
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-3">Message :</h3>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-6 flex space-x-4">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Répondre par email
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedMessage.email)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Copier l'email
                </button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center bg-gray-50">
              <p className="text-gray-500">Sélectionnez un message pour voir son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;