/// TODO: add init stuff for subscription, ssl path, header version?
'use strict';

var https = require('https'),                  // Module for https
    fs =    require('fs'),                    // Required to read certs and keys
    Promise = require("bluebird");
    
var config = require('./privateConfig.json');

var allServicesConfig = require('./options.json').allServices;
var deploymentConfig = require('./options.json').deployment;

var allConfig = require('./options.json');

var services = Promise.method(function(subscriptionId, cert){
    allServicesConfig.path = allServicesConfig.path.replace('subid', subscriptionId);
    allServicesConfig.key = cert;
    allServicesConfig.cert = cert;
    
    return new Promise(function(resolve,reject){ 
         var request = https.request(allServicesConfig, function(response){
             
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
                console.info("host: " + allServicesConfig.host);
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
  
module.exports.getServices = services;  
  
  
var deployment = Promise.method(function(subscriptionId, cert, deploymentName){
    deploymentConfig.path = deploymentConfig.path.replace('subid', subscriptionId);
    deploymentConfig.path = deploymentConfig.path.replace('svcname', deploymentName);
    deploymentConfig.key = cert;
    deploymentConfig.cert = cert;
    
    /// TODO: refactor as the following is clipboard inheritence
    return new Promise(function(resolve,reject){ 
         var request = https.request(deploymentConfig, function(response){
             
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
                console.info("host: " + allServicesConfig.host);
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
  
module.exports.getDeployment = deployment;  
  

