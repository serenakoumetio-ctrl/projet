// import React, { useState } from "react";

// import {
//   CheckCircleIcon,
//   ShieldCheckIcon,
//   GlobeAltIcon,
//   BoltIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/outline";

// const Apropos = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const cards = [
//     {
//       title: "Mission & Vision",
//       content:
//         "Gov‑AI modernise l’accès aux textes de loi grâce à l’IA pour une administration plus transparente.",
//     },
//     {
//       title: "Ce que nous offrons",
//       content:
//         "Moteur de recherche juridique, alertes personnalisées, analyse automatisée, interface intuitive.",
//     },
//     {
//       title: "Notre approche",
//       content:
//         "Une technologie éthique, locale et pensée pour les administrations camerounaises.",
//     },
//     {
//       title: "Accessibilité",
//       content:
//         "Une solution multilingue disponible sur tous les supports (web, mobile, desktop).",
//     },
//     {
//       title: "Sécurité",
//       content:
//         "Des données encryptées et hébergées localement pour garantir la souveraineté numérique.",
//     },
//     {
//       title: "Pourquoi GOV-AI ?",
//       content:
//         "Parce que l'accès aux textes juridiques doit être simple, rapide et intelligent. GOV-AI permet aux agents publics de trouver en quelques secondes les textes pertinents, évitant des heures de recherche manuelle.",
//     },
//     {
//       title: "Pour qui est GOV-AI ?",
//       content:
//         "GOV-AI s’adresse aux juristes, aux administrations, aux magistrats, mais aussi aux citoyens souhaitant mieux comprendre leurs droits et les lois en vigueur.",
//     },
//     {
//       title: "Un assistant juridique intelligent",
//       content:
//         "Basé sur l’intelligence artificielle, GOV-AI comprend vos requêtes en langage naturel, suggère des articles de loi pertinents, et apprend continuellement pour améliorer ses réponses.",
//     },
//   ];

//   return (
//     <section
//       id="Apropos"
//       className="py-20 bg-gradient-to-br from-gray-100 overflow-hidden"
//     >
//       {/* Titre principal animé avec soulignement */}
//       <h2
//         className="relative text-3xl md:text-5xl font-extrabold mb-16 bg-gradient-to-r from-green-600 via-yellow-400 to-green-500 bg-clip-text text-transparent animate-fade-slide-up w-fit mx-auto
//           after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:rounded-full
//           after:bg-gradient-to-r after:from-gray-100 after:via-yellow-400 after:to-green-500 after:animate-pulse"
//       >
//         C'est quoi GOV-IA ? / What's GOV-AI ?
//       </h2>

//       {/* Texte de présentation globale */}
//       <div className="max-w-4xl mx-auto px-6 text-center mb-20"><li className="flex items-start gap-4">
//               <CheckCircleIcon className="w-7 h-7 flex-shrink-0 text-green-600 mt-1" />
//               <span></span>
//             </li>
//         <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
//           GOV-AI est une plateforme technologique de pointe conçue pour
//           révolutionner l’accès aux textes juridiques et administratifs au
//           Cameroun. Pensée pour les fonctionnaires, les juristes, les
//           magistrats mais aussi pour les citoyens, elle propose une nouvelle
//           manière de consulter, comprendre et utiliser les lois en vigueur.
//           Grâce à son intelligence artificielle, GOV-AI analyse les besoins en
//           temps réel, suggère des contenus pertinents, et facilite la prise de
//           décision administrative dans un cadre sécurisé, rapide et intuitif.
//           Son objectif : rapprocher le droit du citoyen et rendre
//           l’administration plus efficace.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
//         {/* Cercle image avec animation */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center">
//           <div className="relative w-[150px] h-[400px] md:w-80 md:h-[500px] rounded-full overflow-hidden shadow-xl border-4 border-green-400 animate-pulse-slow">
//             <img
//               src="/img/interface.png"
//               alt="Gov-AI"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply"></div>
//           </div>
//         </div>

//         {/* Cartes scroll automatique */}
//         <div className="w-full lg:w-1/2 h-[500px] overflow-hidden relative group">
//           <div className="scroll-wrapper animate-scroll group-hover:[animation-play-state:paused]">
//             {[...cards, ...cards].map((card, index) => (
//               <div
//                 key={index}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className="bg-green-50 p-6 rounded-xl shadow-md my-4 mx-2 transition-transform hover:scale-[1.02] cursor-pointer"
//               >
//                 <h3 className="text-xl font-bold text-green-700 mb-2">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-700">{card.content}</p>

