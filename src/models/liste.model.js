import db from '../config/db.js';


const requeteTache = (cle_api, afficherCompleter) => {
    return new Promise((resolve, reject) => {

        let requete = "";

        // Si l'option complété est cocher
        if(afficherCompleter == 1){
            requete = `SELECT Taches.titre FROM Taches INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id WHERE Utilisateurs.cle_api = ?`;
            // console.log("pascocher");
        }
        else{
            // Si l'option complété n'est pas cocher
            requete = `SELECT Taches.titre FROM Taches INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id WHERE Utilisateurs.cle_api = ? AND Taches.complete = 0`;
            // console.log("pascocher");
        }

        const params = [cle_api];

        // console.log(cle_api);
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

const requeteDetailTache = (cle_api, nomTache) => {
    return new Promise((resolve, reject) => {

// console.log(cle_api);
// console.log(nomTache);

        const requete = `SELECT Taches.titre AS titre_tache,Taches.description,Taches.date_debut,Taches.date_echeance, Sous_taches.titre AS titre_sous_tache, Sous_taches.complete AS sous_tache_terminer FROM Taches INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id INNER JOIN Sous_taches ON Taches.id = Sous_taches.tache_id WHERE Utilisateurs.cle_api = ? AND Taches.titre = ?`;

        const params = [cle_api, nomTache];

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

const requeteAjouterTache = (cle_api, nomTache, description, date_debut, date_echeance, complete) => {
    return new Promise((resolve, reject) => {

        let id;
// console.log(cle_api);
// console.log(nomTache);

        let requete = "SELECT id FROM Utilisateurs WHERE cle_api = ?"

        let params = [cle_api];
        // console.log(params);
        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            id = resultat;
            // console.log(resultat);
            // console.log(id);
        });

        requete = "INSERT INTO Taches(utilisateur_id,titre,description,date_debut,date_echeance,complete) VALUES(?, ?, ?, ?, ?, ?)";

        params = [id, nomTache, description, date_debut, date_echeance, complete];

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


const requeteModifierTache = (cle_api, nomTache, description, date_debut, date_echeance, complete, nouveauTitre) => {
    return new Promise((resolve, reject) => {
        // console.log(cle_api);    
        // console.log(nomTache);
        let tacheTrouver = false;

        let message = "";

        let requete = "SELECT count(*) AS trouver FROM Taches WHERE titre = ?"

        let params = [nomTache];

        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            if(resultat[0].trouver >= 1){
                tacheTrouver = true
                console.log(tacheTrouver);

            if(nouveauTitre != ""){
                requete = "UPDATE Taches SET titre = ? WHERE titre = ?"

                params = [nouveauTitre, nomTache];

                db.query(requete,params,(erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    message += "Le titre à bien été modifié : "
                    
                });

                nomTache = nouveauTitre;
            }

            if(description != ""){
                requete = "UPDATE Taches SET description = ? WHERE titre = ?"

                params = [description, nomTache];

                db.query(requete,params,(erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    message += "La description à bien été modifié : "
                });
            }

            if(date_debut != ""){
                requete = "UPDATE Taches SET date_debut = ? WHERE titre = ?"

                params = [date_debut, nomTache];

                db.query(requete,params,(erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    message += "La date de début à bien été modifié : "
                });
            }

            if(date_echeance != ""){
                requete = "UPDATE Taches SET date_echeance = ? WHERE titre = ?"

                params = [date_echeance, nomTache];

                db.query(requete,params,(erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    message += "La date d'échéance à bien été modifié : "
                });
            }

            if(complete != ""){
                requete = "UPDATE Taches SET complete = ? WHERE titre = ?"

                params = [complete, nomTache];

                db.query(requete,params,(erreur, resultat) => {
                    if (erreur) {
                        console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    message += "La complétion à bien été modifié : "
                });
            }
            }
            else{
                message = "Impossible de trouver la tâche";
                console.log(message);
            }
        });
        
        console.log(message);
        resolve(message);
    });
};

const requeteModifierStatutTache = (cle_api, nomTache, complete) => {
    return new Promise((resolve, reject) => {

// console.log(cle_api);
// console.log(nomTache);

        const requete = `UPDATE Taches SET complete = ? WHERE titre = ?`;

        const params = [complete ,nomTache];

        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resultat = "Le statut de la tache " + nomTache + " à bien été modifié"
            resolve(resultat);
        });
    });
};

const requeteSupprimerTache = (cle_api, nomTache) => {
    return new Promise((resolve, reject) => {

// console.log(cle_api);
// console.log(nomTache);

        const requete = `DELETE FROM Taches WHERE titre = ?`;

        const params = [nomTache];

        db.query(requete,params,(erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resultat = "La tache " + nomTache + " à bien été supprimé"
            resolve(resultat);
        });
    });
};

export {requeteTache, requeteDetailTache, requeteAjouterTache, requeteModifierTache, requeteSupprimerTache, requeteModifierStatutTache}