'use strict';

console.log('starting...');

var fs = require('fs'),
    Promise = require("bluebird"),
    xml2js = require('xml2js');

var sm = require('./serviceManager'),
    cm = require('./certManager');

var config = require('./privateConfig.json');

var parser = new xml2js.Parser();

setInterval(getDeployment, config.timeout);

function getServices(){
    cm.run(config.pemFile)
        .then(function(certdata){
            sm.getServices(config.subscriptionId, certdata )
            .then(function(data2){
                var body = data2().body;

                parser.parseString(body, function(err, result){
                    if (err) 
                        throw err;
                        
                    console.info('parsing xml done');
                    //console.log(result);    
                
                });
            }).catch(function(e){
                console.error("error on sm.run: "+ e);
            });
        }).catch( function(e) {
            console.error("error on cm run: " + e);
        });
}


function getDeployment(deploymentName){
    cm.run(config.pemFile)
        .then(function(certdata){
            console.log("checking on deployment for : " + config.deploymentName);
            sm.getDeployment(config.subscriptionId, certdata, config.deploymentName )
            .then(function(data2){
                var body = data2().body;

                parser.parseString(body, function(err, result){
                    if (err) 
                        throw err;
                        
                    console.info('parsing xml done');
                    //console.log(result);    
                
                });
            }).catch(function(e){
                console.error("error on sm.run: "+ e);
            });
        }).catch( function(e) {
            console.error("error on cm run: " + e);
        });
}

