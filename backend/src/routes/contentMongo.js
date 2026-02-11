const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Charger les données par défaut (même structure que content.json)
const getDefaultData = () => ({
  accueil: {
    title: "Gov-AI : Révolutionner l'accès aux textes de loi du Cameroun",
    subtitle: "Une intelligence artificielle dédiée aux fonctionnaires pour une administration plus transparente, rapide et fiable.",
    buttonText: "En savoir plus",
    backgroundImage: "/img/STAND.png"
  },
  apropos: {
    title: "C'est quoi GOV-IA ? / What's GOV-AI ?",
    description: "GOV-AI est une plateforme technologique de pointe conçue pour révolutionner l'accès aux textes juridiques et administratifs au Cameroun. Pensée pour les fonctionnaires, les juristes, les magistrats mais aussi pour les citoyens, elle propose une nouvelle manière de consulter, comprendre et utiliser les lois en vigueur. Grâce à son intelligence artificielle, GOV-AI analyse les besoins en temps réel, suggère des contenus pertinents, et facilite la prise de décision administrative dans un cadre sécurisé, rapide et intuitif. Son objectif : rapprocher le droit du citoyen et rendre l'administration plus efficace.",
    cards: [
      {
        title: "Mission & Vision",
        content: "Gov‑AI modernise l'accès aux textes de loi grâce à l'IA pour une administration plus transparente."
      },
      {
        title: "Ce que nous offrons",
        content: "Moteur de recherche juridique, alertes personnalisées, analyse automatisée, interface intuitive."
      },
      {
        title: "Notre approche",
        content: "Une technologie éthique, locale et pensée pour les administrations camerounaises."
      },
      {
        title: "Accessibilité",
        content: "Une solution multilingue disponible sur tous les supports (web, mobile, desktop)."
      },
      {
        title: "Sécurité",
        content: "Des données encryptées et hébergées localement pour garantir la souveraineté numérique."
      },
      {
        title: "Pourquoi GOV-AI ?",
        content: "Parce que l'accès aux textes juridiques doit être simple, rapide et intelligent. GOV-AI permet aux agents publics de trouver en quelques secondes les textes pertinents, évitant des heures de recherche manuelle."
      },
      {
        title: "Pour qui est GOV-AI ?",
        content: "GOV-AI s'adresse aux juristes, aux administrations, aux magistrats, mais aussi aux citoyens souhaitant mieux comprendre leurs droits et les lois en vigueur."
      },
      {
        title: "Un assistant juridique intelligent",
        content: "Basé sur l'intelligence artificielle, GOV-AI comprend vos requêtes en langage naturel, suggère des articles de loi pertinents, et apprend continuellement pour améliorer ses réponses."
      }
    ],
    conclusion: {
      title: "Voici ce qu'est GOV-AI 🌐",
      points: [
        "Assistant juridique intelligent qui révolutionne l'accès aux lois et réglementations.",
        "Accessibilité multilingue adaptée aux besoins des administrations camerounaises.",
        "Garantit la sécurité et la souveraineté numérique avec un hébergement local des données.",
        "Accélère la prise de décision administrative grâce à des suggestions précises et rapides.",
        "Une solution pensée pour tous : agents publics, juristes, magistrats et citoyens."
      ]
    }
  },
  fonctionnalite: {
    title: "GOV-AI COMMENT CA MARCHE ?",
    features: [
      {
        title: "Recherche intelligente",
        description: "Trouvez rapidement les textes juridiques pertinents grâce à une recherche en langage naturel.",
        icon: "MagnifyingGlassCircleIcon"
      },
      {
        title: "Alertes personnalisées",
        description: "Recevez des notifications lorsqu'un nouveau texte ou amendement vous concerne.",
        icon: "BellAlertIcon"
      },
      {
        title: "Analyse automatisée",
        description: "Comprenez rapidement le contenu juridique grâce à des résumés générés par l'IA.",
        icon: "DocumentCheckIcon"
      },
      {
        title: "Assistance conversationnelle",
        description: "Posez vos questions juridiques à l'assistant GOV-AI et obtenez des réponses précises.",
        icon: "ChatBubbleBottomCenterTextIcon"
      },
      {
        title: "Multi-plateforme",
        description: "Accédez à GOV-AI depuis le web, votre mobile ou votre poste de travail.",
        icon: "DevicePhoneMobileIcon"
      }
    ]
  },
  homepage: {
    title: "Bienvenue sur GOV-AI",
    paragraphs: [
      "GOV-AI est une plateforme d'intelligence artificielle conçue pour transformer l'accès au droit et aux textes juridiques au Cameroun. Grâce à une technologie avancée et une interface intuitive, elle rapproche le droit du citoyen tout en renforçant l'efficacité administrative.",
      "Vous êtes un juriste, un magistrat, un agent public ou un simple citoyen curieux de comprendre les lois en vigueur ? GOV-AI vous accompagne dans vos recherches, vous informe en temps réel et vous aide à naviguer dans un océan d'informations juridiques.",
      "Grâce à l'analyse intelligente, aux alertes personnalisées, et à l'interprétation des requêtes en langage naturel, GOV-AI va bien au-delà d'un simple moteur de recherche. Il devient votre assistant juridique du quotidien."
    ],
    carouselImages: [
      "/upload/4.png",
      "/upload/SAGO.png",
      "/upload/STAND.png"
    ]
  },
  footer: {
    institution: "Centre National de Développement de l'Informatique",
    logo: "/upload/ll.png",
    address: "13 750 Yaoundé, derrière le Musée National, Cameroun",
    phone: "(+237) 222 235 965",
    email: "contact@cenadi.cm",
    navigation: [
      { name: "Accueil", href: "#Acc" },
      { name: "À propos", href: "#Apropos" },
      { name: "Fonctionnalités", href: "#Fonctionalite" },
      { name: "Services", href: "#HomePage" }
    ],
    socialLinks: [
      { platform: "Facebook", url: "#", icon: "FaFacebook" },
      { platform: "Twitter", url: "#", icon: "FaTwitter" },
      { platform: "LinkedIn", url: "#", icon: "FaLinkedin" }
    ],
    copyright: "© 2025 CENADI. Tous droits réservés."
  },
  navbar: {
    logoText: "GOV-AI",
    menuItems: [
      { name: "À propos", href: "#Apropos", icon: "FaInfoCircle" },
      { name: "Fonctionnalité", href: "#Fonctionalite", icon: "FaCogs" },
      { name: "Services", href: "#HomePage", icon: "FaServicestack" },
      { name: "Contact", href: "#Footer", icon: "FaEnvelope" }
    ],
    themeToggle: true
  }
});

