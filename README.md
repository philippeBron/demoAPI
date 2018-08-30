# Démonstrateur de api.mi
Cette application à pour objectif d'illustrer l'usage des API au sein d'une application web. Son fonctionnement est très basique. La saisie du numéro SIRET d'un établissement déclenche l'interrogation des API suivantes :
*   API Entreprise : récupération des informations sur l'établissement
*   BAN : géocodage de l'adresse de l'établissement
*   GéoAPI : information sur le département de résidence de l'établissement
*   Annuaire des établissements publics de l’administration : localisation de la préfecture et de la sous-préfecture du département

## Précisions techniques
Cette application utilise directement les API GéoAPI et Annuaire. En revanche, elle passe par une application proxy (s'exécutant sur localhost pour la démo) permettant de centraliser la gestion du token d'accès à l'API Entreprise. Ce proxy est également utilisé pour l'appel à la BAN. Cet utilisation d'un proxy permet de simuler la mise en œuvre d'une API Gateway qui pourrait proposer une simplification des appels à une API générique.

Ce proxy est utilisable en lançant l'application nodejs infEnt.js qui nécessite l'installation préalable des modules :
*   express
*   bodyParser
*   request

Les credentials APIEntreprise sont à renseigner dans un fichier params.js suivant le modèle du fichier params_sample.js fourni dans ce dépôt.

## Lancement
Le proxy se lance à l'aide de la commande `node infoEnt.js` et l'application peut être utilisée en ouvrant le fichier index.html dans un navigateur web.
