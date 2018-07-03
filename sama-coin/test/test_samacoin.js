var Samacoin = artifacts.require("Samacoin");

//console.log('test...');
contract("Samacoin",function(accounts){
	it("should transfer right token",function(){
		var token;
		var bal = 10**22;
		Samacoin.deployed()
		.then(function(instance){
			token = instance;
			return token.transfer(accounts[1],100);
		})
		.then(function(){
			return token.balanceOf.call(accounts[0]);
		})
		.then(function(result){
			assert.equal(result.toNumber(),bal,'accounts[0] balance is wrong');
			return token.balanceOf.call(accounts[1]);
		})
		.then(function(result){
			assert.equal(result.toNumber(),100,'accounts[1] balance is wrong');
		})
		.catch(e => {
			console.log(e);
		});
	});
});