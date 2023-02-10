//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module comedie_controller
const comedieController = require("../controller/comedie_controller");

//une route qui va permettre d'afficher les données contenu dans le fichier film.json en JSON dans la requête
// GET "/comedie"
//ex : http://localhost:3200/comedie
router.get("/comedie", comedieController.getAllDataTab);

//une route qui me permet de récupérer une data par son id
//GET "/comedie/:id"
//ex: http://localhost:3200/comedie/1
router.get("/comedie/:id", comedieController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/comedie/search/:title"
//ex: http://localhost:3200/comedie/title/je suis un titre
router.get("/comedie/title/:titre", comedieController.getDataByTitle);

//une route qui me permet d'insérer de la donnée dans mes fichier film.json
//POST "/comedie"
//ex: http://localhost:3200/comedie
router.post("/comedie", comedieController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/comedie/:id"
//ex: http://localhost:3200/comedie/1
router.put("/comedie/:id", comedieController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/comedie/:id"
//ex: http://localhost:3200/comedie/1
router.delete("/comedie/:id", comedieController.deleteDataById);

//export du module router
module.exports = router;