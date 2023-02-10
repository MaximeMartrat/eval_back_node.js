//declaration des constantes pour l'export des modules express
const express = require("express");
//pour l'export de la methode router du module express
const router = express.Router();
//import du module entrees_controller
const entreesController = require("../controller/exemple_controller");
//une route qui va permettre d'afficher les données contenu dans le fichier exemple.json en JSON dans la requête
// GET "/entrees"
//ex : http://localhost:3200/entrees
router.get("/entrees", entreesController.getAllData);

//une route qui me permet de récupérer une data par son id
//GET "/entrees/:id"
//ex: http://localhost:3200/entrees/1
router.get("/entrees/:id", entreesController.getDataById);

//une route qui me permet d'insérer de la donnée dans mes fichier exemple.json
//POST "/entrees"
//ex: http://localhost:3200/entrees
router.post('/entrees', entreesController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/entrees/:id"
//ex: http://localhost:3200/entrees/1
router.put('/entrees/:id', entreesController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/entrees/:id"
//ex: http://localhost:3200/entrees/1
router.delete('/entrees/:id', entreesController.deleteDataById);

module.exports = router;