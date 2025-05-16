# TP - Serveur Backend pour Recettes de Rhum Arrangé

## Description

Ce projet est un serveur backend permettant aux utilisateurs de créer et partager des recettes de rhum arrangé. Il inclut la gestion des utilisateurs, des ingrédients, des rhums et des recettes.

## Fonctionnalités

### Gestion des utilisateurs

- **Créer un compte** avec :
  - Nom
  - Adresse postale
  - Email
  - Mot de passe (hashé et salé avec bcrypt)
- **Se connecter** via email et mot de passe (JWT pour l'authentification).

### Gestion des ingrédients

- **Ajouter un ingrédient** (nom, type : fruits, épices, sucres, autres), adresse d'un magasin, prix, etc.
- **Rechercher un ingrédient** par nom ou type.
- **Lister les ingrédients** avec pagination.

### Gestion des rhums

- **Lister les rhums** avec pagination.
- **Rechercher un rhum** par nom, type, région, etc.

### Gestion des recettes

- **Créer une recette** (privée ou publique) contenant :
  - Un rhum
  - Au moins un ingrédient
  - Des instructions
- **Lister ses recettes** avec pagination.
- **Lister les recettes publiques** avec pagination.
- **Modifier ses recettes**.

## Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB

## Installation

1. Clonez le dépôt :
   ```sh
   git clone <URL_DU_DEPOT>
   cd tp-rhum

2. Installez les dépendances :
   ```sh
   npm install

3. Configurez les variables d'environnement : 
Créez un fichier .env à la racine du projet et ajoutez les variables présentes dans le .env.example

## Utilisation

1. Démarrez le serveur en mode développement :
   ```sh
   npm run dev

2. Le serveur sera accéssible à l'adresse suivante : http://localhost:8000

### Authentification
- `POST /api/auth/register` : Créer un compte utilisateur
- `POST /api/auth/login` : Se connecter

### Ingrédients
- `POST /api/ingredients/add` : Ajouter un ingrédient
- `GET /api/ingredients/search` : Rechercher des ingrédients
- `GET /api/ingredients/all-ingredients` : Lister tous les ingrédients

### Rhums
- `GET /api/rhums/all` : Lister tous les rhums
- `GET /api/rhums/filter` : Rechercher des rhums avec des filtres

### Recettes
- `POST /api/recettes/create` : Créer une recette
- `GET /api/recettes` : Lister les recettes publiques
- `GET /api/recettes/mes-recettes` : Lister les recettes de l'utilisateur connecté
- `PATCH /api/recettes/update/:id` : Modifier une recette

## Test

Pour réaliser les tests unitaires de l'API, vous pouvez suivre les étapes suivantes : 

1. Placez le terminal à la racine du projet :
   ```sh
   cd <nom_du_projet>

1. Appeler la commande test :
   ```sh
   npm run test

