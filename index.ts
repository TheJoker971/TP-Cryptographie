import { config } from "dotenv";
config(); // Chargement des variables d'environnement

import { Utils } from "./utils";
import axios from "axios";
import { ethers } from "ethers";
import {IDefiEncrypt, IDefiHash, ISolutionEncrypt, ISolutionHash, IUser, IUserInfo} from "./interface";



// Générer un portefeuille Ethereum aléatoire
function genereAddress(): string {
    const wallet = ethers.Wallet.createRandom();
    return wallet.address;
}

// Fonction pour envoyer les données à l'API
async function subscribe(ethAddress: string): Promise<void> {
    const url = `${process.env.API}/subscribe`;
    const data: IUser = {
        name: "SEGOR",
        address: ethAddress
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Réponse du serveur:", response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios:", error.response?.data || error.message);
        } else {
            console.error("Erreur:", error);
        }
    }
}

async function getHashDefi(address: string): Promise<IDefiHash | null> {
    const url = `${process.env.API}/challenge/hash/${address}`;
    try {
        const response = await axios.get<IDefiHash>(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Réponse du serveur:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios:", error.response?.data || error.message);
        } else {
            console.error("Erreur:", error);
        }
        return null;
    }
}

async function submitHasheSolution(address: string, challengeID: string, solution: ISolutionHash): Promise<void> {
    const url = `${process.env.API}/challenge/hash/${address}/${challengeID}`;
    const data: ISolutionHash = solution ;

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Réponse du serveur:", response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios:", error.response?.data || error.message);
        } else {
            console.error("Erreur:", error);
        }
    }
}

async function getEncryptDefi(address: string): Promise<IDefiEncrypt | null> {
    try {
        // Construire l'URL avec l'adresse
        const url = `${process.env.API}/challenge/encrypt/${address}`;

        // Envoyer la requête GET avec axios
        const response = await axios.get<IDefiEncrypt>(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Traiter la réponse
        console.log('Réponse du serveur:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erreur Axios:', error.response?.data || error.message);
        } else {
            console.error('Erreur:', error);
        }
        return null;
    }
}

async function submitEncryptSolution(address: string, challengeID: string, solution: ISolutionEncrypt): Promise<void> {
    const url = `${process.env.API}/challenge/encrypt/${address}/${challengeID}`;
    const data: ISolutionEncrypt = solution ;

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Réponse du serveur:", response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios:", error.response?.data || error.message);
        } else {
            console.error("Erreur:", error);
        }
    }
}

// Fonction pour récupérer les informations pour une adresse spécifique
async function getUserInfo(address: string): Promise<IUserInfo | null> {
    const url = `${process.env.API}/info/${address}`;

    try {
        // Envoyer la requête GET avec axios
        const response = await axios.get<IUserInfo>(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Traiter la réponse
        console.log("Réponse du serveur:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios:", error.response?.data || error.message);
        } else {
            console.error("Erreur:", error);
        }
        return null;
    }
}
async function start() {
    const address = "0x074246e2efcc57f086a9e8e7169f93538db425c3";
    console.log(address);
    await subscribe(address);
    for (let i = 0; i < 100; i++) {
        const defiHash = await getHashDefi(address);
        if (defiHash) {
            const solutionHash:ISolutionHash = {
                sentence:defiHash.sentence,
                hash:Utils.toSHA256(defiHash.sentence)
            };
            await submitHasheSolution(address, defiHash.challenge_id,solutionHash);
        }
        const defiEncrypt = await getEncryptDefi(address);
        if (defiEncrypt) {
            const solutionEncrypt : ISolutionEncrypt = {
                sentence: defiEncrypt.sentence,
                ciphertext: Utils.encryptWithRSA(defiEncrypt.public_key,defiEncrypt.sentence)
            };
            await submitEncryptSolution(address, defiEncrypt.challenge_id,solutionEncrypt);
        }
    }
    const info = await getUserInfo(address);
    if(info){
        console.log(info.score);
    }

}

start();
setInterval(async ()=>{start()},60000);