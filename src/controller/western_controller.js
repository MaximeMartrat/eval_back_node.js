//declaration de la constante pour l'export du module fs
const fs = require('fs');

//export de la methode getAllDataTab permettant d'afficher les données contenus dans le tableau du fichier film.json en JSON dans la requête
exports.getAllDataTab = (request, response) => {
    //lire le fichier avec la methode readFile du module fs
    fs.readFile("./src/model/film.json", (err, data)=>{
        //condition si erreur
        if(err){
            //renvoi de l'erreur status 500 + message erreur de lecture
            response.status(500).json({
                message: "Erreur lors de la lecture du fichier",
                error: err
            })
        //sinon
        } else {
            //renvoi status 200 + données du tableau au format json avec la methode JSON.parse
            response.status(200).json(JSON.parse(data).western)
        }    
    });
};

//export de la methode getDataById permettant de récupérer une donnée  d'un tableau par son id
exports.getDataById = (request, response) =>{
    //lecture du fichier avec la methode readFile du module fs
    fs.readFile("./src/model/film.json", (err,data)=>{
        //condition si erreur lors de la lecture
        if (err){
            //renvoi de l'erreur status 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture du fichier",
                error:err
            })
        //sinon
        } else {
            //declaration de constante pour transformation des données en json manipulable (JSON.parse)
            const manipData = JSON.parse(data);
            //chercher dans le fichier si l'id passée en paramètres existe dans le contenu
            const dataById = manipData.western.find((obj)=> obj.id === parseInt(request.params.id));
            //si l'objet est trouvé
            if (dataById) {
                //renvoi status 200 et l'objet
                response.status(200).json(dataById)
            //sinon
            } else {
                //renvoi erreur (objet introuvable) avec status 404 + message
                response.status(404).json({
                    message: "L'objet avec cet id est introuvable",
                    error:err
                });
            } 
        } 
    });
};

//export de la methode getdDataByTitle qui permet récupérer une donnée par son titre
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
            const dataByTitle = existingData.western.find((obj)=> obj.titre === request.params.titre);
            //si data de la requete trouvé
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
            

//export de la methode createData permettant d'insérer de la donnée dans mes fichiers film.json
exports.createData = (request, response) =>{
    //lecture du fichier avec la methode readfile du module fs
    fs.readFile("./src/model/film.json", (err, data)=>{
        //condition si erreur
        if (err) {
            //renvoi de l'erreur de lecture 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture du fichier",
                error: err
            })
        //sinon
        } else {
            //on ajoute dans une constante les données transformées en json manipulable avec JSON.parse
            const existingData = JSON.parse(data);
            //si tableau vide
            if (existingData.western === []) {
                //tableau = requete id =1
                existingData.western.push({ "id": 1, "titre": request.body.titre, "année": request.body.année });
            //sinon
            } else {
                //tableau = requete id = taille du tableau + 1
                existingData.western.push({ "id": existingData.western.length+1, "titre": request.body.titre, "année": request.body.année });
            }
            //réécrit dans le fichier (ds.writeFile)
            fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                // condition si erreur
                if(writeErr){
                    //renvoi de l'erreur de réécriture 500 + message
                    response.status(500).json({
                        message: "Erreur lors de la réécriture",
                        error:err
                    })
                //sinon
                } else {
                    //status 200 avec le message donnée ajoutée
                    response.status(200).json({
                        message: "Données ajoutées avec succès"
                    })
                }
            });
        }
    });
};

//Export de la methode updateData qui permet de mettre à jour une donnée en se basant sur son id
exports.updateData = (request, response) => {
    //lecture du fichier avec la methode readFile du mdule fs
    fs.readFile("./src/model/film.json", (err, data)=>{
        //condition si erreur lors de la lecture
        //if error
        if (err) {
            //reponse status 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error:err
            })
        //sinon(else)
        } else {
            //stockage des données
            //const data = JSON.parse(données)
            const existingData = JSON.parse(data);
            //recherche si id demandée existe dans le contenu
            //const databyid = data.find ...
            const dataById = existingData.western.find((obj)=> obj.id === parseInt(request.params.id));
            //condition if objet non trouvé
            if (!dataById) {
                //erreur 404 + message
                response.status(404).json({
                    message: "l'objet avec cet id n'a pas été trouvé",
                    error: err
                })
            //sinon (else)
            } else {
                //remplacement des données par celle de la requête
                //databyid.(données demandées) = requete.(données changées)
                //si il y a requete pour changer le titre et l'année
                if(request.body.titre && request.body.année){
                    //titre + année = requête
                    dataById.titre = request.body.titre;
                    dataById.année = request.body.année;
                //sinon si requête pour changer titre
                } else if (request.body.titre){
                    //titre = requête
                    dataById.titre = request.body.titre;
                //sinon si requête pour changer année
                } else if (request.body.année){
                    //année = requête
                    dataById.année = request.body.année;
                }
                //réécriture des nouvelles données
                //fs.writeFile(chemin, JSON.stringify(donnée)(erreur))
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData),(writeErr)=>{
                    //si erreur
                    if (writeErr){
                        //erreur 500 + message
                        response.status(500).json({
                            message: "Erreur lors de l'écriture",
                            error: err
                        })
                    //sinon
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "Données mises à jour"
                        })
                    }
                });
            }
        }
    });
};

//Export de la methode deleteDatabyId qui permet de supprimer une donnée par son id
exports.deleteDataById = (request, response) => {
    //lecture des fichiers
    //fs.readFile("chemin", (err,data)
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if error
        if (err){
            //erreur 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //else
        } else {
            //stockage dans une constante des données
            //const data = JSON.parse
            const existingData = JSON.parse(data);
            //recherche dans le fichier l'id correspondante aux paramètres demandés
            //const databyid = data.find
            const dataById = existingData.western.find((obj)=> obj.id === parseInt(request.params.id));
            //if objet non trouvé
            if (!dataById) {
                //erreur404 +message
                response.status(404).json({
                    message: "Aucun objet avce cet id trouvé",
                    error:err
                })
            //else
            }else{
                //donnée existante = donnée filtrée
                existingData.western = existingData.western.filter((obj)=> obj.id != parseInt(request.params.id));
                //réécriture des données
                //fs.writeFile(chemin JSON.stringify(data),(erreur))
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                    //if erreur
                    if (writeErr){
                        //erreur 500 + message
                        response.status(500).json({
                            message: "Erreur lors de l'écriture",
                            error:err
                        })
                    //else
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "Données supprimées"
                        })
                    }
                });
            }
        }
    });
};