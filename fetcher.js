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
        var regArticle = new RegExp(data.validArticles, "i");
        var regList = new RegExp(data.validLists, "i");
        
        $('a').each(function(i, elem) {
          var url = $(this).attr('href');
          
          //check if url is valid article - validArticles
          
          links.push({
            url: url,
            title: $(this).attr('title') || $(this).attr('alt'),
            validArticle: false,
            validList: false
          });
          
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