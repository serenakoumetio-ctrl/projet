import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
  const [content, setContent] = useState({
    title: "",
    paragraphs: [],
    carouselImages: []
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Détecter le thème actuel et suivre les changements
  useEffect(() => {
    const checkTheme = () => setIsDarkMode(document.documentElement.classList.contains('dark'));

    checkTheme(); // au chargement initial

    // Observer les changements de classe 'dark' sur <html>
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/content/homepage')
      .then(res => res.json())
      .then(data => {
        if (data.success) setContent(data.data);
      })
      .catch(err => console.error('Erreur chargement contenu :', err));
  }, []);

  return (
    <section className={`py-20 overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-100 text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Texte côté gauche */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-green-700'}`}>
            {content.title || "Bienvenue sur GOV-AI"}
          </h1>
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className={`text-lg leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Carrousel d'images à droite */}
        <div className="w-[200px] md:w-[300px] rounded-3xl overflow-hidden shadow-lg border-2 border-green-300 mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-green-300">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={4000}
              transitionTime={800}
              stopOnHover
            >
              {content.carouselImages.map((image, index) => (
                <div key={index}>
                  <img 
                    src={`http://localhost:5000${image}`}
                    alt={`GOV-AI Interface ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
