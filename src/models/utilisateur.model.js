import db from '../config/db.js';

import { uuid } from 'uuidv4';

const ValidationCle = (cleApi) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT count(*) AS nombre FROM utilisateurs WHERE cle_api = ?`;
        const params = [cleApi]; 

        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

const requeteAjoutUtilisateur = (nom, prenom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const requete = "INSERT INTO Utilisateurs(nom,prenom,courriel,cle_api,password) VALUES(?,?,?,?,?)";

        let cle_api = uuid();

// console.log(nom);
// console.log(prenom);
// console.log(courriel);
// console.log(cle_api);
// console.log(mot_de_passe);

        const params = [nom, prenom, courriel, cle_api, mot_de_passe];

        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resultat = {
                "message" : "L'utilisateur à bien été ajouter ! || Clé d'api : " + cle_api
            };
            resolve(resultat);
        });
    });
};


const requeteRecupererCle = (courriel, mot_de_passe, generer) => {
    return new Promise((resolve, reject) => {
// console.log(courriel);
// console.log(mot_de_passe);

if(generer != "Nouveau"){
    let requete = "SELECT cle_api FROM Utilisateurs WHERE courriel = ? AND password = ?";

    const params = [courriel, mot_de_passe];

    db.query(requete,params,(erreur, resultat) => {
        if (erreur) {
            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
            // S'il y a une erreur, je la retourne avec reject()
            reject(erreur);
        }
        // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
        console.log(resultat);
        resolve(resultat);
    });
}
else{
    let requete = "UPDATE Utilisateurs SET cle_api = ? WHERE courriel = ? AND password = ?";

        let nouvelleCle = uuid();
    console.log(nouvelleCle);
            const params = [nouvelleCle , courriel, mot_de_passe];

            db.query(requete,params,(erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    // S'il y a une erreur, je la retourne avec reject()
                    reject(erreur);
                }

                // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                resolve(nouvelleCle);
            });
        }
    });
};



export {ValidationCle, requeteAjoutUtilisateur, requeteRecupererCle}