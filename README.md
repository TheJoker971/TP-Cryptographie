# Cryptograpie Challenge Solver

Ce projet est une application TypeScript qui interagit avec une API pour résoudre des défis de hachage et de chiffrement associés à des adresses Ethereum. Il comprend des fonctionnalités pour s'abonner à des défis, récupérer des défis de hachage et de chiffrement, soumettre des solutions et obtenir des informations sur l'utilisateur.

## Fonctionnalités

- Génération d'une adresse Ethereum aléatoire.
- Abonnement à un défi avec une adresse Ethereum.
- Récupération de défis de hachage et de chiffrement depuis l'API.
- Soumission de solutions pour les défis de hachage et de chiffrement.
- Récupération des informations et du score de l'utilisateur.

## Prérequis

- Node.js (version 14.x ou supérieure)
- npm ou yarn
- Clé publique RSA pour le chiffrement

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/your-https://github.com/TheJoker971/TP-Cryptographie.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd TP-Cryptographie
    ```

3. Installez les dépendances :

    ```bash
    npm install
    ```

   ou

    ```bash
    yarn install
    ```

4. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires :

    ```env
    API=<lien_du_serveur>
    ```

## Utilisation

1. Exécutez le script principal :

    ```bash
    npm start
    ```

   ou

    ```bash
    yarn start
    ```

   Le script générera une adresse Ethereum, s'abonnera aux défis, résoudra les défis de hachage et de chiffrement, et affichera les informations de l'utilisateur et le score.

2. Le script est configuré pour s'exécuter toutes les 60 secondes (`setInterval`), vous pouvez ajuster cet intervalle selon vos besoins.

## Structure du Projet

- `src/utils.ts` : Contient des utilitaires pour le chiffrement RSA et le hachage SHA-256.
- `src/interface.ts` : Définitions des interfaces TypeScript utilisées dans le projet.
- `src/index.ts` : Script principal pour gérer les défis et les interactions avec l'API.

## Dépendances

- `axios` : Client HTTP pour faire des requêtes vers l'API.
- `dotenv` : Chargement des variables d'environnement depuis un fichier `.env`.
- `ethers` : Bibliothèque pour interagir avec Ethereum.
- `node-forge` : Bibliothèque pour le chiffrement RSA et la manipulation de clés.




