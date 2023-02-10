//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module SF_controller
const sfController = require("../controller/SF_controller");

//une route qui va permettre d'afficher les données contenu dans le fichier film.json en JSON dans la requête
// GET "/SF"
//ex : http://localhost:3200/SF
router.get("/scienceF", sfController.getAllDataTab);

//une route qui me permet de récupérer une data par son id
//GET "/SF/:id"
//ex: http://localhost:3200/SF/1
router.get("/scienceF/:id", sfController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/SF/search/:titre"
//ex: http://localhost:3200/SF/title/je suis un titre
router.get("/scienceF/title/:titre", sfController.getDataByTitle);

//une route qui me permet d'insérer de la donnée dans mes fichier film.json
//POST "/SF"
//ex: http://localhost:3200/SF
router.post("/scienceF", sfController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/SF/:id"
//ex: http://localhost:3200/SF/1
router.put("/scienceF/:id", sfController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/SF/:id"
//ex: http://localhost:3200/SF/1
router.delete("/scienceF/:id", sfController.deleteDataById);

//export du module router
module.exports = router;