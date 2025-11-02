# 🌍 Gov-AI - Site Vitrine & Dashboard Admin

## 📖 Description du projet

**Gov-AI** est un projet de site vitrine et de gestion développé pour présenter le produit **Gov-AI**, une intelligence artificielle gouvernementale développée par le **CENANDI (Centre National de Développement de l’Informatique, Cameroun)**.  

Le projet se compose de deux grandes parties :

### 🎨 Site vitrine (Frontend & Client)
- Présentation claire et moderne du produit **Gov-AI**

### 🛠️ Dashboard Administrateur (Backend & Frontend)
- Accessible uniquement après **authentification sécurisée**
- Permet à l’administrateur de :
  - Gérer dynamiquement le contenu du site vitrine
  - Ajouter, modifier ou supprimer des sections, images ou informations
- Développé avec **React.js**, **Node.js/Express**, et **MongoDB**
---
## 📂 Structure du projet

- **client/** → Application React pour une partie du frontend (formulaires, interactions avec API, etc.)  
- **frontend/** → Application React dédiée au site vitrine principal  
- **backend/** → Serveur Node.js/Express avec base de données MongoDB et API  
---
## ⚙️ Installation et lancement

### 📂 1. Dossier `client`

#### Installation des dépendances

# Dépendances principales
npm install

# Autres dépendances
npm install react-toastify
npm install axios
npm install react-icons
Lancer le projet via npm start
---
## dossier `frontend`
# 🌍 Frontend - Gov-AI (Site vitrine)

## 📖 Description
Ce dossier contient le **site vitrine de presentation de Gov-AI**
Le site est une application **React.js + Tailwind CSS** et inclut des animations modernes.  
Il présente Gov-AI et ses fonctionnalités à travers plusieurs sections : accueil, à propos, fonctionnalités, contact.
---
## ⚙️ Installation
npm install @heroicons/react
npm install react-responsive-carousel
npm install aos
npm install react-router-dom

Exécuter les commandes suivantes dans le dossier `frontend` :
# Installer les dépendances principales
npm install

# Installer les dépendances spécifiques
npm install aos
npm install axios
npm install lucide-react
lancer via npm start


---

## dossier `backend`
## 📖 Description
Ce dossier contient le **backend du projet Gov-AI**.  
Il s’agit d’un serveur **Node.js + Express** connecté à une base de données **MongoDB**.  

## ⚙️ Installation

Exécuter les commandes suivantes dans le dossier `backend` :
# Installer les dépendances principales
npm install

# Installer les dépendances spécifiques
npm install axios
npm install bcryptjs
npm install cors
npm install dotenv
npm install express
npm install mongoose
npm install multer
npm install validator
lancer le serveur depuis le dossier backend via node app.js

