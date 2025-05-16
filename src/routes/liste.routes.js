import db from '../config/db.js';
import express from 'express';
import {listeTout, detailTache, ajouterTache, modifierTache, modifierStatutTache, supprimerTache} from '../controllers/liste.controller.js'

import {ajoutUtilisateur, recupererCle} from '../controllers/utilisateur.controller.js'

import authentification from '../middleware/authentification.middleware.js';
import { ajouterSousTache, modifierSousTache, modifierStatutSousTache, supprimerSousTache } from '../controllers/sous_tache.controller.js';


const router = express.Router();

router.get('/liste/tout',authentification, listeTout);
router.get('/liste/detail',authentification, detailTache);


router.post('/taches/ajouter',authentification, ajouterTache);
router.put('/taches/modifier',authentification, modifierTache);
router.put('/taches/modifierStatut',authentification, modifierStatutTache);
router.delete('/taches/supprimer',authentification, supprimerTache);

router.post('/sous-taches/ajouter',authentification, ajouterSousTache);
router.put('/sous-taches/modifier',authentification, modifierSousTache);
router.put('/sous-taches/modifierStatut',authentification, modifierStatutSousTache);
router.delete('/sous-taches/supprimer',authentification, supprimerSousTache);



router.post('/utilisateurs/ajout', ajoutUtilisateur);

router.post('/utilisateurs/recupererCleApi', recupererCle);

export default router;