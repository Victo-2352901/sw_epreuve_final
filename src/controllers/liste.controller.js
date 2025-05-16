import { json } from "express";
import { resourceUsage } from "process";

import { requeteTache, requeteDetailTache, requeteAjouterTache, requeteModifierTache, requeteSupprimerTache, requeteModifierStatutTache} from "../models/liste.model.js";

const listeTout = async (req, res) => {
    const cle_api = req.headers.authorization;const ajoutUtilisateur = async (req, res) => {
    if(req.body.nom && req.body.nom != "" && req.body.prenom && req.body.prenom != "" && req.body.courriel && req.body.courriel != "" && req.body.mot_de_passe && req.body.mot_de_passe != "")
    {
        await requeteAjoutUtilisateur(req.body.nom, req.body.prenom, req.body.courriel, req.body.mot_de_passe)
    
        .then((resultat) => {
            res.send(resultat);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Cette route doit contenir les champs suivants : nom, prenom, courriel, mot_de_passe et ne doivent pas être vide");
    }

    
} 
    let afficherCompleter = false;

    if(req.query.complete && req.query.complete == 1){
        afficherCompleter = true
    }

    await requeteTache(cle_api,afficherCompleter)
    
    .then((resultat) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!resultat[0]) {
            res.status(404);
            res.send({
                message: `Aucune tâche n'à été créer`
            });
            return;
        }
        res.send(resultat);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la requête"
        });
    });
}

const detailTache = async (req, res) => {
    const cle_api = req.headers.authorization;

    if(req.query.nom && req.query.nom != ""){
        await requeteDetailTache(cle_api,req.query.nom)
    
        .then((resultat) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `Aucune tâche possède se nom`
                });
                return;
            }
            res.send(resultat);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Cette route doit avoir le paramètre ?nom et ne doit pas être vide");
    }

    
} 

const ajouterTache = async (req, res) => {
    const cle_api = req.headers.authorization;

    if(req.body.titre && req.body.titre != "" && req.body.description && req.body.description != "" && req.body.date_debut && req.body.date_debut != "" && req.body.date_echeance && req.body.date_echeance != "" && req.body.complete && req.body.complete != ""){
        await requeteAjouterTache(cle_api, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete)
    
        .then((resultat) => {
            res.send("La tache à bien été créer");
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Certain élément dans la requête sont manquant. Veuillez vous référez sur /api/docs");
    }

} 


//////////// A FINIR
const modifierTache = async (req, res) => {
    const cle_api = req.headers.authorization;

    let nouveauTitre = "";

    if(req.body.titre && req.body.titre != ""){

        if(req.body.nouveauTitre){
            nouveauTitre = req.body.nouveauTitre;
            // console.log(nouveauTitre);
        }



        await requeteModifierTache(cle_api, req.body.titre, req.body.description, req.body.date_debut, req.body.date_echeance, req.body.complete, nouveauTitre)
    
        .then((resultat) => {
            console.log(resultat);
            res.send(resultat);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Le nom de la tâche est obligatoire. Référez-vous à /api/docs pour plus d'information");
    }
        
} 

const modifierStatutTache = async (req, res) => {
    const cle_api = req.headers.authorization;

    if(req.body.titre && req.body.titre != "" && req.body.complete && req.body.complete != ""){

        await requeteModifierStatutTache(cle_api, req.body.titre, req.body.complete)
    
        .then((resultat) => {
            console.log(resultat);
            res.send(resultat);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Le nom de la tâche est obligatoire. Référez-vous à /api/docs pour plus d'information");
    }
        
}

const supprimerTache = async (req, res) => {
    const cle_api = req.headers.authorization;

    if(req.body.titre && req.body.titre != ""){
        await requeteSupprimerTache(cle_api, req.body.titre)
    
        .then((resultat) => {
            res.send(resultat);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la requête"
            });
        });
    }
    else{
        res.status(400);
        res.send("Le nom de la tâche est obligatoire. Référez-vous à /api/docs pour plus d'information");
    }
}


export {listeTout, detailTache, ajouterTache, modifierTache, modifierStatutTache, supprimerTache}
