// import React, { useState } from 'react';
// import { FiArrowLeft, FiTrash2, FiMail, FiUser } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// const initialMessages = [
//   {
//     id: 1,
//     name: "Jean Dupont",
//     email: "jean.dupont@email.com",
//     subject: "Demande d'information",
//     content: "Bonjour, je souhaite en savoir plus sur vos services.",
//     date: "27/08/2025",
//     time: "09:15",
//     read: false
//   },
//   {
//     id: 2,
//     name: "Alice Mbarga",
//     email: "alice.mbarga@email.com",
//     subject: "Problème de connexion",
//     content: "Je n'arrive pas à accéder à mon espace utilisateur.",
//     date: "26/08/2025",
//     time: "16:42",
//     read: true
//   },
//   {
//     id: 3,
//     name: "Paul Nguema",
//     email: "paul.nguema@email.com",
//     subject: "Suggestion",
//     content: "Serait-il possible d'ajouter une section FAQ ?",
//     date: "25/08/2025",
//     time: "11:30",
//     read: false
//   }
// ];

// const ContactMessagesManage = () => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState(initialMessages);
//   const [selectedId, setSelectedId] = useState(messages.length ? messages[0].id : null);

//   const handleSelect = (id) => setSelectedId(id);

//   const handleDelete = (id) => {
//     setMessages(messages.filter(msg => msg.id !== id));
//     if (selectedId === id && messages.length > 1) {
//       setSelectedId(messages.find(msg => msg.id !== id).id);
//     }
//   };

//   const handleMarkRead = (id) => {
//     setMessages(messages.map(msg =>
//       msg.id === id ? { ...msg, read: true } : msg
//     ));
//   };

//   const selectedMessage = messages.find(msg => msg.id === selectedId);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
//       <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition-colors"
//             >
//               <FiArrowLeft className="mr-1" /> Retour
//             </button>
//             <img
//               src="/images/armoiries_logo_cenadi.png"
//               alt="Logo"
//               className="h-10"
//             />
//             <span className="text-xl font-bold">GOV-AI_Admin</span>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto pt-24 px-4">
//         <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex" style={{ minHeight: '500px' }}>
//           {/* Liste des messages */}
//           <div className="w-1/3 border-r border-green-100 bg-green-50 p-4 overflow-y-auto">
//             <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
//               <FiMail className="mr-2" /> Boîte de réception
//             </h2>
//             <ul>
//               {messages.map(msg => (
//                 <li
//                   key={msg.id}
//                   className={`mb-2 p-3 rounded-lg cursor-pointer transition-colors ${
//                     selectedId === msg.id ? 'bg-white border border-green-300' : 'hover:bg-green-100'
//                   }`}
//                   onClick={() => handleSelect(msg.id)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className={`font-semibold ${!msg.read ? 'text-green-700' : 'text-gray-700'}`}>
//                       {msg.subject}
//                     </span>
//                     {!msg.read && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">Nouveau</span>}
//                   </div>
//                   <div className="text-xs text-gray-500 flex justify-between mt-1">
//                     <span>{msg.name}</span>
//                     <span>{msg.date} {msg.time}</span>
//                   </div>
//                 </li>
//               ))}
//               {messages.length === 0 && (
//                 <li className="text-center text-gray-400 py-6">Aucun message reçu</li>
//               )}
//             </ul>
//           </div>
//           {/* Détail du message sélectionné */}
//           <div className="w-2/3 p-8 flex flex-col justify-between">
//             {selectedMessage ? (
//               <>
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <FiUser className="text-green-700 mr-2" />
//                     <span className="font-bold text-green-700">{selectedMessage.name}</span>
//                     <span className="ml-4 text-gray-500">{selectedMessage.email}</span>
//                   </div>
//                   <div className="flex items-center mb-2">
//                     <span className="font-semibold text-lg">{selectedMessage.subject}</span>
//                   </div>
//                   <div className="text-gray-700 mb-4">{selectedMessage.content}</div>
//                   <div className="text-xs text-gray-500 mb-2">
//                     Envoyé le {selectedMessage.date} à {selectedMessage.time}
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2 mt-4">
//                   {!selectedMessage.read && (
//                     <button
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//                       onClick={() => handleMarkRead(selectedMessage.id)}
//                     >
//                       Marquer comme lu
//                     </button>
//                   )}
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//                     onClick={() => handleDelete(selectedMessage.id)}
//                   >
//                     <FiTrash2 className="inline mr-1" /> Supprimer
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center text-gray-400 py-6">Sélectionnez un message pour voir le détail</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactMessagesManage;




import { useEffect, useState } from 'react';
import { FiArrowLeft, FiTrash2, FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactMessagesManage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Charger les messages depuis le backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/messages")
      .then(res => {
        setMessages(res.data);
        if (res.data.length > 0) setSelectedId(res.data[0]._id);
      })
      .catch(err => console.error("Erreur chargement messages:", err));
  }, []);

  const handleSelect = (id) => setSelectedId(id);

  // Supprimer un message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`);
      
      const remaining = messages.filter(msg => msg._id !== id);
      setMessages(remaining);
      setSelectedId(remaining.length ? remaining[0]._id : null);

      toast.success("Message supprimé avec succès !");
    } catch (err) {
      console.error("Erreur suppression:", err);
      toast.error("Erreur lors de la suppression du message");
    }
  };

  // Marquer comme lu
  const handleMarkRead = (id) => {
    setMessages(messages.map(msg =>
      msg._id === id ? { ...msg, read: true } : msg
    ));
    toast.info("Message marqué comme lu !");
  };

  const selectedMessage = messages.find(msg => msg._id === selectedId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} />

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
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex" style={{ minHeight: '500px' }}>
          {/* Liste des messages */}
          <div className="w-1/3 border-r border-green-100 bg-green-50 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <FiMail className="mr-2" /> Boîte de réception
            </h2>
            <ul>
              {messages.map(msg => (
                <li
                  key={msg._id}
                  className={`mb-2 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedId === msg._id ? 'bg-white border border-green-300' : 'hover:bg-green-100'
                  }`}
                  onClick={() => handleSelect(msg._id)}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${!msg.read ? 'text-green-700' : 'text-gray-700'}`}>
                      Message
                    </span>
                    {!msg.read && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">Nouveau</span>}
                  </div>
                  <div className="text-xs text-gray-500 flex justify-between mt-1">
                    <span>{msg.nom}</span>
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
              {messages.length === 0 && (
                <li className="text-center text-gray-400 py-6">Aucun message reçu</li>
              )}
            </ul>
          </div>

          {/* Détail du message sélectionné */}
          <div className="w-2/3 p-8 flex flex-col justify-between">
            {selectedMessage ? (
              <>
                <div>
                  <div className="flex items-center mb-2">
                    <FiUser className="text-green-700 mr-2" />
                    <span className="font-bold text-green-700">{selectedMessage.nom}</span>
                    <span className="ml-4 text-gray-500">{selectedMessage.email}</span>
                  </div>
                  <div className="text-gray-700 mb-4">{selectedMessage.message}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    Envoyé le {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  {!selectedMessage.read && (
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => handleMarkRead(selectedMessage._id)}
                    >
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(selectedMessage._id)}
                  >
                    <FiTrash2 className="inline mr-1" /> Supprimer
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-6">Sélectionnez un message pour voir le détail</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesManage;
