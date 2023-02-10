//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module western_controller
const westernController = require("../controller/western_controller");

//Une route qui va permettre d'afficher les données du tableau western contenu dans le fichier film.json en JSON dans la requête 
//GET "/western"
//ex: http://localhost:3200/western
router.get("/western", westernController.getAllDataTab);

//Une route qui permet de récupérer une donnée par son id
//GET "/western/:id"
//ex: http://localhost:3200/western/1
router.get("/western/:id", westernController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/western/search/:title"
//ex: http://localhost:3200/western/search/je suis un titre
router.get("/western/title/:titre", westernController.getDataByTitle);

//Une route qui permet d'insérer de nouvelles données dans mes fichier film.json
//POST "/western"
//ex: http://localhost:3200/western
router.post("/western", westernController.createData);

//Une route qui permet de mettre à jour une donnée en se basant par son id
//PUT "/western/:id"
//ex: http://localhost:3200/western/1
router.put("/western/:id", westernController.updateData);

//Une route qui permet d'effacer une donnée en se basant par son id
//DELETE "/western/:id"
//ex: http://localhost:3200/western/1
router.delete("/western/:id", westernController.deleteDataById);

//export du module router pour utilisation dans l'app
module.exports = router;