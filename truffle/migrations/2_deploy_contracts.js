var Election = artifacts.require("./Election.sol");
var Candidates = require('../candidates.json').names;
module.exports = function(deployer) {
  deployer.deploy(Election, Candidates, {gas: 6700000});
};
