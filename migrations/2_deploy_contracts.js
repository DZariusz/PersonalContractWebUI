let DZariusz = artifacts.require("DZariusz");

let debug = 1;


module.exports = function(deployer, network, accounts) {

    if( network === "mainnet" ) {
        throw "Halt. Sanity check. Not ready for deployment to mainnet. Manually remove this throw and try again.";
        console.log('WOW!!! MainNet deploying :)');
    }

    deployAddress = accounts[0];
    debug && console.log('deploying from:' + deployAddress);

    deployer.deploy(DZariusz, "Dariusz Zacharczuk", "http://dzariusz.com", {from: deployAddress});


};
