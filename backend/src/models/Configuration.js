const mongoose = require("mongoose");

const ConfigurationSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "Mon entreprise"
    },
    logoUrl: {
      type: String,
      default: ""
    },

    // ======================
    // Thème global du site
    // ======================
    theme: {
      primaryColor: { type: String, default: "#0066ff" }, // couleur principale
      secondaryColor: { type: String, default: "#ffffff" }, // couleur secondaire
      backgroundColor: { type: String, default: "#f9f9f9" }, // couleur de fond
      textColor: { type: String, default: "#333333" }, // couleur du texte
      fontFamily: { type: String, default: "Inter, system-ui, sans-serif" },

      // Navbar
      navbar: {
        backgroundColor: { type: String, default: "#ffffff" },
        textColor: { type: String, default: "#333333" },
        hoverColor: { type: String, default: "#0066ff" },
        activeColor: { type: String, default: "#0044cc" }
      },

      // Footer
      footer: {
        backgroundColor: { type: String, default: "#222222" },
        textColor: { type: String, default: "#ffffff" },
        linkColor: { type: String, default: "#cccccc" },
        hoverColor: { type: String, default: "#ffffff" }
      },

      // Boutons
      button: {
        backgroundColor: { type: String, default: "#0066ff" },
        textColor: { type: String, default: "#ffffff" },
        hoverBackground: { type: String, default: "#0044cc" },
        hoverText: { type: String, default: "#ffffff" },
        borderRadius: { type: String, default: "8px" } // coins arrondis
      },

      // Sections personnalisables
      section: {
        headerBackground: { type: String, default: "#f0f0f0" },
        headerTextColor: { type: String, default: "#333333" },
        cardBackground: { type: String, default: "#ffffff" },
        cardTextColor: { type: String, default: "#333333" }
      }
    },

    // ======================
    // Paramètres de langue
    // ======================
    language: {
      type: String,
      default: "fr"
    },

    // ======================
    // Contact
    // ======================
    contact: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      socialMedia: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" }
      }
    },

    // ======================
    // Contenu du site
    // ======================
    content: {
      headerText: { type: String, default: "" },
      footerText: { type: String, default: "" },
      homeTitle: { type: String, default: "Bienvenue sur notre site" },
      homeSubtitle: { type: String, default: "" },
      aboutTitle: { type: String, default: "À propos de nous" },
      aboutText: { type: String, default: "" },
      servicesTitle: { type: String, default: "Nos services" },
      contactTitle: { type: String, default: "Contactez-nous" }
    }
  },
  { timestamps: true } // ajoute createdAt et updatedAt
);

module.exports = mongoose.model("Configuration", ConfigurationSchema);
