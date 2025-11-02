





// import React, { useState, useEffect } from 'react';
// import { FiBell, FiUser, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
// import { FaPaintBrush, FaImage, FaPlus, FaEnvelope } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Vérifier si l'utilisateur est connecté
//   useEffect(() => {
//     const currentUser = localStorage.getItem('currentUser');
//     if (!currentUser) navigate('/login');
//   }, [navigate]);

//   // Déconnexion
//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     navigate('/login');
//   };

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const adminActions = [
//     { id: 1, icon: <FaPaintBrush className="text-purple-500" />, title: "Modifier le design", description: "Changer le design du site", onClick: () => navigate('/modify-design') },
//   { id: 2, icon: <FaPaintBrush className="text-purple-500" />, title: "Gérer le contenu", description: "Éditer textes et titres", onClick: () => navigate('/dashboard/pages/ManageContents') },
//     { id: 3, icon: <FaImage className="text-green-500" />, title: "Gérer les images", description: "Upload images et logos", onClick: () => navigate('/images-manage') },
//     { id: 4, icon: <FaPlus className="text-red-500" />, title: "Gérer pages et sections", description: "Créer des pages et sections", onClick: () => navigate('/pages-sections-manage') },
//     { id: 5, icon: <FaPlus className="text-yellow-500" />, title: "Blocs dynamiques", description: "Ajouter tableaux, galeries...", onClick: () => navigate('/dynamic-blocks-manage') },
//     { id: 6, icon: <FaEnvelope className="text-teal-500" />, title: "Messages de contact", description: "Voir les messages reçus", onClick: () => navigate('/contact-messages-manage') },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
//       {/* Navbar */}
//       <nav className="bg-gradient-to-r from-green-500 to-yellow-500 text-white p-4 shadow-md fixed w-full z-50">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
//             <img src="/img/2.png" alt="Logo" className="h-10" />
//             <span className="text-xl font-bold">GOV-AI_Admin</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <FiBell className="text-xl cursor-pointer" />
//             <FiUser className="text-xl cursor-pointer" />
//             <FiSettings className="text-xl cursor-pointer" />
//             <FiLogOut className="text-xl cursor-pointer" onClick={handleLogout} title="Déconnexion" />
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
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

//       {/* Contenu principal */}
//       <div className="container mx-auto pt-20 px-4">
//         <h1 className="text-3xl font-bold mb-4">Bienvenue Administrateur(trice) !</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {adminActions.map((action) => (
//             <div key={action.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={action.onClick}>
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
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('adminUser'));

  const sections = [
    { 
      name: 'Accueil', 
      path: '/accueil', 
      description: 'Modifier le titre, texte et image de la page d\'accueil',
      icon: '🏠'
    },
    { 
      name: 'À Propos', 
      path: '/apropos', 
      description: 'Gérer le contenu de la section À Propos',
      icon: 'ℹ️'
    },
    { 
      name: 'Fonctionnalités', 
      path: '/fonctionnalites', 
      description: 'Modifier les fonctionnalités affichées',
      icon: '⚙️'
    },
    { 
      name: 'HomePage', 
      path: '/homepage', 
      description: 'Gérer le contenu et images de la section principale',
      icon: '📄'
    },
    { 
      name: 'Footer', 
      path: '/footer', 
      description: 'Configurer le pied de page et les contacts',
      icon: '👣'
    },
    { 
      name: 'Navigation', 
      path: '/navbar', 
      description: 'Personnaliser le menu de navigation',
      icon: '🧭'
    },
    { 
      name: 'Messages', 
      path: '/messages', 
      description: 'Gérer les messages reçus du formulaire de contact',
      icon: '✉️'
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tableau de Bord Admin
        </h1>
        {user && (
          <p className="text-gray-600">
            Bienvenue, <span className="font-semibold">{user.prenom} {user.nom}</span> ({user.matricule})
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            to={section.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{section.icon}</span>
              <h2 className="text-xl font-semibold text-green-600">
                {section.name}
              </h2>
            </div>
            <p className="text-gray-600">
              {section.description}
            </p>
            <div className="mt-4 text-green-500 font-medium flex items-center">
              Accéder <span className="ml-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;