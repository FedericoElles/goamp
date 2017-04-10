// server.js
// where your node app starts

// init project
var compression = require('compression')

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var pageDirectory = require('./pageDirectory.json');
var fetcher = require('./fetcher.js');






// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(compression());

// handelsblatt/ - originalUrl
app.get("/", function (req, res) {
  var data = {
    debug: !!req.query.debug,
    pages: pageDirectory
  };  
  data.json = JSON.stringify(data, undefined, 4);
  
  res.render('home', data);
});

app.get("/:page/*", function (req, res) {
  var data = {
    debug: !!req.query.debug,
    pageId: req.params.page,
    url: req.originalUrl
  };
  var parts = data.url.substr(1).split('/');
  parts.shift(); //remove first
  data.parts = parts;
  data.remoteUrl = '/' + data.parts.join('/');
  data.page = pageDirectory[data.pageId];
  
  if (true){
    fetcher.get(data).then(function(fetchData){
      var html = "";
      data.links = fetchData.links;
      // data.links.forEach(function(link){
      //   html += link.url + '<br>';
      // });
      data.json = JSON.stringify(data, undefined, 4);
      //if (data.debug){
      //  res.send(data);
      //} else {
      res.render('page', data);
      //}
    }).catch(function(err){
      res.send(err);
    });
  } else {
    res.send(data);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
