import * as crypto from 'crypto';
import * as forge from "node-forge";

export class Utils {

    static toSHA256(str: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }

    // Fonction pour chiffrer un message avec une clé publique RSA
    static encryptWithRSA(publicKeyPem: string, message: string): string {
        // Convertir la clé publique de PEM en un objet clé forge
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

        // Chiffrer le message en utilisant la clé publique
        const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP', {
            md: forge.md.sha256.create(), // Algorithme de hashage SHA-256
            mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()) // MGF1 avec SHA-256
        });

        // Convertir le message chiffré en une chaîne hexadécimale
        const encryptedHex = forge.util.bytesToHex(encryptedMessage);
        return encryptedHex;
    }
}