// Initialiser la base de données avec les données par défaut
const initializeDatabase = async () => {
  try {
    const defaultData = getDefaultData();
    for (const [section, data] of Object.entries(defaultData)) {
      const existing = await Content.findOne({ section });
      if (!existing) {
        await Content.create({ section, data });
        console.log(`✅ Section "${section}" initialisée`);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la DB:', error);
  }
};

// Appeler l'initialisation au démarrage
initializeDatabase();

// GET - Récupérer le contenu d'une section
router.get('/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    const sectionData = content ? content.data : {};

    res.json({
      success: true,
      data: sectionData
    });
  } catch (error) {
    console.error('Erreur récupération contenu:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// GET - Récupérer tout le contenu
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find({});
    const data = {};
    contents.forEach(content => {
      data[content.section] = content.data;
    });

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erreur récupération contenu global:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// PUT - Mettre à jour une section
router.put('/:section', async (req, res) => {
  try {
    const section = req.params.section;
    const newData = req.body;

    const content = await Content.findOneAndUpdate(
      { section },
      {
        data: newData,
        updatedAt: new Date()
      },
      {
        new: true,
        upsert: true // Crée si n'existe pas
      }
    );

    res.json({
      success: true,
      message: `Section "${section}" sauvegardée avec succès!`,
      data: content.data
    });
  } catch (error) {
    console.error('Erreur mise à jour section:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde'
    });
  }
});

// PUT - Mettre à jour tout le contenu
router.put('/', async (req, res) => {
  try {
    const newData = req.body;
    const updates = [];

    for (const [section, data] of Object.entries(newData)) {
      updates.push(
        Content.findOneAndUpdate(
          { section },
          {
            data,
            updatedAt: new Date()
          },
          {
            new: true,
            upsert: true
          }
        )
      );
    }

    await Promise.all(updates);

    res.json({
      success: true,
      message: 'Tout le contenu a été sauvegardé avec succès!',
      data: newData
    });
  } catch (error) {
    console.error('Erreur mise à jour globale:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde globale'
    });
  }
});

// DELETE - Supprimer une section
router.delete('/:section', async (req, res) => {
  try {
    const section = req.params.section;
    const result = await Content.findOneAndDelete({ section });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Section "${section}" non trouvée`
      });
    }

    res.json({
      success: true,
      message: `Section "${section}" supprimée avec succès`
    });
  } catch (error) {
    console.error('Erreur suppression section:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
});

// GET - Récupérer les statistiques du contenu
router.get('/info/stats', async (req, res) => {
  try {
    const contents = await Content.find({});
    const stats = {
      totalSections: contents.length,
      sections: contents.map(content => ({
        name: content.section,
        lastModified: content.updatedAt
      })),
      lastModified: contents.length > 0 ? Math.max(...contents.map(c => c.updatedAt.getTime())) : new Date()
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur récupération stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// POST - Réinitialiser une section aux valeurs par défaut
router.post('/:section/reset', async (req, res) => {
  try {
    const section = req.params.section;
    const defaultData = getDefaultData();

    if (!defaultData[section]) {
      return res.status(404).json({
        success: false,
        message: `Section "${section}" non trouvée dans les données par défaut`
      });
    }

    const content = await Content.findOneAndUpdate(
      { section },
      {
        data: defaultData[section],
        updatedAt: new Date()
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      message: `Section "${section}" réinitialisée aux valeurs par défaut`,
      data: content.data
    });
  } catch (error) {
    console.error('Erreur réinitialisation section:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réinitialisation'
    });
  }
});

// POST - Réinitialiser tout le contenu
router.post('/reset/all', async (req, res) => {
  try {
    const defaultData = getDefaultData();

    const updates = [];
    for (const [section, data] of Object.entries(defaultData)) {
      updates.push(
        Content.findOneAndUpdate(
          { section },
          {
            data,
            updatedAt: new Date()
          },
          {
            new: true,
            upsert: true
          }
        )
      );
    }

    await Promise.all(updates);

    res.json({
      success: true,
      message: 'Tout le contenu a été réinitialisé aux valeurs par défaut',
      data: defaultData
    });
  } catch (error) {
    console.error('Erreur réinitialisation globale:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réinitialisation globale'
    });
  }
});

module.exports = router;
