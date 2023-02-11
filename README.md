Eval NodeJs
=

## Introduction

Evaluation sur le CRUD sur un tableau fait en groupe qui se trouve dans le fichier exemple.json
```
src/model/exemple.json
``` 
Et sur 6 tableaux en individuel qui se trouvent dans le fichier film.json

```
./src/model/film.json
```

Notre index se situe dans le fichier :
```
/app.js
```
L'écoute des ports pour l'appel au server est sur :
```
/server.js
```
Les modules contenants les methodes nécessaires à l'application :
```
./src/controller/exemple_controller
```
Les routes pour faire appel aux methodes :
```
./src/routes/exemple_route
```
## Liste des routes
| Routes | Verbe | Exemple | Explication |
| :------| :-----| :-------| -----------:|
| /entrees | GET | http://localhost:3200/entrees | une route qui va permettre d'afficher les données contenu dans le tableau d'un fichier |
| /entrees/:id | GET | http://localhost:3200/entrees/:id | une route qui va permettre d'afficher une entrée d'un tableau récupérée par son id  contenu dans un fichier |
| /entrees/title/:titre | GET | http://localhost:3200/entrees/title/:titre | une route qui va permettre d'afficher les données d'une entrée récupérée grace à son titre dans le tableau d'un fichier |
| /entrees | POST | http://localhost:3200/entrees | une route qui va permettre d'insérer des données dans le tableau d'un fichier |
| /entrees/:id | PUT | http://localhost:3200/entrees/:id | une route qui va permettre de mettre à jour les données contenu dans le tableau d'un fichier en le ciblant par son id |
| /entrees/:id| DELETE | http://localhost:3200/entrees/:id | une route qui va permettre d'effacer les données contenu dans le tableau d'un fichier récupérer par son id |

##Alerte

Une fois récupéré le dossier n'oubliez pas de faire la commande suivante dans le terminal : 
```
npm init
```
Pour installer les node_modules nécessaires à l'utilisation de l'application
Puis taper dans le terminal la commande: 
```
npm start
```
Pour lancer le serveur