/// TODO: add init stuff for subscription, ssl path, header version?
'use strict';

var https = require('https'),                  // Module for https
    fs =    require('fs'),                    // Required to read certs and keys
    Promise = require("bluebird");
    
var config = require('./privateConfig.json');

var options = require('./options.json');

var prequest = Promise.method(function(subscriptionId, cert){
    options.path = options.path.replace('subid', subscriptionId);
    options.key = cert;
    options.cert = cert;
    
    return new Promise(function(resolve,reject){ 
         var request = https.request(options, function(response){
             
            console.info('setup result object');
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
            };
            response.on("data", function(chunk){
                console.info('received data chunk');
                result.body += chunk;
            });
            response.on("end", function(){
                console.info("host: " + options.host);
                console.info("azure service call status: " + result.httpStatusCode);
                resolve(function(){ return result;});
            });
         });
         
         request.on("error",function(error){
             console.error("failed");
             reject(error);
         });
         
         request.end();
    });
});
  
module.exports.run = prequest;  
  
  

