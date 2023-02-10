//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module action_controller
const actionController = require("../controller/action_controller");

//une route qui va permettre d'afficher les données contenu dans le fichier film.json en JSON dans la requête
// GET "/action"
//ex : http://localhost:3200/action
router.get("/action", actionController.getAllDataTab);

//une route qui me permet de récupérer une data par son id
//GET "/action/:id"
//ex: http://localhost:3200/action/1
router.get("/action/:id", actionController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/action/search/:title"
//ex: http://localhost:3200/action/title/je suis un titre
router.get("/action/title/:titre", actionController.getDataByTitle);

//une route qui me permet d'insérer de la donnée dans mes fichier film.json
//POST "/action"
//ex: http://localhost:3200/action
router.post("/action", actionController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/action/:id"
//ex: http://localhost:3200/action/1
router.put("/action/:id", actionController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/action/:id"
//ex: http://localhost:3200/action/1
router.delete("/action/:id", actionController.deleteDataById);

//export du module router
module.exports = router;