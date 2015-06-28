var assert = require("assert");
var chai = require("chai");
// var chaiAsPromised = require("chai-as-promised");

// chai.use(chaiAsPromised);

var cm = require('../certManager')

describe('certManager', function(){
	describe('cert loading w/ cache', function(){
		it('should be not null', function(){
			var content = cm.init('../ssl/azure.pem');
			console.log(content);
			assert.notequal(content, null);
		});
		// it('should be not undefined', function(){
		// 	var content = cm.init('../ssl/azure.pem');
		// 	assert.notequal(content, undefined);
		// });
		// it('is greater than 1', function(){
		// 	var content = cm.init('../ssl/azure.pem');
		// 	assert(length(content) > 0);
		// });
		
	});
});
