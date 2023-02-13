//declaration des constantes
//pour l'export du module express
const express = require('express');
//pour l'export du modules fs
const fs = require('fs');
const app = express();
//Déclarer constante qui contiendra l'export du module body-parser
const bodyParser = require("body-parser");
//import des routes de l'application vers nos tableaux
const entreesRoute = require('./src/routes/exemple_route');
const actionRoute = require('./src/routes/action_route');
const westernRoute = require('./src/routes/western_route');
const drameRoute = require('./src/routes/drame_route');
const comedieRoute = require('./src/routes/comedie_route');
const sfRoute = require('./src/routes/sf_route');
const thrillerRoute = require('./src/routes/thriller_route');
//definition de la route récupérée avec la methode GET
//TEST route
//ex: http://localhost:3200
app.get('/', (request, response) =>{
    response.send("le serveur tourne comme une horloge");
});
//Pour faire l'appli express devra utiliser bodyParser
app.use(bodyParser.json());
//enregistrement des routes dans l'application
app.use(entreesRoute);
app.use(actionRoute);
app.use(westernRoute);
app.use(drameRoute);
app.use(comedieRoute);
app.use(sfRoute);
app.use(thrillerRoute);

//export du module app
module.exports = app;
