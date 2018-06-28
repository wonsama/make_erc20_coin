var Samacoin = artifacts.require("./Samacoin.sol");
 
module.exports = function(deployer) {
	deployer.deploy(Samacoin);
};