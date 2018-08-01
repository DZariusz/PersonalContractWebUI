
// require for async
require("babel-register");
require("babel-polyfill");



//when true all console messages are displayed
let debug = false;


const Promise = require('bluebird');

if (typeof web3.eth.getAccountsPromise === "undefined") {
    Promise.promisifyAll(web3.eth, { suffix: "Promise" });
}


const createAddressUtil = require("./utils/createAddress");
const createAddress = createAddressUtil();




const DZariuszUtil = require("./contracts/asyncDZariusz");

const allArtifacts = {
    DZariusz: artifacts.require("./DZariusz.sol")
};

const allAsyncContracts = {
    DZariusz: DZariuszUtil()
};

const constructors = {
    DZariusz: () => allArtifacts.DZariusz.new('a', 'b', {gas: 6700000})
};




contract('Owned inheritance', function(accounts) {

    let owner0, owner1, ownable;
    const addressZero = createAddress.fromString('0');

    before("should prepare", async function() {

        assert.isAtLeast(accounts.length, 2);
        owner0 = accounts[0];
        owner1 = accounts[1];

        web3.eth.getBalancePromise(owner0)
            .then(balance => assert.isAtLeast(web3.fromWei(balance).toNumber(), 10));

        let block = await web3.eth.getBlockPromise("latest");
        assert.isAbove(block.gasLimit, 6500000, "Gas limit to low");
    });


    Object.keys(constructors).forEach(name => {

        describe('testing: ' + name, function() {

            beforeEach("should deploy a new " + name, function() {
                return constructors[name]()
                    .then(function(instance){
                        ownable = allAsyncContracts[name];
                        ownable.setInstanceVar(instance);
                    });
            });

            describe("owner", function(){

                it("should have correct initial value", async function() {
                    let o = await ownable.owner();
                    assert.strictEqual(o, owner0);
                });

                it("should be possible to ask for owner from any address", async function() {
                    let o = await ownable.owner({ from: owner1 });
                    assert.strictEqual(o, owner0);
                });

                it("should be possible to send a transaction to owner", function() {
                    return ownable.instance.owner.sendTransaction({ from: owner1 })
                        .then(tx => web3.eth.getTransactionReceiptMined(tx))
                        .then(receipt => assert.strictEqual(receipt.logs.length, 0))
                        .then(() => ownable.owner())
                        .then(owner => assert.strictEqual(owner, owner0));
                });

                it("should not be possible to send a transaction with value to owner", async function() {

                    await ownable.owner({ from: owner1, value: 1 }, true);

                });

            });

            describe("newOwner", function() {

                it("should not be possible to set owner if asking from wrong owner", async function() {
                    await ownable.newOwner(owner1, { from: owner1 }, true);
                });

                it("should not be possible to set owner if to 0", async function() {
                    await ownable.newOwner(addressZero, { from: owner0 }, true);

                });

                it("should not be possible to set owner if pass value", async function() {
                    await ownable.newOwner(owner1, { from: owner0, value: 1 }, true);
                });

                it("should be possible to set owner", async function() {
                    await ownable.newOwner(owner1, { from: owner0});
                });

            });

            describe("newOwner a second time", function() {

                beforeEach("should set owner once", async function() {
                    await ownable.newOwner(owner1, { from: owner0});
                });

                it("should not be possible to set owner if asking from wrong one", async function() {
                    await ownable.newOwner(owner0, { from: owner0 }, true);
                });

                it("should be possible to set owner again", async function() {

                    await ownable.newOwner(owner0, { from: owner1 });

                });

            });

        });

    });

});

