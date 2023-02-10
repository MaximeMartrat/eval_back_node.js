//declaration de la constante pour l'export du module fs
const fs = require('fs');

//export de la methode getAllData permettant d'afficher les données contenus dans le fichier exemple.json en JSON dans la requête
exports.getAllData = (request, response) => {
    //utiliser la methode readFile du module fs pour lire le fichier
    fs.readFile("./src/model/exemple.json", (err, data) =>{
        //condition si erreur
        if(err){
            //renvoi de l'erreur status 500 et du message
            response.status(500).json({
                message: "Erreur de lecture !!",
                error: err
            })
        } else {
            //Sinon status 200 et renvoi des datas au format json
            response.status(200).json(JSON.parse(data))
        }
    });
};

//export de la methode getDataById permettant de récupérer une data par son id
exports.getDataById = (request, response) =>{
    //lecture du fichier exemple.json
    fs.readFile("./src/model/exemple.json", (err, data) =>{
        //condition si erreur 500 
        if(err){
            //renvoi l'erreur avec message
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        //sinon
        }else{
            //transformer les datas en json manipulable
            const manipData = JSON.parse(data)
            // Je vais chercher dans ce fichier si l'id passée en paramètres existe dans le contenu
            const dataById = manipData.entrees.find((obj) => obj.id === parseInt(request.params.id))
            //si on trouve cet id
            if (dataById) {
                //renvoi la reponse avec status 200 et l'objet
                response.status(200).json(dataById)
            //sinon
            }else{
                //renvoi l'erreur (objet introuvable) avec un status 404 et le message d'erreur
                response.status(404).json({
                    message: "Pas trouvé d'objet avec cet id !"
                })
            }
        }
    });
};

exports.createData = (request, response) => {
    //lecture du fichier
    fs.readFile("./src/model/exemple.json", (err, data)=>{
        //condition 
        //si erreur 500 avec message
        if (err) {
            response.status(500).json({
                message: "Erreur lecture",
                error: err
            })
        //sinon
        } else {
            //transforme la data en json.manipulable
            const existingData = JSON.parse(data);
            //on rajoute la nouvelle donnée
            existingData.entrees.push(request.body);
            //réecrit le fichier
            fs.writeFile("./src/model/exemple.json", JSON.stringify(existingData), (writeErr)=>{
                //si erreur 500
                if (writeErr){
                    response.status(500).json({
                        message: "Erreur lors de l'ecriture"
                    })
                //sinon pas d'erreur
                } else {
                    //status 200 avec un message
                    response.status(200).json({
                        message: "Les données sont ajoutées"
                    })
                }
            })
        }
    });
};

//export la methode updateData qui permet de mettre à jour une donnée en se basant sur son id
exports.updateData = (request, response)=>{
    //lecture du fichier
    fs.readFile("./src/model/exemple.json", (err, data) => {
        //condition si il y a une erreur sur la lecture du fichier
        if (err) {
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            })
        //sinon    
        } else {
            //on stocke les données existante
            const existingData = JSON.parse(data);
            //je cherche dans le fichier si l'id correspondant au paramètres est dans le contenu
            const dataById = existingData.entrees.find((obj) => obj.id === parseInt(request.params.id));
            //si on ne trouve pas d' objet avec cet id
            if (!dataById) {
                //on renvoi une réponse avec un status 404 avec un message d'erreur
                response.status(404).json({
                    message: "l'objet avec cet id n'a pas été trouvé",
                    error: err
                })
            //sinon
            } else {
                //on remplace les données par celles de la requête
                dataById.name = request.body.name;
                //on ecrit les nouvelles données
                //fs.writeFile(./src/model)
                fs.writeFile("./src/model/exemple.json", JSON.stringify(existingData),(writeErr) => {
                    //si il y a une erreur au moment de l'ecriture
                    if (writeErr) {
                        //on renvoi l'erreur 500 avec le message
                        response.status(500).json({
                            message: "Erreur lors de l'ecriture"
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
    });
};

//export de la methode deleteDataById qui me permet de supprimer une donnée en se basant sur son id
exports.deleteDataById = (request, response) => {
    //lecture du fichier
    fs.readFile("./src/model/exemple.json", (err, data) => {
        //si erreur de lecture
        if (err) {
            //erreur 500 plus message
            response.status(500).json({
                message: "Erreur lors de la lecture",
                error: err
            });
        //sinon
        } else {
            //stockage de la donnée existante
            const existingData = JSON.parse(data);
            //chercher dans le fichier l'id correspondante en paramètre existe dans le contenu
            const dataById = existingData.entrees.find((obj) => obj.id === parseInt(request.params.id));
            //si on ne trouve pas l'objet avec cette id
            if (!dataById) {
                //on renvoi une réponse status 404 avec le message
                response.status(404).json({
                    message: "Aucun objet trouvé avec cet id !",
                    error: err
                });
            //sinon
            } else {
                //on réassigne la donnée existante par celle sans la donnée demandée grace a filter
                existingData.entrees = existingData.entrees.filter((obj) => obj.id != parseInt(request.params.id));
                fs.writeFile("./src/model/exemple.json", JSON.stringify(existingData),(writeErr) => {
                    //si erreur
                    if (writeErr) {
                        //renvoi erreur 500 et le message
                        response.status(500).json({
                            message: "Erreur lors de l'écriture",
                            error: err
                        })
                    //sinon
                    } else {
                        //status 200 avec message 
                        response.status(200).json ({
                            message: "Suppression reussie"
                        })
                    }
                })
            }
        }
    });
};

//