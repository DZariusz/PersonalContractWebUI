
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
const DzArtifacts = artifacts.require("./DZariusz.sol");
const asyncDZariusz = DZariuszUtil();

const constructors = {
    DZariusz: () => allArtifacts.DZariusz.new({gas: 6700000})
};




contract('DZariusz features', function(accounts) {

    let owner0, owner1, dz;
    let initialName = 'Dariusz Zacharczuk';
    let initialContact = 'http://dzariusz.com';

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




    describe('testing: DZariusz', function() {

        beforeEach("should deploy a new contract", function() {
            return DzArtifacts.new(initialName, initialContact)
                .then(function(instance){
                    dz = asyncDZariusz;
                    dz.setInstanceVar(instance);
                });
        });

        describe("initial name", function(){

            it("should have correct initial name", async function() {
                let v = await dz.name();
                assert.strictEqual(v, initialName);
            });

            it("should have correct initial contact", async function() {
                let v = await dz.contact();
                assert.strictEqual(v, initialContact);
            });

            it("should be possible to ask for name from any address", async function() {
                let v = await dz.name({ from: owner1 });
                assert.strictEqual(v, initialName);
            });

            it("should be possible to ask for contact from any address", async function() {
                let v = await dz.contact({ from: owner1 });
                assert.strictEqual(v, initialContact);
            });


        });




        describe("setName", function() {


            it("should not be possible to setName from not an owner", async function() {

                await dz.setName('John Smith', { from: owner1}, true);

            });

            it("should be possible to setName by an owner", async function() {

                await dz.setName('John Smith', { from: owner0}, false);

            });

        });


        describe("setContact", function() {


            it("should not be possible to setContact from not an owner", async function() {

                await dz.setContact('http://xxx.com', { from: owner1}, true);

            });

            it("should be possible to setContact by an owner", async function() {

                await dz.setContact('http://www.dzariusz.com', { from: owner0}, false);

            });

        });



    });



});

