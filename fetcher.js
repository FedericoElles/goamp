let cheerio = require('cheerio')
var request = require('request');
var Q = require('q');
var tester = require('./tester.js');


var emojify = require('./emojify');

//use cache for data
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 80 });


function parseBody(data, body){
  let $ = cheerio.load(body);
  
  //remove everything not required in DOM
  data.page.remove.forEach(function(selector){
    //console.log('Remove:' + selector + ': ' + $(selector).length);
    $(selector).remove();
  });

  //console.log('body loaded', body);
  var links = {
    lists: [],
    articles: [],
    errors: []
  };
  var regArticle = new RegExp(data.page.validArticles, "");
  var regList = new RegExp(data.page.validLists, "");
  //console.log('regex', data.validArticles , regArticle);

  var dirUrlAdded = {};

  //console.log('Dev', data.dev)
  
  $('a').each(function(i, elem) {
    var isValid = true;
    var isValidArticle = false;
    var isValidList = false;     
    var urlOriginal = $(this).attr('href');
    var size = 'm';
    var url = '';
    
    
    
    if (urlOriginal){

     
      //filter invalid urls
      data.page.invalid.forEach(function(strRegEx){
        if (isValid){
          var regex = new RegExp(strRegEx, "");
          isValid = !regex.test(urlOriginal)
        }
      });

      if (!isValid){
        return;
      }


      //check if url is valid article - validArticles
      var match = regArticle.exec(urlOriginal);
      if (match && match[0] !== ''){
        url = match[1];
        isValidArticle = true;
      }

      //check if url is valid list - validLists
      if (isValidArticle === false){
        var match2 = regList.exec(urlOriginal);
        if (match2 && match2[0] !== ''){
          url = match2[1];
          isValidList = true;
        }          
      }

      //check for title
      var title = ''; //$(this).attr('title') || $(this).attr('alt');

      var searchTitle = false;
      var clues= data.page.titleClues;
      for (var i=0,ii=clues.length;i<ii;i+=1){
        if (!title || typeof title === 'undefined'){
          title = $(this).find(clues[i]).first().text();
          size = 'l';
          //console.log('HTML', $(this).html());
          //console.log('Finding Title',  clues[i] ,$(this).find(clues[i]).length);
        } else {
          i= ii+1;
        }
      }

      if (!title || typeof title === 'undefined'){
        size = 'm';
        //console.log('title', title);
        title = $(this).text();
        if (title.length>150){
          title = title.substr(0,150) + '...';
        }
      }
      
      if (!title || typeof title === 'undefined'){
        title = $(this).attr('title') || $(this).attr('alt');
      }


      
      if (title){
        title = title.replace(/(\r\n|\n|\r)/gm,"");
        title = title.replace(/\s+/g, ' ');
      }
      
      
      
      
      if (title && url && typeof dirUrlAdded[url] === 'undefined'){
        dirUrlAdded[url] = true;  
        var titleLength = title.length - title.replace(/ /g,'').length;
        
        //title must be at least 3 words long
        if (isValidArticle && titleLength > 1){
          
          //Special: flagStripeFolders - remove 
          // BEFORE: /politik/deutschland/bildungspolitik-akademisierungswahn-gefaehrdet-berufliche-bildung/19665020.html
          // AFTER:                       bildungspolitik-akademisierungswahn-gefaehrdet-berufliche-bildung/19665020.html
          if (data.page.flagStripeFolders){
            var partsUrl = url.split('/');
            url = '/' + partsUrl.slice(-2).join('/');
          }
          
          var urlAMP = data.page.url + url;
          if (typeof data.page.urlAMP === 'string'){
            urlAMP = data.page.urlAMP + url;
          }
          if (typeof data.page.urlAMP === 'object'){
            if (data.page.urlAMP.actionReplace){
              urlAMP = urlAMP.replace(data.page.urlAMP.actionReplace[0],data.page.urlAMP.actionReplace[1]);
            }
          }
          
          var urlAMPOrignal = urlAMP;
          
          if (data.dev && data.page.dev){
            urlAMP = urlAMP.replace(data.page.dev.actionReplace[0], data.page.dev.actionReplace[1]);
            //console.log('urlAMP', urlAMP);
          }
          
          
          var noAmp
          if (typeof data.page.flagAllAMP === 'undefined'){
            noAmp = data.page.flagAllAMP ||tester.test(urlAMPOrignal);  
          }
          
          
          
          links.articles.push({
            url: url,
            urlAMP: urlAMP,
            urlOriginal: data.page.url + url,
            //urlOriginal: urlOriginal,
            title: title || '',
            emoji: emojify.analyse(title),
            size: size,
            noAmp: noAmp,
            show: (data.debug && noAmp) || !noAmp
          });
        } else if (isValidList){
          links.lists.push({
            url: '/' + data.page.id + url,
            //urlOriginal: urlOriginal,
            title: title || ''
          }); 
        } else {
          links.errors.push({
            url: url,
            urlOriginal: urlOriginal,
            title: title || '',
            valid: isValid,
            validArticle: isValidArticle,
            validList: isValidList
          });
        }


      }
    }

  });
  return links;
}


var fetcher = {};

fetcher.get = function(data){
  var deferred = Q.defer();
    request(data.page.url + data.remoteUrl, function (error, response, body) {
      if (error){
        console.log('Error', error);
        deferred.reject(error);
      } else {
        
        
        deferred.resolve({
          'type': 'urllist',
          'links': parseBody(data, body)
        });
      }
   
  });
  return deferred.promise;
};

// let $ = cheerio.load('<h2 class="title">Hello world</h2>')
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

module.exports = fetcher;