import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('adminUser'));

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Tableau de Bord';
    if (path === '/accueil') return 'Édition - Accueil';
    if (path === '/apropos') return 'Édition - À Propos';
    if (path === '/fonctionnalites') return 'Édition - Fonctionnalités';
    if (path === '/homepage') return 'Édition - HomePage';
    if (path === '/footer') return 'Édition - Footer';
    if (path === '/navbar') return 'Édition - Navigation';
    if (path === '/messages') return 'Gestion des Messages';
    return 'Admin Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {getPageTitle()}
              </h1>
              {user && (
                <p className="text-sm text-gray-600">
                  Connecté en tant que {user.prenom} {user.nom}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;