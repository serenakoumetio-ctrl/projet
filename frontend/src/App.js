import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";


import Header from "./components/Header";
import Hero from "./components/Hero";
import Cards from "./components/Cards";


import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Formulaire from "./components/Formulaire";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="b">
      <section >

        <Header />
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
