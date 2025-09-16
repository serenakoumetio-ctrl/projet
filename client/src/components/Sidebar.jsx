import React from 'react';

function Sidebar({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-green-200 to-white shadow-lg z-40 p-6 space-y-4">
      {/* Titre ou bouton de fermeture */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-green-800">Menu Admin</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
      </div>

      {/* Options */}
      <ul className="space-y-3 text-green-900 font-semibold">
        <li className="underline">Tableau de bord</li>
        <li className="hover:underline cursor-pointer">Pages</li>
        <li className="hover:underline cursor-pointer">Section</li>
        <li className="hover:underline cursor-pointer">Images</li>
        <li className="hover:underline cursor-pointer">Apparence</li>
        <li className="hover:underline cursor-pointer">Traductions</li>
        <li className="hover:underline cursor-pointer">Messages</li>
        <li className="hover:underline cursor-pointer">Paramètres</li>
      </ul>
    </div>
  );
}

export default Sidebar;