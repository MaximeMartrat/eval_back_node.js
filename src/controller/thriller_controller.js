//declaration de la constante pour l'export du module fs
const fs = require('fs');
const myData = "./src/model/film.json"
//export de la methode getAllDataTab qui permet de récupérer une donnée dans un tableau du fichier film.json
exports.getAllDataTab = (request, response) =>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=> {
        //if erreur
        if(err) {
            //status 500 + message       
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //status 200 + données du tableau de la requête(JSON.parse(donnée).tableau)
            response.status(200).json(JSON.parse(data).thriller)
        }
    });
};


//export de la methode getdDataById qui permet de récupérer une donnée par son id
exports.getDataById = (request, response)=> {
    //lecture des données de "film.json"
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=> {
        //if erreur
        if(err) {
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
            const dataById = existingData.thriller.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete trouvé
            if(dataById) {
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
exports.getDataByTitle = (request, response)=> {
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=> {
        //if erreur
        if(err) {
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
            const dataByTitle = existingData.thriller.find((obj)=> obj.titre.toLowerCase() === request.params.titre.toLowerCase());
            //si data de la requete trouvé
            if(dataByTitle) {
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

//export de la methode createData qui permet d'insérer une donnée dans un tableau du fichier "film.json"
exports.createData = (request, response) => {
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=> {
        //if erreur
        if(err) {
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
            //ajout de la donnée
            //données existante = donnée de la requete
            //si tableau vide
            if(existingData.thriller === 0) {
                //tableau = requete (id =1=)
                existingData.thriller.push({ "id": 1, "titre": request.body.titre, "annee": request.body.annee });
            //sinon
            } else {
                let thisData = existingData.thriller [ existingData.thriller.length - 1 ]
                //tableau = requete + (id = taille du tableau + 1)
                existingData.thriller.push({ "id": thisData.id + 1, "titre": request.body.titre, "annee": request.body.annee });
            }
            //on réécrit les nouvelles données
            //fs.writeFile(chemin, JSON.stringify(donnée), (err))
            fs.writeFile(myData, JSON.stringify(existingData), (writeErr)=> {
                //if err
                if(writeErr) {
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
exports.updateData = (request, response) => {
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err,data)=> {
        //if erreur
        if(err) {
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
            const dataById = existingData.thriller.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete non trouvé
            if(!dataById) {
                //status 404 + message
                response.status(404).json({
                    message: "objet non trouvé",
                    error: err
                })
            //sinon
            } else {
                //on remplace les données par celles de la requête
                Object.assign(dataById, request.body);
                //on réécrit les nouvelles données
                //fs.writeFile(chemin, JSON.stringify(donnée), (err))
                fs.writeFile(myData, JSON.stringify(existingData), (writeErr)=> {
                    //if err
                    if(err) {
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
exports.deleteDataById = (request, response)=> {
    //lecture des données de "film.json"
    //fs.readFile(chemin, (err,data))
    fs.readFile(myData, (err, data)=> {
        //if erreur
        if(err) {
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
            const dataById = existingData.thriller.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete non trouvé
            if(!dataById) {
                //status 404 + message
                response.status(404).json({
                    message: "données avec cet id introuvables",
                    error: err
                })
            //sinon
            } else {
                //données existante = donnée de la requete
                //data.tableau = data.tableau.filter
                existingData.thriller = existingData.thriller.filter((obj)=> obj.id != parseInt(request.params.id));
                //on réécrit les nouvelles données
                //fs.writeFile(chemin, JSON.stringify(donnée), (err))
                fs.writeFile(myData, JSON.stringify(existingData), (writeErr)=>{
                    //if err
                    if(err) {
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