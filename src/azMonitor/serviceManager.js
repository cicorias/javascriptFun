/// TODO: add init stuff for subscription, ssl path, header version?
'use strict';

var https = require('https'),                  // Module for https
    fs =    require('fs'),                     // Required to read certs and keys
    xml2js = require('xml2js');
    
var parser = new xml2js.Parser();
    
var options = {
    key:   fs.readFileSync('ssl/azure.pem'),  // Secret client key - here pem contains both
    cert:  fs.readFileSync('ssl/azure.pem'),  // Public client key - here pem contains both
    //pfx: fs.readFileSync('ssl/azure.pfx'),
    //passphrase: 'password',
    // rejectUnauthorized: false,              // Used for self signed server
    host: "management.core.windows.net",                    // Server hostname
    //path: "/subid/services/hostedservices/jettestarmpaas/deploymentslots/production",
    path: "/subid/services/hostedservices",
    port: 443,                                  // Server port
    headers: { 'x-ms-version' : '2012-03-01'}
};

var callback = function(response) {
  var str = '';    
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    parser.parseString(str, function (err, result) {
        console.log(result);
        console.log(result.HostedServices.HostedService);
        console.log('Done');
    });
  });
};

module.exports.callServer = function(subscriptionId){
  console.log('making server call');
  options.path = options.path.replace('subid', subscriptionId);
  console.log('calling: '  + options.host + options.path);
  https.request(options, callback).end();
};
