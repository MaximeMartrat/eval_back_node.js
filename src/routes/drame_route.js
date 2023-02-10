//declaration des constantes pour l'export des modules express
const express = require("express");
//Pour l'export de la methode router du module express
const router = express.Router();
//Import du module drame_controller
const drameController = require("../controller/drame_controller");

//une route qui va permettre d'afficher les données contenu dans le fichier film.json en JSON dans la requête
// GET "/drame"
//ex : http://localhost:3200/drame
router.get("/drame", drameController.getAllDataTab);

//une route qui me permet de récupérer une data par son id
//GET "/drame/:id"
//ex: http://localhost:3200/drame/1
router.get("/drame/:id", drameController.getDataById);

//une route qui me permet de récupérer une data par son titre
//GET "/drame/search/:title"
//ex: http://localhost:3200/drame/search/je suis un titre
router.get("/drame/title/:titre", drameController.getDataByTitle);


//une route qui me permet d'insérer de la donnée dans mes fichier film.json
//POST "/drame"
//ex: http://localhost:3200/drame
router.post("/drame", drameController.createData);

//une route qui me permet de mettre à jour une donnée en se basant sur son id
//PUT: "/drame/:id"
//ex: http://localhost:3200/drame/1
router.put("/drame/:id", drameController.updateData);

//une route qui me permet de supprimer une donnée en se basant sur son id
//DELETE "/drame/:id"
//ex: http://localhost:3200/drame/1
router.delete("/drame/:id", drameController.deleteDataById);

//export du module router
module.exports = router;