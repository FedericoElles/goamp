var Q = require('q');
const https = require('https');
var crypto = require('crypto');


var blackList = {}; 


var tester = {};


tester.test = function(uri){
  var hash = crypto.createHash('md5').update(uri).digest("hex");
  if (typeof blackList[hash] !== 'undefined'){
    return !blackList[hash];
  } else {
    tester.get(uri);
    return false;
  }
};


tester.get = function(uri){
  var deferred = Q.defer();
  
  //var uri = data.page.urlAMP + data.remoteUrl;
  
  https.get(uri, (res) => {
    var body = '';
    
    res.on('data', (d) => {
      //process.stdout.write(d);
    });
    
    res.on('end', (d) => {
        var result = res.statusCode===200; 
        var hash = crypto.createHash('md5').update(uri).digest("hex");
      
        if (typeof blackList[hash] === 'undefined'){
          blackList[hash] = result;
        }
      
        deferred.resolve({
          'isamp': result,
          //'body': body.length,
          'status': res.statusCode,
          'uri': uri,
          'hash': hash
        });      
    });
           
  }).on('error', (e) => {
    deferred.reject(e);
  });
  
  return deferred.promise;
};


module.exports = tester;