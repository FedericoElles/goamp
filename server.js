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
var tester = require('./tester.js');





// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(compression());

// handelsblatt/ - originalUrl
app.get("/", function (req, res) {
  var data = {
    debug: !!req.query.debug,
    dev: !!req.query.dev,
    pages: pageDirectory,
    suffix: ''
  };  
  
  if (data.dev){
    data.suffix = '?dev=true';
  }
  
  data.json = JSON.stringify(data, undefined, 4);
  
  res.render('home', data);
});




app.get("/isamp/:page/*", function (req, res) {
  var data = {
    debug: !!req.query.debug,
    suffix: '',
    dev: !!req.query.dev,
    pageId: req.params.page,
    url: req.originalUrl
  };
  
  if (data.dev){
    data.suffix = '?dev=true';
  }
  var parts = data.url.substr(1).split('/');
  parts.shift(); //remove first
  parts.shift(); //remove second
  data.parts = parts;
  data.remoteUrl = '/' + data.parts.join('/');
  data.page = pageDirectory[data.pageId];
  
 
  var urlAMP = data.page.url + data.remoteUrl;
  if (typeof data.page.urlAMP === 'string'){
    urlAMP = data.page.urlAMP + data.remoteUrl;
  }
  if (typeof data.page.urlAMP === 'object'){
    if (data.page.urlAMP.actionReplace){
      urlAMP = urlAMP.replace(data.page.urlAMP.actionReplace[0],data.page.urlAMP.actionReplace[1]);
    }
  }

  
  tester.get(urlAMP).then(function(result){
    res.send(result);
    //}
  }).catch(function(err){
    res.send(err);
  });
  
});



app.get("/:page/*", function (req, res) {
  var data = {
    debug: !!req.query.debug,
    suffix: '',
    dev: !!req.query.dev,
    pageId: req.params.page,
    url: req.originalUrl
  };
  
  if (data.dev){
    data.suffix = '?dev=true';
  }
  
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
