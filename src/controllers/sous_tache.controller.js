import {
  requeteAjouterSousTache,
  requeteModifierSousTache,
  requeteModifierStatutSousTache,
  requeteSupprimerSousTache
} from "../models/sous_tache.model.js";

const ajouterSousTache = async (req, res) => {
  const cle_api = req.headers.authorization;

  if (req.body.titre && req.body.titre != "" && req.body.tache_id && req.body.tache_id != "" && req.body.complete && req.body.complete != "") {

    await requeteAjouterSousTache(cle_api, req.body.tache_id, req.body.titre, req.body.complete)

      .then((resultat) => {

        console.log("Résultat :", resultat);

        res.status(200);

        res.send("Sous-tâche ajoutée avec succès.");

      })
      .catch((erreur) => {

        console.log("Erreur :", erreur);

        res.status(500);

        res.send({
          message: "Erreur lors de la requête"
        });
      });
  } else {
    res.status(400);
    res.send("Champs requis : tache_id, titre, complete");
  }
};

const modifierSousTache = async (req, res) => {
  const cle_api = req.headers.authorization;

  if (req.body.titre && req.body.titre != "" && req.body.nouveauTitre && req.body.nouveauTitre != "") {

    await requeteModifierSousTache(cle_api, req.body.titre, req.body.nouveauTitre)

      .then((resultat) => {

        console.log("Résultat :", resultat);

        res.status(200);

        res.send("Sous-tâche modifiée avec succès.");
      })
      .catch((erreur) => {

        console.log("Erreur :", erreur);

        res.status(500);

        res.send({
          message: "Erreur lors de la requête"
        });
      });
  } else {
    res.status(400);
    res.send("Champs requis : titre et nouveauTitre");
  }
};

const modifierStatutSousTache = async (req, res) => {
  const cle_api = req.headers.authorization;

  if (req.body.titre && req.body.titre != "" && req.body.complete != "") {

    await requeteModifierStatutSousTache(cle_api, req.body.titre, req.body.complete)

      .then((resultat) => {

        console.log("Résultat :", resultat);

        res.status(200);

        res.send("Statut de la sous-tâche mis à jour.");

      })
      .catch((erreur) => {

        console.log("Erreur :", erreur);

        res.status(500);

        res.send({
          message: "Erreur lors de la requête"
        });
      });
  } else {
    res.status(400);
    res.send("Champs requis : titre et complete");
  }
};

const supprimerSousTache = async (req, res) => {
  const cle_api = req.headers.authorization;

  if (req.body.titre && req.body.titre != "") {

    await requeteSupprimerSousTache(cle_api, req.body.titre)

      .then((resultat) => {

        console.log(resultat);

        res.status(200);

        res.send("Sous-tâche supprimée.");
      })
      .catch((erreur) => {
        console.log("Erreur :", erreur);
        res.status(500);
        res.send({
          message: "Erreur lors de la requête"
        });
      });
  } else {
    res.status(400);
    res.send("Champ requis : titre");
  }
};

export {
  ajouterSousTache,
  modifierSousTache,
  modifierStatutSousTache,
  supprimerSousTache
};
