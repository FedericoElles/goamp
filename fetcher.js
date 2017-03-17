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
        let $ = cheerio.load('body');
        deferred.resolve({
          'type': 'urllist'
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