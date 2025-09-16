import React, { useState } from 'react';
import { FiHome, FiInfo, FiGrid, FiMail, FiBell, FiUser, FiSettings, FiLogOut, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NavbarModify = () => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState('https://via.placeholder.com/50x30?text=LOGO');
  const [isEditingLogo, setIsEditingLogo] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Accueil", type: "Texte", icon: "FiHome", isEditing: false },
    { id: 2, name: "À propos", type: "Texte", icon: "FiInfo", isEditing: false },
    { id: 3, name: "Fonctionnalités", type: "Texte", icon: "FiGrid", isEditing: false },
    { id: 4, name: "Contact", type: "Texte", icon: "FiMail", isEditing: false },
  ]);
  const [userIcons, setUserIcons] = useState([
    { id: 5, name: "Notifications", type: "Icône", icon: "FiBell" },
    { id: 6, name: "Utilisateur", type: "Icône", icon: "FiUser" },
    { id: 7, name: "Paramètres", type: "Icône", icon: "FiSettings" },
    { id: 8, name: "Déconnexion", type: "Icône", icon: "FiLogOut" },
  ]);

  // Logique de modification
  const handleLogoEdit = () => setIsEditingLogo(!isEditingLogo);
  const handleLogoUrlChange = (e) => setLogoUrl(e.target.value);
  const handleMenuEdit = (id) => setMenuItems(menuItems.map(item =>
    item.id === id ? { ...item, isEditing: !item.isEditing } : item
  ));
  const handleMenuNameChange = (id, newName) => setMenuItems(menuItems.map(item =>
    item.id === id ? { ...item, name: newName } : item
  ));
  const handleDeleteMenu = (id) => setMenuItems(menuItems.filter(item => item.id !== id));
  const handleDeleteIcon = (id) => setUserIcons(userIcons.filter(item => item.id !== id));

  const handleSave = () => {
  alert("Les modifications ont bien été enregistrées !");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar du Dashboard (exacte) */}
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
              alt="Logo Dashboard"
              className="h-10"
            />
            <span className="text-xl font-bold">GOV-AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-xl cursor-pointer" />
            <FiUser className="text-xl cursor-pointer" />
            <FiSettings className="text-xl cursor-pointer" />
            <FiLogOut className="text-xl cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Contenu principal (avec marge pour la navbar fixe) */}
      <div className="container mx-auto pt-24 px-4">
        <div class="max-w-6xl mx-auto bg-[#FFF9C4] rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* En-tête de la section d'édition */}
            <div className="flex items-center mb-8">
              <h1 className="text-3xl font-bold text-green-700">
                Modifier la Navbar du site client
              </h1>
            </div>

            {/* Section d'édition des éléments de la navbar client */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Logo</h2>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-16 bg-gray-100 flex items-center justify-center rounded-lg">
                    <img src={logoUrl} alt="Logo client" className="max-h-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">URL actuelle : {logoUrl}</p>
                    {isEditingLogo && (
                      <input
                        type="text"
                        value={logoUrl}
                        onChange={handleLogoUrlChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nouvelle URL du logo"
                      />
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleLogoEdit}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit className="text-xl" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Menus */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Menus</h2>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-full mr-4">
                        {item.icon === "FiHome" && <FiHome className="text-blue-500" />}
                        {item.icon === "FiInfo" && <FiInfo className="text-blue-500" />}
                        {item.icon === "FiGrid" && <FiGrid className="text-blue-500" />}
                        {item.icon === "FiMail" && <FiMail className="text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Type : {item.type}</p>
                        {item.isEditing && (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleMenuNameChange(item.id, e.target.value)}
                            className="mt-2 p-2 border rounded-lg w-full"
                            placeholder="Nouveau nom"
                          />
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleMenuEdit(item.id)}
                          className="p-2 text-blue-600 hover:text-blue-800"
                          title="Modifier"
                        >
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.id)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Icônes utilisateur */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Icônes utilisateur</h2>
                <div className="space-y-4">
                  {userIcons.map((item) => (
                    <div key={item.id} className="flex items-center p-4 bg-white rounded-lg">
                      <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-full mr-4">
                        {item.icon === "FiBell" && <FiBell className="text-blue-500" />}
                        {item.icon === "FiUser" && <FiUser className="text-blue-500" />}
                        {item.icon === "FiSettings" && <FiSettings className="text-blue-500" />}
                        {item.icon === "FiLogOut" && <FiLogOut className="text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Type : {item.type}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button className="p-2 text-blue-600 hover:text-blue-800" title="Modifier">
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteIcon(item.id)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
  onClick={handleSave}
  className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 transition duration-300"
>
  ✅ Valider les modifications
</button>
      </div>
    </div>
  );
};

export default NavbarModify;
