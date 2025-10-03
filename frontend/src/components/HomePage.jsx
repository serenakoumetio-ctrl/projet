import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/sections";

const HomePage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get(API_URL);
        setSections(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur fetch sections :", err);
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  if (loading)
    return <p className="text-center  text-gray-500">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="container mx-auto px-4 space-y-12">
        {sections.length > 0 ? (
          sections
            .sort((a, b) => a.position - b.position)
            .map((section) => {
              const bgColor =
                section.options?.backgroundColor || "bg-white";
              const textColor =
                section.options?.textColor || "text-gray-900";

              return (
                <section
                  key={section._id}
                  className={`rounded-3xl shadow-lg p-10 transition-transform transform hover:-translate-y-2 hover:shadow-2xl`}
                  style={{
                    background: section.options?.backgroundGradient || "#ffffff",
                    color: section.options?.textColor || "#111827",
                    fontFamily: section.options?.fontFamily || "Inter, sans-serif",
                  }}
                >
                  <h2 className="text-3xl font-bold mb-4 text-green-600">
                    {section.titre}
                  </h2>

                  <p className="text-lg mb-6">{section.contenu}</p>

                  {section.imageUrl && (
                    <div className="overflow-hidden rounded-xl mb-6">
                      <img
                        src={section.imageUrl}
                        alt={section.titre}
                        className="w-full object-cover transition-transform duration-500 hover:scale-105 max-h-96"
                      />
                    </div>
                  )}

                  {section.options?.buttonText &&
                    section.options?.buttonLink && (
                      <a
                        href={section.options.buttonLink}
                        className="inline-block bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                      >
                        {section.options.buttonText}
                      </a>
                    )}
                </section>
              );
            })
        ) : (
          <p className="text-center text-gray-400 text-lg">
            Aucune section pour le moment
          </p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
