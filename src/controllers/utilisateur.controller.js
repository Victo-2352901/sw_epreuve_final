import generateApiKey from "generate-api-key";
import { requeteAjoutUtilisateur, requeteRecupererCle } from "../models/utilisateur.model.js";

const ajoutUtilisateur = async (req, res) => {
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

const recupererCle = async (req, res) => {

console.log(req.headers.courriel);
console.log(req.headers.mot_de_passe);

    if(req.headers.courriel && req.headers.courriel != "" && req.headers.mot_de_passe && req.headers.mot_de_passe != ""){
        
        await requeteRecupererCle(req.headers.courriel, req.headers.mot_de_passe, req.headers.generer)

        .then((resultat) => {
            if(req.headers.generer == "Nouveau"){
                res.send("Voici votre clé d'api  : " + resultat);
            }
            else{
                res.send("Voici votre clé d'api  : " + resultat[0].cle_api);
            }


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
}

export {ajoutUtilisateur, recupererCle};