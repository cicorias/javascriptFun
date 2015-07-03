'option strict';

var fs = require('fs');
var items = [,];



module.exports.run = function(filename){
  var promise = new Promise(function (resolve, reject) {
    console.info('reading cert: ' + filename);
    fs.readFile(filename, function(err,res) {
      if (err) 
        reject(err);
      else 
        resolve(res);    
    }) 
  });
  return promise; 
}

