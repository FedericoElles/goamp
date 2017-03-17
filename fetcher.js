let cheerio = require('cheerio')
var request = require('request');
var Q = require('q');


var fetcher = {};

fetcher.get = function(data){
  var deferred = Q.defer();
    request(data.page.url + data.remoteUrl, function (error, response, body) {
      if (error){
        deferred.reject(new Error(error));
      } else {
        let $ = cheerio.load(body);
        var links = [];
        var regArticle = new RegExp(data.page.validArticles, "g");
        var regList = new RegExp(data.page.validLists, "g");
        //console.log('regex', data.validArticles , regArticle);
        
        var dirUrlAdded = {};
        
        $('a').each(function(i, elem) {
         var isValidArticle = false;
          var isValidList = false;     
          var urlOriginal = $(this).attr('href');
          var url = '';
          
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
          
          if (url && typeof dirUrlAdded[url] === 'undefined'){
            dirUrlAdded[url] = true;
            links.push({
              url: url,
              urlOriginal: urlOriginal,
              title: $(this).attr('title') || $(this).attr('alt'),
              validArticle: isValidArticle,
              validList: isValidList
            });
          }
          
        });
        deferred.resolve({
          'type': 'urllist',
          'links': links
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