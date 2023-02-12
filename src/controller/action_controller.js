//declaration de la constante pour l'export du module fs
const fs = require('fs');

//export de la methode getAllDataTab permettant d'afficher les données contenus dans le tableau action du fichier film.json en JSON dans la requête
exports.getAllDataTab = (request, response) => {
    //on utilise la methode readFile du module fs pour lire le fichier
    fs.readFile("./src/model/film.json", (err, data) =>{
        //condition si erreur
        if(err){
            //renvoi de l'erreur status 500 et du message
            response.status(500).json({
                message: 'Erreur de lecture !!',
                error: err
            })
        //sinon
        } else {
            //renvoi le status 200 et les datas du tableau action au format json
            response.status(200).json(JSON.parse(data).action)
        }
    })
}

//export de la methode getDataById permettant de récupérer une data par son id
exports.getDataById = (request, response) =>{
    //lecture du fichier film.json
    fs.readFile("./src/model/film.json", (err, data) =>{
        //condition si un erreur 500
        //on renvoi l'erreur d'écriture avec son message
        if (err) {
            response.status(500).json({
                message: "Erreur lors de l'ecriture",
                Error: err
            })
        //sinon
        } else {
            //on transforme les datas en json manipulable
            const manipData = JSON.parse(data)
            //je vais chercher dans ce fichier si l'id passée en paramètres existe dans le contenu
            const dataById = manipData.action.find((obj) => obj.id === parseInt(request.params.id))
            //condition si on trouve cet id
            if (dataById) {
                //renvoi de la réponse avec le status 200 et l'objet
                response.status(200).json(dataById)
            //sinon
            } else {
                //renvoi de l'erreur (objet non trouvé) avec le status 404 et le message d'erreur
                response.status(404).json({
                    message: "Pas trouvé d'objet avec cet id !"                    
                })
            }
        }
    })
}

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
            const dataByTitle = existingData.action.find((obj)=> obj.titre === request.params.titre);
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

//export de la methode createData permettant d'insérer de la donnée dans mon fichier film.json
exports.createData = (request, response) =>{
    //lecture du fichier avec readfile
    fs.readFile("./src/model/film.json", (err, data)=>{
        //condition
        if(err) {
            //si erreur 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //on ajoute dans une constante la data transformée en json manipulable avec JSON.parse
            const existingData = JSON.parse(data);
            //si tableau vide
            if (existingData.action === []) {
                //tableau = requete id = 1
                existingData.action.push({ "id": 1, "titre": request.body.titre, "année": request.body.année });
            //sinon
            } else {
                //tableau = requete id = taille du tableau + 1
                existingData.action.push({ "id": existingData.action.length+1, "titre": request.body.titre, "année": request.body.année });
            }
            //réecrit dans le fichier
            fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                //si y a une erreur d'écriture
                if(writeErr){
                    //envoi de l'erreur status 500 + message
                    response.status(500).json({
                        message: "Erreur lors de l'écriture",
                        error: err
                    })
                //sinon pas d'erreur
                } else {
                    //envoi le status 200 avec le message (donnée ajoutée)
                    response.status(200).json({
                        message: "les données ont été ajoutées"
                    })
                } 
            })
        }
    })
};

//export de la methode updateData qui permet de mettre à jour une donnée en se basant sur son id
exports.updateData = (request, response) => {
    //lecture du fichier avec readFile
    fs.readFile("./src/model/film.json", (err, data)=>{
        //condition si il y a une erreur lors de la lecture
        if (err) {
            //on renvoi l'erreur 500 avec le message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon
        } else {
            //on stocke les données existante dans une constante avec la methode JSON.parse
            const existingData = JSON.parse(data);
            //je cherche dans le fichier si l'id correspondante à la requête est dans le contenu
            const dataById = existingData.action.find((obj) => obj.id === parseInt(request.params.id));
            //si on ne trouve pas d'objet avec cet id
            if (!dataById) {
                //on renvoi une réponse (404) avec le message
                response.status(404).json({
                    message: "objet non trouvé",
                    error: err
                })
            //sinon
            } else {
                //on remplace les données par celles de la requête
                //si il y a requete pour changer le titre et l'année
                if(request.body.titre && request.body.année){
                    //titre + année = requête
                    dataById.titre = request.body.titre;
                    dataById.année = request.body.année;
                //sinon si requête pour changer seulement le titre
                } else if (request.body.titre){
                    //titre = requête
                    dataById.titre = request.body.titre;
                //sinon si requête pour changer seulement l'année
                } else if (request.body.année){
                    //année = requête
                    dataById.année = request.body.année;
                }
                //on réecrit les nouvelles données avec writeFile
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                    //si il y a une erreur
                    if (writeErr) {
                        //on renvoi l'erreur 500 + message erreur d'ecriture
                        response.status(500).json({
                            message: "Erreur de la réécriture"
                        })
                        //sinon
                    } else {
                        //on renvoi le status 200 avec le message
                        response.status(200).json({
                            message: "Données mise à jour avec succès"
                        })
                    }
                })
            }
        }
    })
};

//export de la methode deleteDataById qui permet de supprimer une donnée en se basant sur son id
exports.deleteDataById = (request, response) => {
    //lecture du fichier avec la methode readfile du module fs
    fs.readFile("./src/model/film.json", (err, data) => {
        //si erreur de lecture
        if (err) {
            //renvoi de l'erreur status 500 + message
            response.status(500).json({
                message: "Erreur lors de l'ecriture",
                error: err
            })
        //sinon
        } else {
            //stockage de la donnée existante dans une constante
            const existingData = JSON.parse(data);
            //recherche des données à l'id de la requête dans le contenu
            const dataById = existingData.action.find((obj)=> obj.id === parseInt(request.params.id));
            //si on ne trouve pas l'objet avec cette id
            if (!dataById) {
                //renvoi de l'erreur 404 + message pas d'objet
                response.status(404).json({
                    message: "l'objet avec cet id est introuvable",
                    error: err
                })
            //sinon
            } else {
                //on réassigne la donnée existante sans la donnée éffacée avec la methode filter
                existingData.action = existingData.action.filter((obj)=> obj.id != parseInt(request.params.id));
                //on réécrit les nouvelles données avec writeFile
                fs.writeFile("./src/model/film.json", JSON.stringify(existingData),(writeErr) => {
                    //si erreur de réécriture
                    if(writeErr){
                        //renvoi de l'erreur 500 avec le message
                        response.status(500).json({
                            message: "Erreur lors de la réécriture",
                            error: err
                        })
                    //sinon
                    } else {
                        //status 200 + message
                        response.status(200).json({
                            message: "Suppression de la donnée réussie"
                        })
                    }
                });
            }
        }
    });
};
