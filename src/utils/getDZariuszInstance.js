import {isValidWeb3} from "./isValidWeb3";
import {isAddress} from "./isAddress";
import DZariuszContract from '../../build/contracts/DZariusz'
import {logExecution} from "./logExecution";
import {TESTRPC_ADDR} from "./variables";

const Promise = require('bluebird');

/**
 *
 * @param web3
 * @param addr  is -1 then we check is deployed
 * @returns {*|Promise<T>}
 */
export const getDZariuszInstance = async (web3, addr) => {

    let err = '', instance = false

    if (!isValidWeb3(web3)) return {err: 'Web3 is invalid', instance};
    if (addr !== TESTRPC_ADDR && !isAddress(addr)) return {err: 'Address '+addr+' is invalid', instance};;


    const contract = require('truffle-contract')
    const dzariusz = contract(DZariuszContract)
    dzariusz.setProvider(web3.currentProvider)


    if (addr === TESTRPC_ADDR) {

        logExecution('getDZariuszInstance.deployed()')

        try {
            instance = await dzariusz.deployed().catch(e => {
                err = e.message
            });

        } catch(e) {
            console.log('getDZariuszInstance.deployed() ERROR:', e)
            err = e.message;
        }

    } else {

        logExecution('getDZariuszInstance.at()')

        try {
            /**
             *
             * - when address is valid and contract exists and we use at(...).catch - then we got exception, because catch not exists
             * - when we remove catch and inclide the commadin in try - catch, and we provide wrond address, then we do not catch promise exception :/
             * - when I do this try { .at().then().catch() } and there will be some contract at the address, we do not get error
             */
            instance = await dzariusz.at(addr)
                .then(result => {
                    return result
                })
                .catch(e => {
                    err = e.message
                    return false
                }); // */

        } catch(e) {
            console.log('getDZariuszInstance.at() ERROR:', e)
            err = e.message
        }

    }

    return {err, instance}

}


export const getAccount = async (web3) => {


    if (typeof web3.eth.getAccountsPromise === "undefined") {
        Promise.promisifyAll(web3.eth, { suffix: "Promise" });
    }


    if (!isValidWeb3(web3)) return false;


    // Get accounts.
    let accounts = await web3.eth.getAccountsPromise();

    console.log(accounts);
    if (accounts.length === 0) return false;

    return accounts[0];

}

