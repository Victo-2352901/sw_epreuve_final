import db from "../config/db_pg.js";

const requeteTache = (cle_api, afficherCompleter) => {
    return new Promise((resolve, reject) => {

        let requete = "";

        // Si l'option complété est cocher
        if (afficherCompleter == 1) {
            requete = `SELECT Taches.titre FROM Taches INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id WHERE Utilisateurs.cle_api = $1`;
        } else {
            // Si l'option complété n'est pas cocher
            requete = `SELECT Taches.titre FROM Taches INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id WHERE Utilisateurs.cle_api = $1 AND Taches.complete = false`;
        }

        const params = [cle_api];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
};

const requeteDetailTache = (cle_api, nomTache) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT Taches.titre AS titre_tache, Taches.description, Taches.date_debut, Taches.date_echeance, 
                         Sous_taches.titre AS titre_sous_tache, Sous_taches.complete AS sous_tache_terminer 
                         FROM Taches 
                         INNER JOIN Utilisateurs ON Taches.utilisateur_id = Utilisateurs.id 
                         INNER JOIN Sous_taches ON Taches.id = Sous_taches.tache_id 
                         WHERE Utilisateurs.cle_api = $1 AND Taches.titre = $2`;

        const params = [cle_api, nomTache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat);
        });
    });
};

const requeteAjouterTache = (cle_api, nomTache, description, date_debut, date_echeance, complete) => {
    return new Promise((resolve, reject) => {

        let id;

        let requete = "SELECT id FROM Utilisateurs WHERE cle_api = $1";
        let params = [cle_api];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            id = resultat.rows[0].id;

            requete = "INSERT INTO Taches(utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES($1, $2, $3, $4, $5, $6)";
            params = [id, nomTache, description, date_debut, date_echeance, complete];

            db.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                resolve(resultat);
            });
        });
    });
};

const requeteModifierTache = (cle_api, nomTache, description, date_debut, date_echeance, complete, nouveauTitre) => {
    return new Promise((resolve, reject) => {
        let tacheTrouver = false;
        let message = "";

        let requete = "SELECT count(*) AS trouver FROM Taches WHERE titre = $1";
        let params = [nomTache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            if (resultat.rows[0].trouver >= 1) {
                tacheTrouver = true;

                if (nouveauTitre != "") {
                    requete = "UPDATE Taches SET titre = $1 WHERE titre = $2";
                    params = [nouveauTitre, nomTache];

                    db.query(requete, params, (erreur, resultat) => {
                        if (erreur) {
                            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        message += "Le titre a bien été modifié. ";
                    });

                    nomTache = nouveauTitre;
                }

                if (description != "") {
                    requete = "UPDATE Taches SET description = $1 WHERE titre = $2";
                    params = [description, nomTache];

                    db.query(requete, params, (erreur, resultat) => {
                        if (erreur) {
                            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        message += "La description a bien été modifiée. ";
                    });
                }

                if (date_debut != "") {
                    requete = "UPDATE Taches SET date_debut = $1 WHERE titre = $2";
                    params = [date_debut, nomTache];

                    db.query(requete, params, (erreur, resultat) => {
                        if (erreur) {
                            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        message += "La date de début a bien été modifiée. ";
                    });
                }

                if (date_echeance != "") {
                    requete = "UPDATE Taches SET date_echeance = $1 WHERE titre = $2";
                    params = [date_echeance, nomTache];

                    db.query(requete, params, (erreur, resultat) => {
                        if (erreur) {
                            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        message += "La date d'échéance a bien été modifiée. ";
                    });
                }

                if (complete != "") {
                    requete = "UPDATE Taches SET complete = $1 WHERE titre = $2";
                    params = [complete, nomTache];

                    db.query(requete, params, (erreur, resultat) => {
                        if (erreur) {
                            console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                            reject(erreur);
                        }
                        message += "Le statut de complétion a bien été modifié. ";
                    });
                }
            } else {
                message = "Impossible de trouver la tâche";
                console.log(message);
            }

            resolve(message);
        });
    });
};

const requeteModifierStatutTache = (cle_api, nomTache, complete) => {
    return new Promise((resolve, reject) => {

        const requete = `UPDATE Taches SET complete = $1 WHERE titre = $2`;
        const params = [complete, nomTache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resultat = "Le statut de la tâche " + nomTache + " a bien été modifié";
            resolve(resultat);
        });
    });
};

const requeteSupprimerTache = (cle_api, nomTache) => {
    return new Promise((resolve, reject) => {

        const requete = `DELETE FROM Taches WHERE titre = $1`;
        const params = [nomTache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resultat = "La tâche " + nomTache + " a bien été supprimée";
            resolve(resultat);
        });
    });
};

export {
    requeteTache,
    requeteDetailTache,
    requeteAjouterTache,
    requeteModifierTache,
    requeteSupprimerTache,
    requeteModifierStatutTache
};