import db from "../config/db_pg.js";
import {
    uuid
} from 'uuidv4';

const ValidationCle = (cleApi) => {
    return new Promise((resolve, reject) => {
        const requete = `SELECT count(*) AS nombre FROM utilisateurs WHERE cle_api = $1`;
        const params = [cleApi];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};

const requeteAjoutUtilisateur = (nom, prenom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {
        const requete = "INSERT INTO utilisateurs (nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5)";
        let cle_api = uuid();
        const params = [nom, prenom, courriel, cle_api, mot_de_passe];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Erreur sqlState : ' + erreur);
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            const message = {
                message: "L'utilisateur à bien été ajouter ! || Clé d'api : " + cle_api
            };
            resolve(message);
        });
    });
};

const requeteRecupererCle = (courriel, mot_de_passe, generer) => {
    return new Promise((resolve, reject) => {
        if (generer != "Nouveau") {
            let requete = "SELECT cle_api FROM utilisateurs WHERE courriel = $1 AND password = $2";
            const params = [courriel, mot_de_passe];

            db.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log('Erreur sqlState : ' + erreur);
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat.rows);
            });
        } else {
            let requete = "UPDATE utilisateurs SET cle_api = $1 WHERE courriel = $2 AND password = $3";
            let nouvelleCle = uuid();
            const params = [nouvelleCle, courriel, mot_de_passe];

            db.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log('Erreur sqlState : ' + erreur);
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(nouvelleCle);
            });
        }
    });
};

export {
    ValidationCle,
    requeteAjoutUtilisateur,
    requeteRecupererCle
};
