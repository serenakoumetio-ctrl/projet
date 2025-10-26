import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
  return (
     <section
      id="HomePage"
      className="py-20 bg-gradient-to-br from-gray-100  overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
        
        {/* Texte côté gauche */}
        <div className="w-full lg:w-1/2 text-gray-800 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Bienvenue sur GOV-AI
          </h1>
          <p className="text-lg leading-relaxed">
            GOV-AI est une plateforme d'intelligence artificielle conçue pour transformer l'accès au droit et aux textes juridiques au Cameroun. Grâce à une technologie avancée et une interface intuitive, elle rapproche le droit du citoyen tout en renforçant l'efficacité administrative.
          </p>
          <p className="text-lg leading-relaxed">
            Vous êtes un juriste, un magistrat, un agent public ou un simple citoyen curieux de comprendre les lois en vigueur ? GOV-AI vous accompagne dans vos recherches, vous informe en temps réel et vous aide à naviguer dans un océan d’informations juridiques.
          </p>
          <p className="text-lg leading-relaxed">
            Grâce à l'analyse intelligente, aux alertes personnalisées, et à l'interprétation des requêtes en langage naturel, GOV-AI va bien au-delà d’un simple moteur de recherche. Il devient votre assistant juridique du quotidien.
          </p>
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
              <div>
                <img src="/img/interface.png" alt="Interface GOV-AI" />
              </div>
              <div>
                <img src="/img/acceuilNgom.png" alt="Dashboard" />
              </div>

            </Carousel>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomePage;
