"use strict";


const asyncExecute = require("../utils/asyncExecute.js");

/**
 * @dev This test contract should reflect all public functions of contract that it represents.
 * It should also has tests, that cover every case that is possible to check here.
 * When we execute a method, we should be sure, that all basic checks are done and we need to focus only on test,
 * that depends on some other external (not accessible from inside this methods) data.
 *
 * @notice this is workign example with comments, all other contracts should follow this scheme.
 *
 *
 * When you have parent test-contract, then after you cover all child test-contracts, you can create parent in this way:
 *
 * import { Extend } from "../utils/Extend.js";
 *
 *
 * function TBO() {
    var tbo = {};

    tbo.__proto__ = asyncOwnable();
    tbo = Extend(tbo, asyncPausable());
    tbo = Extend(tbo, asyncRegulated());
    return tbo;
 * }
 *
 * now, when TBO() has all children, you create parent test-contract:
 *
 * function TollBoothOperator() {

    var tbo = {};
    tbo.__proto__ = TBO();
    ...
 *
 *
 *
 */
function Contract() {


    let app = {};
    /// @dev this must be set only once, in child contract
    app.__proto__ = asyncExecute();

    /**
     * @param _newOwner - (required) parametr required by contract
     * @param _txAttr - (optional) object with transaction parameters, use it, if you don't want default values.
     * This parameter should be always present as one of function parameters.
     * @param _expectThrow - (optional) bool value, set it to true, when transaction should throw and not executed
     * This parameter should be always present as one of function parameters.
     */
    app.transferOwnership = async function (_newOwner, _txAttr, _expectThrow) {



        /// @dev make sure, we have transaction attributes
        _txAttr = this.getTxAttr(_txAttr);

        /// @dev create action command
        let action = () => this.instance.newOwner(_newOwner, _txAttr);

        /// @dev run `executeAction` - pay attention on additional attributes like: logCount, eventName, expectThrow
        /// do not create this variable globally
        let results = await this.executeAction(action, _txAttr, 1, 'OwnershipTransferred', _expectThrow);

        /// @dev perform tests
        if (!_expectThrow) {
            assert.strictEqual(results.previousOwner, _txAttr.from, 'invalid previous owner `setOwner`');
            assert.strictEqual(results.newOwner, _newOwner, 'invalid new owner `setOwner`');
            assert.notEqual(results.previousOwner, results.newOwner, 'there should be different values');

            this.setFromVar(_newOwner);

            let tmp = await this.owner();
            assert.strictEqual(_newOwner, tmp, 'invalid new owner');
        }

        return results;
    }


    app.renounceOwnership = async function (_newOwner, _txAttr, _expectThrow) {


        /// @dev make sure, we have transaction attributes
        _txAttr = this.getTxAttr(_txAttr);

        /// @dev create action command
        let action = () => this.instance.renounceOwnership(_newOwner, _txAttr);

        /// @dev run `executeAction` - pay attention on additional attributes like: logCount, eventName, expectThrow
        /// do not create this variable globally
        let results = await this.executeAction(action, _txAttr, 1, 'OwnershipRenounced', _expectThrow);

        /// @dev perform tests
        if (!_expectThrow) {
            assert.strictEqual(results.previousOwner, _txAttr.from, 'invalid previous owner `setOwner`');

            this.setFromVar(_newOwner);

            let tmp = await this.owner();
            assert.strictEqual(0, tmp, 'invalid new owner');
        }

        return results;
    }

    /// @dev we can also provide non transaction methods, for easy access
    app.owner = async function (_txAttr, _expectThrow) {

        /// @dev perform tests
        if (_expectThrow) {

            let action = () => this.instance.owner(this.getTxAttr(_txAttr));

            /// @dev run `executeAction` - pay attention on additional attributes like: logCount, eventName, expectThrow
            return await this.executeAction(action, _txAttr, false, '', _expectThrow);


        } else {
            return await this.instance.owner(this.getTxAttr(_txAttr));
        }
    }


    return app;

}



module.exports = Contract;