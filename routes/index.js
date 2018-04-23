var express = require('express');
var async = require('async');
var router = express.Router();
var config = require('../config.js');
var contract = require('truffle-contract');
var electionInterface = require('../truffle/build/contracts/Election.json');
var candidateList = require('../truffle/candidates.json');
let candidates = candidateList.names;

var Election = contract(electionInterface);
Election.setProvider(config.web3.currentProvider);


// config.web3.eth.X

/* GET home page. */
router.get('/', function(req, res, next) {

    // Election.deployed().then(function(instance) {
    //      instance.castVote("Alan Turing", {gas: 140000, from: config.web3.eth.accounts[0]}).then(function() {
    //        comp.refreshCounts();
    //      });
    //    });

    res.render('index', { title: 'Express' });
});

router.post('/castVote', function(req, res, next) {

    let candidate = req.body.name;
    // console.log(candidate);

    Election.deployed().then(function(instance) {
        // console.log(instance);
        instance.castVote(candidate, { gas: 140000, from: config.web3.eth.accounts[0] }).then(function() {
            

        	// Resp
        	Election.deployed().then(function(instance) {
		        async.map(candidates, function(name, callback) {
		            return instance.getVoteCount.call(name).then(function(count) {
		                return callback(null, { name: name, count: count.toNumber() });
		            }).catch(error => {
		                console.log(error)
		            });
		        }, function(err, resp) {
		            console.log(resp);
		            res.send(resp);
		            // if (res) comp.setState({results: res, names: res.map((candidate)=>{
		            //   return candidate.name;
		            // })});
		        });
		    }).catch(error => {
		        console.log(error)
		    });


            // res.send("Vote Casted for" + candidate);
            // comp.refreshCounts();
        }).catch(error => {
            console.log(error)
        });
    }).catch(error => {
        console.log(error)
    });

});

router.get('/getVoteCount', function(req, res, next) {

	var accounts = config.web3.eth.accounts;
	console.log(accounts);

	// var number = config.web3.eth.blockNumber;
	// console.log(number);

	// var info = config.web3.eth.getBlock(25);
	// console.log(info);

	var transaction = config.web3.eth.getTransactionFromBlock('0x1d1c46b1bdd44f466f6bb51d0fb560fe130d5e81fd6e74735a7c7ac97ac62adb', 0);
	console.log(transaction); // see web3.eth.getTransaction

	var str = config.web3.toAscii('0x3efafb6e54696d204265726e657273204c65650000000000000000000000000000000000');
	console.log(str);

    Election.deployed().then(function(instance) {
    	// console.log(instance);
        async.map(candidates, function(name, callback) {
            return instance.getVoteCount.call(name).then(function(count) {
                return callback(null, { name: name, count: count.toNumber() });
            }).catch(error => {
                console.log(error)
            });
        }, function(err, resp) {
            // console.log(resp);
            res.send(resp);
            // if (res) comp.setState({results: res, names: res.map((candidate)=>{
            //   return candidate.name;
            // })});
        });
    }).catch(error => {
        console.log(error)
    });


});


module.exports = router;