//                 {/* Plein écran au survol */}
//                 {hoveredCard === index && (
//                   <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-10">
//                     <div className="max-w-2xl bg-green-50 p-10 rounded-3xl shadow-xl">
//                       <h3 className="text-3xl font-bold text-green-700 mb-6">
//                         {card.title}
//                       </h3>
//                       <p className="text-lg text-gray-700">{card.content}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Carte conclusive */}
//       <div className="max-w-5xl mx-auto mt-20 px-6" data-aos="fade-up" data-aos-delay="300">
//         <div className="bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 p-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105">
//           <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
//             Voici ce qu&apos;est GOV-AI 🌐
//           </h3>

//           <ul className="space-y-6 text-gray-800 text-lg leading-relaxed">
//             <li className="flex items-start gap-4">
//               <CheckCircleIcon className="w-7 h-7 flex-shrink-0 text-green-600 mt-1" />
//               <span>Assistant juridique intelligent qui révolutionne l’accès aux lois et réglementations.</span>
//             </li>
//             <li className="flex items-start gap-4">
//               <GlobeAltIcon className="w-7 h-7 flex-shrink-0 text-yellow-500 mt-1" />
//               <span>Accessibilité multilingue adaptée aux besoins des administrations camerounaises.</span>
//             </li>
//             <li className="flex items-start gap-4">
//               <ShieldCheckIcon className="w-7 h-7 flex-shrink-0 text-green-700 mt-1" />
//               <span>Garantit la sécurité et la souveraineté numérique avec un hébergement local des données.</span>
//             </li>
//             <li className="flex items-start gap-4">
//               <BoltIcon className="w-7 h-7 flex-shrink-0 text-yellow-400 mt-1" />
//               <span>Accélère la prise de décision administrative grâce à des suggestions précises et rapides.</span>
//             </li>
//             <li className="flex items-start gap-4">
//               <UserGroupIcon className="w-7 h-7 flex-shrink-0 text-green-600 mt-1" />
//               <span>Une solution pensée pour tous : agents publics, juristes, magistrats et citoyens.</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Apropos;



//version liee au backend
import React, { useState, useEffect } from "react";
import useContent from '../hooks/useContent';
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Apropos = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Détecter le mode sombre à chaque changement
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    handleThemeChange();

    // Écoute les changements de classe "dark" sur <html>
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const defaultAproposContent = {
    title: "C'est quoi GOV-AI ? / What's GOV-AI ?",
    description: "GOV-AI est une plateforme technologique de pointe conçue pour révolutionner l'accès aux textes juridiques et administratifs au Cameroun...",
    cards: [],
    conclusion: { title: "Voici ce qu'est GOV-AI 🌐", points: [] }
  };

  const { content, loading } = useContent('apropos', defaultAproposContent);

  const safeCards = Array.isArray(content.cards) ? content.cards : [];
  const safePoints = Array.isArray(content.conclusion?.points) ? content.conclusion.points : [];
  const conclusionTitle = content.conclusion?.title || defaultAproposContent.conclusion.title;

  if (loading) {
    return (
      <section className={`py-20 ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-100 text-gray-800'} overflow-hidden`}>
        <div className="flex justify-center items-center h-40">
          <p>Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="Apropos"
      className={`py-20 overflow-hidden transition-colors duration-500 
        ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-100 text-gray-800'}`}
    >

      {/* Titre principal */}
      <h2 className="relative text-3xl md:text-5xl font-extrabold mb-16 bg-gradient-to-r from-green-600 via-yellow-400 to-green-500 bg-clip-text text-transparent animate-fade-slide-up w-fit mx-auto">
        {content.title}
      </h2>

      {/* Description principale */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <p className="text-lg md:text-xl leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Cercle image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-[150px] h-[400px] md:w-80 md:h-[500px] rounded-full overflow-hidden shadow-xl border-4 border-green-400 animate-pulse-slow">
            <img src="/img/interface.png" alt="Gov-AI" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Cartes scrollables */}
        <div className="w-full lg:w-1/2 h-[500px] overflow-hidden relative group">
          <div className="scroll-wrapper animate-scroll group-hover:[animation-play-state:paused]">
            {[...safeCards, ...safeCards].map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 rounded-xl shadow-md my-4 mx-2 transition-transform hover:scale-[1.02] cursor-pointer
                  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-green-50 text-gray-700'}`}
              >
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                  {card.title}
                </h3>
                <p>{card.content}</p>

                {/* Plein écran au survol */}
                {hoveredCard === index && (
                  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-10">
                    <div className={`max-w-2xl p-10 rounded-3xl shadow-xl transition-colors
                      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-green-50 text-gray-700'}`}>
                      <button
                        onClick={() => setHoveredCard(null)}
                        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                      >×</button>
                      <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                        {card.title}
                      </h3>
                      <p>{card.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carte conclusive */}
      <div className="max-w-5xl mx-auto mt-20 px-6">
        <div className={`p-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105
          ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 text-gray-800'}`}>
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
            {conclusionTitle}
          </h3>
          <ul className="space-y-6 text-lg leading-relaxed">
            {safePoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircleIcon className={`w-7 h-7 flex-shrink-0 mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Apropos;
