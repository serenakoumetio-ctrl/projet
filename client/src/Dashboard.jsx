// import React, { useState, useEffect } from 'react';
// import { FiBell, FiUser, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
// import { FaPaintBrush, FaFileAlt, FaImage, FaPlus, FaEnvelope } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [displayedText, setDisplayedText] = useState('');
//   const [index, setIndex] = useState(0);
//   const [isTyping, setIsTyping] = useState(true);
//   const text = "Voici vos différentes actions sur la page client";
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeout;
//     if (isTyping) {
//       if (index < text.length) {
//         timeout = setTimeout(() => {
//           setDisplayedText(prev => prev + text.charAt(index));
//           setIndex(prev => prev + 1);
//         }, 80);
//       } else {
//         timeout = setTimeout(() => {
//           setIsTyping(false);
//           setTimeout(() => {
//             setDisplayedText('');
//             setIndex(0);
//             setIsTyping(true);
//           }, 1500);
//         }, 500);
//       }
//     }
//     return () => clearTimeout(timeout);
//   }, [index, isTyping]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const adminActions = [
//     {
//       id: 1,
//       icon: <FaPaintBrush className="text-purple-500" />,
//       title: "Modifier le design",
//       description: "Change les couleurs, les polices, l'arrière-plan d'une section",
//       onClick: () => navigate('/modify-design')
//     },
//         {
//       id: 2,
//       icon: <FaPaintBrush className="text-purple-500" />,
//       title: "Gerer le contenu",
//       description: "Ajoute ou édite les textes et titres de différentes sections",
//       onClick: () => navigate('./pages/ManageContents')
//     },
//     {
//       id: 3,
//       icon: <FaImage className="text-green-500" />,
//       title: "Gérer les images",
//       description: "Upload de bannières, logos, illustrations d'une section",
//       onClick: () => navigate('/images-manage')
//     },
//     {
//       id: 4,
//       icon: <FaPlus className="text-red-500" />,
//       title: "Gérer les pages et sections",
//       description: "Crée des pages et ajoute des sections",
//       onClick: () => navigate('/pages-sections-manage')
//     },
//     {
//       id: 5,
//       icon: <FaPlus className="text-yellow-500" />,
//       title: "Ajouter des blocs dynamiques",
//       description: "Titre + image + paragraphe, ou bloc galerie, tableau, etc.",
//       onClick: () => navigate('/dynamic-blocks-manage')
//     },
//     {
//       id: 6,
//       icon: <FaEnvelope className="text-teal-500" />,
//       title: "Gérer les messages de contact",
//       description: "Voir les messages envoyés via le formulaire",
//       onClick: () => navigate('/contact-messages-manage')
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
//       {/* Navbar et Sidebar (inchangé) */}
//       <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
//             <img src="/images/armoiries_logo_cenadi.png" alt="Logo" className="h-10" />
//             <span className="text-xl font-bold">GOV-AI_Admin</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <FiBell className="text-xl cursor-pointer" />
//             <FiUser className="text-xl cursor-pointer" />
//             <FiSettings className="text-xl cursor-pointer" />
//             <FiLogOut className="text-xl cursor-pointer" />
//           </div>
//         </div>
//       </nav>

//       <div className={`fixed top-0 left-0 h-full bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 w-64`}>
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">Menu</h2>
//           <ul>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Tableau de bord</li>
//             <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">Utilisateurs</li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Paramètres</li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Messages</li>
//           </ul>
//         </div>
//       </div>

//       <div className="container mx-auto pt-20 px-4">
//         <h1 className="text-3xl font-bold mb-4">Que voulez-vous faire Administrateur(trice) ?</h1>
//         <div className="mb-8 p-6 bg-white bg-opacity-80 rounded-lg shadow-md border border-green-100">
//           <div className="flex items-center">
//             <span className={`text-xl font-medium text-green-700 transition-all duration-300 ${index === text.length ? 'animate-bounce' : ''}`}>
//               {displayedText}
//             </span>
//             <span className={`ml-1 h-6 w-0.5 bg-green-700 ${index < text.length ? 'animate-pulse' : 'hidden'}`}></span>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {adminActions.map((action) => (
//             <div
//               key={action.id}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//               onClick={action.onClick}
//             >
//               <div className="flex items-center space-x-4">
//                 <div className="text-3xl">{action.icon}</div>
//                 <div>
//                   <h2 className="text-xl font-bold">{action.title}</h2>
//                   <p className="text-gray-600">{action.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;











import React, { useState, useEffect } from 'react';
import { FiBell, FiUser, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import { FaPaintBrush, FaImage, FaPlus, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) navigate('/login');
  }, [navigate]);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const adminActions = [
    { id: 1, icon: <FaPaintBrush className="text-purple-500" />, title: "Modifier le design", description: "Changer le design du site", onClick: () => navigate('/modify-design') },
    { id: 2, icon: <FaPaintBrush className="text-purple-500" />, title: "Gérer le contenu", description: "Éditer textes et titres", onClick: () => navigate('/pages/ManageContents') },
    { id: 3, icon: <FaImage className="text-green-500" />, title: "Gérer les images", description: "Upload images et logos", onClick: () => navigate('/images-manage') },
    { id: 4, icon: <FaPlus className="text-red-500" />, title: "Gérer pages et sections", description: "Créer des pages et sections", onClick: () => navigate('/pages-sections-manage') },
    { id: 5, icon: <FaPlus className="text-yellow-500" />, title: "Blocs dynamiques", description: "Ajouter tableaux, galeries...", onClick: () => navigate('/dynamic-blocks-manage') },
    { id: 6, icon: <FaEnvelope className="text-teal-500" />, title: "Messages de contact", description: "Voir les messages reçus", onClick: () => navigate('/contact-messages-manage') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
            <img src="/img/2.png" alt="Logo" className="h-10" />
            <span className="text-xl font-bold">GOV-AI_Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl cursor-pointer" />
            <FiUser className="text-xl cursor-pointer" />
            <FiSettings className="text-xl cursor-pointer" />
            <FiLogOut className="text-xl cursor-pointer" onClick={handleLogout} title="Déconnexion" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 w-64`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul>
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Tableau de bord</li>
            <li className="py-2 px-4 hover:bg-gray-100 rounded cursor-pointer">Utilisateurs</li>
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Paramètres</li>
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Messages</li>
          </ul>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold mb-4">Bienvenue Administrateur(trice) !</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminActions.map((action) => (
            <div key={action.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={action.onClick}>
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{action.icon}</div>
                <div>
                  <h2 className="text-xl font-bold">{action.title}</h2>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

