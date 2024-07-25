import {config} from "dotenv";
config(); // chargement des vars d'env

import {SecurityUtils} from "./utils";
import express from "express";
import { ethers } from "ethers";

// Générer un portefeuille Ethereum aléatoire
const wallet = ethers.Wallet.createRandom();

// Récupérer la clé privée et l'adresse
const privateKey = wallet.privateKey;
const address = wallet.address;

console.log(`Clé privée: ${privateKey}`);
console.log(`Adresse Ethereum: ${address}`);


async function launchAPI() {
    const app = express();

    app.use(express.json());




    app.listen(process.env.PORT,function(){
        console.log(`Listening on port ${process.env.PORT}`);
    });
}

launchAPI().catch(console.error);