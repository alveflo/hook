var assert = require('chai').assert;
var hook = require('../hook/hook.js');

describe("Chains", function() {
  it("should return 'foo.json'", function() {
    var x = hook().on('/foo', 'foo.json');
    assert.equal('foo.json', x.paths['/foo'].file)
  });
});
