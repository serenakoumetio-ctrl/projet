import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react"; //import du usee effect pour exécuter du code après que le composant est monté dans le DOM.
import AOS from "aos"; //pour initialiser les animations. npm install aos pour installer la bibliothe d'qnimation

import "aos/dist/aos.css"; //ci, on importe le fichier CSS de la bibliothèque AOS (Animate On Scroll).




import Accueil from "./pages/Accueil";


function App() {
  useEffect(() => { //useEffect est un "hook" React Il s'exécute APRÈS que le composant soit affiché à l'écran

    AOS.init({ duration: 1000 }); //initialise la bibliothèque d'animations { duration: 1000 } signifie que chaque animation durera 1 seconde
  });

  return (
   

      <Accueil/>
    
  );
}

export default App;

//AOS.init({ duration: 1000 }) :C’est ici qu’on initialise AOS. L’option { duration: 1000 } signifie : chaque animation durera 1000milliseconde soit 1s
