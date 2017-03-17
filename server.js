// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var pageDirectory = require('./pageDirectory.json');
var fetcher = require('./fetcher.js');





// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// handelsblatt/ - originalUrl
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:page/*", function (req, res) {

  var data = {
    page: req.params.page,
    url: req.originalUrl
  };
  var parts = data.url.substr(1).split('/');
  parts.shift(); //remove first
  data.parts = parts;
  data.remoteUrl = '/' + data.parts.join('/');
  data.page = pageDirectory[data.page];
  
  fetcher.get(data).then(function(json){
    data.json = json;
    res.send(data);
  });
  //res.send(data);
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
