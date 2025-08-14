import React from "react";
import Navbar from "../components/Navbar";
import Acc from "../components/Acc";
import Fonctionalite from "../components/Fonctionalite";
import Formulaire from "../components/Formulaire";
import Footer from "../components/Footer";
import Apropos from "../components/Apropos";


function Accueil() {
  return (
    <div className=" ">

      <Navbar/>     
      <Acc/>
      <Apropos/>
      <Fonctionalite/>
      <Formulaire/>
      <Footer/>

    </div>
  );
}

export default Accueil;
