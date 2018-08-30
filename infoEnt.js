var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var params = require('./params.js');

var host = 'localhost';
var port = '8085';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// activation de CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var server = app.listen(port, host, function() {
  console.log(
    "App listening at http://%s:%s",
    server.address().address,
    server.address().port
  );
});

// API Entreprise
app.get('/entreprises/:siren', function(req, res) {
  var base = "https://apientreprise.fr/v2/entreprises";
  var token = encodeURIComponent(params.apientreprise_token);
  var context = encodeURIComponent("Tiers");
  var recipient = encodeURIComponent(params.apientreprise_recipient);
  var object = encodeURIComponent("demonstrateur");
  var siren = encodeURIComponent(req.params.siren);

  var url = base + "/" + siren + "?token=" + token + "&context=" + context + "&recipient=" + recipient + "&object=" + object;

  request(url, function(error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    // console.log(body);
  });
});

// API Entreprise
app.get('/etablissements/:siret', function(req, res) {
  var base = "https://api.apientreprise.fr/v2/etablissements";
  var token = encodeURIComponent(params.apientreprise_token);
  var context = encodeURIComponent("Tiers");
  var recipient = encodeURIComponent(params.apientreprise_recipient);
  var object = encodeURIComponent("demonstrateur");
  var siret = encodeURIComponent(req.params.siret);

  var url = base + "/" + siret + "?token=" + token + "&context=" + context + "&recipient=" + recipient + "&object=" + object;

  request(url, function(error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    // console.log(body);
  });
});

// Base Adresse Nationale
app.get('/adresses', function(req, res) {
  var base = "https://api-adresse.data.gouv.fr/search";
  var adresse = encodeURIComponent(req.query.adresse);

  var url = base + "/?q=" + adresse;

  request(url, function(error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    // console.log(body);
  });
});

// Géo API
app.get('/communes/:code', function(req, res) {
  var base = "https://geo.api.gouv.fr/communes";
  var code = encodeURIComponent(req.params.code);

  var url = base + "/" + code + "?fields=nom,codesPostaux,population&format=geojson&geometry=contour";

  request(url, function(error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    // console.log(body);
  });
});

// Zones Urbaines Sensibles (ZUS), des Zones de Redynamisation Urbaines (ZRU) et des Zones Franches Urbaines (ZFU).
app.get('/zones', function(req, res) {
  var base = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=idf_ZUS%40datailedefrance";
  var ville = encodeURIComponent(req.query.ville);

  var url = base + "&q=" + ville;

  request(url, function(error, response, body) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
    // console.log(body);
  });
});
