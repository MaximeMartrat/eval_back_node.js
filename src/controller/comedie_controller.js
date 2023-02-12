//declaration de la constante pour l'export du module fs
const fs = require('fs');

//export de la methode getAllDataTab qui permet de récupérer une donnée dans un tableau du fichier film.json
exports.getAllDataTab = (request, response) =>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err){
            //status 500 + message       
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //status 200 + données du tableau de la requête(JSON.parse(donnée).tableau)
            response.status(200).json(JSON.parse(data).comedie)
        }
    });
};


//export de la methode getdDataById qui permet de récupérer une donnée par son id
exports.getDataById = (request, response)=>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err){
            //status 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans la donnée de l'id correspondante à la requête et stockage dans une const
            //const databyid = data.tableau.find
            const dataById = existingData.comedie.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete trouvé
            if(dataById){
                //status 200 + donnée
                response.status(200).json(dataById);
            //sinon
            } else {
                //erreur status 404 + message
                response.status(404).json({
                    message: "la donnée avec cet id n'a pas été trouvée",
                    error: err
                })
            }
        }
    });
};


//export de la methode getdDataByTitle qui permet de récupérer une donnée par son titre
exports.getDataByTitle = (request, response)=>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err){
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans la donnée du titre correspondant à la requête et stockage dans une const
            //const databytitle = data.tableau.find
            const dataByTitle = existingData.comedie.find((obj)=> obj.titre === request.params.titre);
            //si data de la requete trouvée
            if (dataByTitle) {
                //status 200 + donnée
                response.status(200).json(dataByTitle);
            //sinon
            } else {
                //erreur status 404 + message
                response.status(404).json({
                    message: "Les données avec ce titre sont introuvables"
                })
            }
        }
    });
};

//export de la methode createData qui permet d'insérer une donnée dans le tableau du fichier film.json
exports.createData = (request, response) =>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err){
            //status 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recuperation de l'id du dernier objet du tableau
            //ajout de la donnée
            //données existante + requete
            //data.tableau.push(requete)
            //si tableau vide
            if (existingData.comedie === []) {
                //tableau = requete  + (id = 1)
                existingData.comedie.push({ "id": 1, "titre": request.body.titre, "année": request.body.année });
            //sinon
            } else {
                //tableau = requete + (id = taille du tableau + 1)
                existingData.comedie.push({ "id": existingData.comedie.length+1, "titre": request.body.titre, "année": request.body.année });
            }
            //on réécrit les nouvelles données
            //fs.writeFile(chemin, JSON.stringify(donnée), (err))
            fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                //if err
                if (writeErr){
                    //status 500 + message
                    response.status(500).json({
                        message: "Erreur lors de l'écriture",
                        error: err
                    })
                //sinon
                } else {
                    //status 200 + message
                    response.status(200).json({
                        message: "les données ont été ajoutées"
                    })
                }
            });
        }
    });
};
                
//export de la methode updateData qui permet de mettre à jour une donnée récupérée par son id
exports.updateData = (request, response) =>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err,data)=>{
        //if erreur
        if (err) {
            //status 500 + message
            response.status(500).json({
                message: "erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans la donnée de l'id correspondante à la requête et stockage dans une const
            //const databyid = data.tableau.find
            const dataById = existingData.comedie.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete non trouvé
            if (!dataById){
                //status 404 + message
                response.status(404).json({
                    message: "objet non trouvé",
                    error: err
                })
            //sinon
            } else {
                //on remplace les données par celles de la requête
                //données existante = donnée de la requete
                //data.donnée = requete.nouvelle donnée
                //si il y a requete pour changer le titre et l'année
                if(request.body.titre && request.body.année){
                    //titre + année = requête
                    dataById.titre = request.body.titre;
                    dataById.année = request.body.année;
                //sinon si requête pour changer le titre
                } else if (request.body.titre){
                    //titre = requête
                    dataById.titre = request.body.titre;
                //sinon si requête pour changer l'année
                } else if (request.body.année){
                    //année = requête
                    dataById.année = request.body.année;
                }
                //on réécrit les nouvelles données
                //fs.writeFile(chemin, JSON.stringify(donnée), (err))
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                    //if err
                    if (err) {
                        //status 500 + message
                        response.status(500).json({
                            message: "erreur de réécriture"
                        })
                    //sinon
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "les données ont été mise à jour"
                        })
                    }
                })
            }
        }
    });
};

//export de la methode deleteDataById qui permet de supprimer une donnée récupérée par son id
exports.deleteDataById = (request, response)=>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err){
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans la donnée de l'id correspondante à la requête et stockage dans une const
            //const databyid = data.tableau.find
            const dataById = existingData.comedie.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete non trouvée
            if (!dataById){
                //status 404 + message
                response.status(404).json({
                    message: "données avec cet id introuvables",
                    error: err
                })
            //sinon
            } else {
                //données existante = données de la requete
                //data.tableau = data.tableau.filter
                existingData.comedie = existingData.comedie.filter((obj)=> obj.id != parseInt(request.params.id));
                //on réécrit les nouvelles données
                //fs.writeFile(chemin, JSON.stringify(donnée), (err))
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                    //if err
                    if (err){
                        //status 500 + message
                        response.status(500).json({
                            message: "Erreur d'écriture",
                            error: err
                        })
                    //sinon
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "Données supprimées"
                        })
                    }
                })
            }
        }
    });
};