const models = require('../models');
const chai = require('chai');
const expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);


describe('Testing suite capabilities', function () {
  it('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  });
});


describe('setTimeout', function () {
	it('confirms setTimeout\'s timer accuracy', function (done) {
	  var start = new Date();
	  setTimeout(function () {
	    var duration = new Date() - start;
	    expect(duration).to.be.closeTo(1000, 50);
	    done();
	  }, 1000);
	});
});


describe('forEach', function () {
	it('counts how many times a function has been called', function () {
	 	//var array = [1,2,3,4];
	 	var addOneFunction = function (num){
	 		 num + 1;
	 	}
	 	addOneFunction = chai.spy(addOneFunction);


	 	[1,2,3,4].forEach(addOneFunction)

	 	expect(addOneFunction).to.have.been.called.exactly(4);

	});
});


