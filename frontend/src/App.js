import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";




import Accueil from "./pages/Accueil";


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
   

      <Accueil/>
    
  );
}

export default App;
