//declaration de la constante pour l'export du module fs
const fs = require('fs');

//export de la methode getAllDataTab permettant d'afficher les données contenus dans le tableau drame du fichier film.json en json dans la requête
exports.getAllDataTab = (request, response) => {
    //lecture du fichier
    //fs.readFile(chemin, (err, data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if err
        if (err) {
            //erreur 500 + message
            response.status(500).json({
                message: "Erreur lors de l'écriture",
                error:err
            })
        //else
        } else {
            //status 200 + JSON.parse(data).tableau
            response.status(200).json(JSON.parse(data).drame);
        }
    })
}

//export de la methode getDataById permettant de récupérer une data par son id
exports.getDataById = (request, response) =>{
    //lecture du fichier film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err,data)=>{
        //if err
        if (err) {
            //erreur 500 + message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error:err
            })
        //else
        } else {
            //stockage des données dans une constante
            //const data = JSON.parse
            const existingData = JSON.parse(data);
            //recherche dans le fichier si donnée.id existe
            //données.tableau.find
            const dataById = existingData.drame.find((obj) => obj.id === parseInt(request.params.id));
            //if donnée existe
            if (dataById) {
                //status 200 + objet
                response.status(200).json(dataById)    
            //sinon
            } else {
                //status 404 + message données non trouvés
                response.status(404).json({
                    message: "l'objet avec cet id n'a pas été trouvé",
                    error:err
                })
            }
        }
    });
};

//export de la methode getdDataByTitle qui permet de récupérer une donnée par son titre
exports.getDataByTitle = (request, response)=> {
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
            const dataByTitle = existingData.drame.find((obj)=> obj.titre === request.params.titre)
            //si data de la requete trouvé
            if (dataByTitle){
                //status 200 + donnée
                response.status(200).json(dataByTitle)
            //sinon
            } else {
                //erreur status 404 + message
                response.status(404).json({
                    message: "Données avec ce titre non trouvées",
                    error: err
                })
            }
        }
    })
}

//export de la methode createData permettant d'intégrer de nouvelles données dans le tableau drame de mes fichiers film.json
exports.createData = (request, response) =>{
    //lecture du fichier film.json
    //fs.readFile (chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if err
        if (err){
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error:err
            })
        //else
        } else {
            //stockage des datas dans une constante
            //const data = JSON.parse
            const existingData = JSON.parse(data);
            //ajout de la donnée de la requête
            //data.tableau.push(requete: id:taille du tableau+1)
            //si tableau vide
            if (existingData.drame === []) {
                //tableau = requete id =1
                existingData.drame.push({ "id": 1, "titre": request.body.titre, "année": request.body.année });
            //sinon
            } else {
                //tableau = requete id = taille du tableau + 1
                existingData.drame.push({ "id": existingData.drame.length+1, "titre": request.body.titre, "année": request.body.année });
            }
            //écriture de la donnée en string dans le tableau
            //fs.writeFile(chemin, JSON.stringify(donnée), (err))
            fs.writeFile("./src/model/film.json", JSON.stringify(existingData), (writeErr)=>{
                //if err
                if (writeErr){
                    //status 500 + message

                //else
                } else {
                    //status 200 + message
                    response.status(200).json({
                        message: "Données ajoutée"
                    })
                }
            });
        }
    });
};

//export de la methode updateData qui permet de mettre à jour une donnée récupérée par son id
exports.updateData = (request, response)=>{
    //lecture du fichier film.json
    //fs.readFile(chemin, (err, data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err) {
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //else
        } else {
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans le fichier la donnée correspondante à l'id et je la stocke
            //const databyid = data.tableau.find
            const dataById = existingData.drame.find((obj)=> obj.id === parseInt(request.params.id));
            //if databyId n'existe pas
            if (!dataById) {
                //erreur 404 + message
                response.status(404).json({
                    message: "données avec cet id non trouvées",
                    error:err
                })
            //sinon
            }else {
                //on remplace les données par celle de la requête
                //databyid.valeur = requete.nouvelle valeur
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
                //réécriture des données en string
                //fs.writeFile(chemin, JSON.stringify(data), (err))
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
                            message: "données mises à jour"
                        })
                    }
                });
            }
        }
    });
};

//export de la methode deleteDataById qui permet de supprimer une donnée récupérée par son id
exports.deleteDataById = (request, response) =>{
    //lecture des données de film.json
    //fs.readFile(chemin, (err,data))
    fs.readFile("./src/model/film.json", (err, data)=>{
        //if erreur
        if (err) {
            //status 500 + message
            response.status(500).json({
                message: "Erreur de lecture",
                error:err
            })
        //sinon
        }else{
            //stockage de la donnée dans une constante
            //const data = JSON.parse(data)
            const existingData = JSON.parse(data);
            //recherche dans la donnée de l'id correspondante  la requête et stockage dans une const
            //const databyid = data.tableau.find
            const dataById = existingData.drame.find((obj)=> obj.id === parseInt(request.params.id));
            //si data de la requete non trouvé
            if (!dataById){
                //status 404 + message
                request.status(404).json({
                    message: "objet non trouvé",
                    error: err
                })
            //sinon
            } else {
                //données existante = donnée de la requete
                //data.tableau = data.tableau.filter
                existingData.drame = existingData.drame.filter((obj)=> obj.id != parseInt(request.params.id));
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
                    }else{
                        //status 200 + message
                        response.status(200).json({
                            message: "données supprimées"
                        })
                    }
                })
            }
        }
    })
}