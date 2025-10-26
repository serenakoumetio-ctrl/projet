import React from "react";
import Navbar from "../components/Navbar";
import Acc from "../components/Acc";
import HomePage from "../components/HomePage";
import Fonctionalite from "../components/Fonctionalite";
import Formulaire from "../components/Formulaire";
import Footer from "../components/Footer";
import Apropos from "../components/Apropos";

function Accueil() {
  return (
    //  Ce conteneur contrôle tout le fond du site
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-green-50 to-white dark:from-gray-500 dark:via-gray-800 dark:to-black transition-all duration-700">
      {/*  Tous les composants sont inclus dans le même fond */}
      <Navbar />
      <Acc />
      <Apropos />
      <HomePage />
      <Fonctionalite />
      <Formulaire />
      <Footer />
    </div>
  );
}

export default Accueil;
