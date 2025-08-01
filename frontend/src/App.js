import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";


import Header from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";


import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Formulaire from "./components/Formulaire";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="b">
      <section >

        <Navbar />
        <Hero />
        <FAQ />
        <Cards />
        <Formulaire/>
        <Footer />
      </section>

    </div>
  );
}

export default App;
