import db from "../config/db_pg.js";

const requeteAjouterSousTache = (cle_api, tache_id, titre, complete) => {
    return new Promise((resolve, reject) => {
        const requete = `INSERT INTO Sous_taches(tache_id, titre, complete) VALUES ($1, $2, $3)`;
        const params = [tache_id, titre, complete];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

const requeteModifierSousTache = (cle_api, titre_sous_tache, nouveauTitre) => {
    return new Promise((resolve, reject) => {
        const requete = `UPDATE Sous_taches SET titre = $1 WHERE titre = $2`;
        const params = [nouveauTitre, titre_sous_tache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

const requeteModifierStatutSousTache = (cle_api, titre_sous_tache, complete) => {
    return new Promise((resolve, reject) => {
        const requete = `UPDATE Sous_taches SET complete = $1 WHERE titre = $2`;
        const params = [complete, titre_sous_tache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

const requeteSupprimerSousTache = (cle_api, titre_sous_tache) => {
    return new Promise((resolve, reject) => {
        const requete = `DELETE FROM Sous_taches WHERE titre = $1`;
        const params = [titre_sous_tache];

        db.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            } else {
                resolve(resultat);
            }
        });
    });
};

export {
    requeteAjouterSousTache,
    requeteModifierSousTache,
    requeteModifierStatutSousTache,
    requeteSupprimerSousTache
};
