"use strict";


const asyncOwnable = require("./asyncOwnable.js");


function Contract() {


    let app = {};
    /// @dev this must be set only once, in child contract
    app.__proto__ = asyncOwnable();

    /**
     * @param _name - (required) parametr required by contract
     * @param _txAttr - (optional) object with transaction parameters, use it, if you don't want default values.
     * This parameter should be always present as one of function parameters.
     * @param _expectThrow - (optional) bool value, set it to true, when transaction should throw and not executed
     * This parameter should be always present as one of function parameters.
     */
    app.setName = async function (_name, _txAttr, _expectThrow) {


        /// @dev make sure, we have transaction attributes
        _txAttr = this.getTxAttr(_txAttr);

        /// @dev create action command
        let action = () => this.instance.setName(_name, _txAttr);

        /// @dev run `executeAction` - pay attention on additional attributes like: logCount, eventName, expectThrow
        /// do not create this variable globally
        let results = await this.executeAction(action, _txAttr, 1, 'LogSetName', _expectThrow);

        /// @dev perform tests
        if (!_expectThrow) {
            assert.strictEqual(results.newName, _name, 'invalid new name');

            let tmp = await this.name();
            assert.strictEqual(_name, tmp.toString(10), 'invalid new name');
        }

        return results;
    }

    /// @dev same as setName
    app.setContact = async function (_contact, _txAttr, _expectThrow) {


        _txAttr = this.getTxAttr(_txAttr);

        let action = () => this.instance.setContact(_contact, _txAttr);

        let results = await this.executeAction(action, _txAttr, 1, 'LogSetContact', _expectThrow);

        /// @dev perform tests
        if (!_expectThrow) {
            assert.strictEqual(results.newContact, _contact, 'invalid new contact');

            let tmp = await this.contact();
            assert.strictEqual(_contact, tmp.toString(10), 'invalid new contact');
        }

        return results;
    }


    /// @dev we can also provide non transaction methods, for easy access
    app.name = async function () {

        return await this.instance.name();

    }

    /// @dev we can also provide non transaction methods, for easy access
    app.contact = async function () {

        return await this.instance.contact();

    }


    return app;

}



module.exports = Contract;