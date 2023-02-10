//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module thriller_controller
const thrillerController = require("../controller/thriller_controller");

//une route qui va permettre d'afficher les données contenu dans le fichier film.json en JSON dans la requête
// GET "/thriller"
//ex : http://localhost:3200/thriller
router.get("/thriller", thrillerController.getAllDataTab);

//une route qui me permet de récupérer une data par son id
//GET "/thriller/:id"
//ex: http://localhost:3200/thriller/1
router.get("/thriller/:id", thrillerController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/thriller/search/:title"
//ex: http://localhost:3200/thriller/title/je suis un titre
router.get("/thriller/title/:titre", thrillerController.getDataByTitle);

//une route qui me permet d'insérer de la donnée dans mes fichier film.json
//POST "/thriller"
//ex: http://localhost:3200/thriller
router.post("/thriller", thrillerController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/thriller/:id"
//ex: http://localhost:3200/thriller/1
router.put("/thriller/:id", thrillerController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/thriller/:id"
//ex: http://localhost:3200/thriller/1
router.delete("/thriller/:id", thrillerController.deleteDataById);

//export du module router
module.exports = router;