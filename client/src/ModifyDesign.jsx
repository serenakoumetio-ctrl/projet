import React from 'react';
import { FiBell, FiUser, FiSettings, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ModifyDesign = () => {
  const navigate = useNavigate();

  const designOptions = [
    {
      id: 1,
      title: "Navbar",
      description: "Modifiez la famille de police, la taille et le style du texte",
      path: "/navbar-modify"
    },
    {
      id: 2,
      title: "Header",
      description: "Choisissez une nouvelle couleur ou un dégradé pour l'arrière-plan",
      path: "/header-modify"
    },
    {
      id: 3,
      title: "Body",
      description: "Personnalisez la typographie pour une section particulière",
      path: "/body-modify"
    },
    {
      id: 4,
      title: "Footer",
      description: "Personnalisez la typographie pour une section particulière",
      path: "/footer-modify"
    }
  ];

  // Couleurs pour chaque lettre
  const letterColors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-gray-200">
      {/* Navbar */}
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
              src="/img/2.png"
              alt="Logo"
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

      {/* Contenu principal */}
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-100 pb-4">
              Sur quelle section voulez-vous modifier le design ?
            </h1>

            <div className="space-y-6">
              {designOptions.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => navigate(option.path)}
                  className="flex items-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className={`p-3 mr-4 ${letterColors[index]} rounded-full text-white font-bold`}>
                    {option.title.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{option.title}</h2>
                    <p className="text-gray-600 mt-1">{option.description}</p>
                  </div>
                  <div className="ml-4 text-green-500 hover:text-green-700 text-lg">
                    →
                  </div>
                </div>
              ))}
            </div>

            {/* Pied de carte avec conseils */}
            <div className="bg-green-50 p-6 mt-6 rounded-b-lg">
              <p className="text-green-700 font-medium">
                Conseil : Pour une cohérence visuelle, essayez de limiter à 2-3 polices différentes sur votre site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyDesign;
