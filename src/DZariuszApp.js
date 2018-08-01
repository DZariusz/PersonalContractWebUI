import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
//import {Link} from 'react-router'

import StoredValues from './components/StoredValues'
import NetworkInfo from './components/NetworkInfo'
import Footer from "./components/Footer";
import ManageValues from "./components/ManageValues";
import History from "./components/History";
import ErrorMsg from "./components/ErrorMsg";
import Top from "./components/Top";
import Intro from "./components/Intro";


import './App.css'

import AddressConfiguration from "./components/AddressConfiguration";
import {logExecution} from "./utils/logExecution";
import {getDZariuszInstance} from "./utils/getDZariuszInstance";
import {getPredefinedAddress, TESTRPC_ID} from './utils/variables'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'



const MAINNET_CREATIONBLOCK = 5997143
const ROPSTEN_CREATIONBLOCK = 3669768
const _CREATIONBLOCK = 1



function getCreationBlock(netId) {

    switch (netId) {
        case "1":
            return MAINNET_CREATIONBLOCK
        case "3":
            return ROPSTEN_CREATIONBLOCK
        default:
            return _CREATIONBLOCK
    }
}


class DZariuszApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            errorMsg: '',
            address: '',
            instance: null,

            netId: false,
            names: [],
            contacts: [],
            owners: [],

            nameEvent: null,
            contactEvent: null,
            ownerEvent: null,

            updateOnEvent: 0,
            nonce: false
        }

        this.setupWeb3 =  this.setupWeb3.bind(this)
        this.handleAddress =  this.handleAddress.bind(this)
        this.handleNet =  this.handleNet.bind(this)

        this.logSetName = this.logSetName.bind(this);
        this.logSetContact = this.logSetContact.bind(this);
        this.ownershipTransferred = this.ownershipTransferred.bind(this);
        this.initListening = this.initListening.bind(this);
        this.signalEvent = this.signalEvent.bind(this);
        this.setDefaultAddressOnce = this.setDefaultAddressOnce.bind(this);
    }

    componentWillMount() {

        this.setupWeb3()
    }


    handleNet(netId) {

        logExecution('handleNet(netId)')

        if (this.state.netId === netId) return false;

        logExecution('handleNet(netId): '+ netId)

        this.setState({
            netId
        }, () => { this.setDefaultAddressOnce() })

        return true

    }

    setDefaultAddressOnce() {

        if (this.state.nonce) return;

        logExecution('setDefaultAddressOnce(): ' + this.state.netId)

        let a = getPredefinedAddress(this.state.netId)

        this.handleAddress(a ? a : getPredefinedAddress(TESTRPC_ID))
        this.setState({
            nonce: true
        })


    }



    async handleAddress(addr) {

        logExecution('handleAddress(addr): '+ addr)

        if (this.state.address === addr) return;



        //if not empty
        if (addr) {


            let {err, instance} = await getDZariuszInstance(this.state.web3, addr);

            if (!err && instance) {

                this.setState({
                    address: instance.address,
                    instance: instance,
                    errorMsg: ''

                }, () => {
                    this.initListening()
                    logExecution('Address changed to: '+ this.state.address)
                })

            } else {
                this.setState({
                    address: '',
                    instance: null,
                    errorMsg: 'Address '+ addr +' is not valid contract address'
                });
            }


        } else {

            //probably reset the address

            this.setState({
                address: addr,
                instance: null,
                errorMsg: '',
            }, () => {
                logExecution('Address reset to: '+ this.state.address)
            })
        }
    }

    setupWeb3 () {

        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
        getWeb3
            .then(results => {

                this.setState({
                    web3: results.web3
                }, ()=>{
                    logExecution('WEB3 is set!')
                })

            })
            .catch((e) => {
                console.warn('Error finding web3.', e)
                this.setState({errorMsg: 'Error finding web3.' + e.toString()})
            })
    }





    initListening() {

        logExecution('initListening()')

        if (!this.state.instance) return;

        let args = {
            fromBlock: getCreationBlock(this.state.netId),
            toBlock: 'latest'
        }

        this.setState({
            nameEvent: this.state.instance.LogSetName({}, args),
            contactEvent: this.state.instance.LogSetContact({}, args),
            ownerEvent: this.state.instance.OwnershipTransferred({}, args)
        }, () => {

            this.state.nameEvent.watch( this.logSetName )
            this.state.contactEvent.watch( this.logSetContact )
            this.state.ownerEvent.watch( this.ownershipTransferred )

        })


    }

    logSetName(err, response) {

        logExecution('logSetName(err, response)')

        if (err) return;

        let arr = this.state.names
        arr.unshift({
            name: response.args.newName,
            blockNumber: response.blockNumber
        })

        this.setState({names: arr}, () => {this.signalEvent()})

        logExecution('logSetName:', response)
    }


    logSetContact(err, response) {

        logExecution('logSetContact(err, response)')

        if (err) return;

        let arr = this.state.contacts
        arr.unshift({
            contact: response.args.newContact,
            blockNumber: response.blockNumber
        })

        this.setState({contacts: arr}, () => {this.signalEvent()})

        logExecution('logSetContact: ', response)
    }

    ownershipTransferred(err, response) {

        logExecution('ownershipTransferred(err, response)')

        if (err) return;

        let arr = this.state.owners
        arr.unshift({
            ...response.args,
            blockNumber: response.blockNumber
        })

        this.setState({owners: arr}, () => {this.signalEvent()})

        logExecution('ownershipTransferred: ', response)
    }


    signalEvent() {
        this.setState({
            updateOnEvent: (this.state.updateOnEvent + 1) % 2
        })
    }


    render() {


        return (
            <MuiThemeProvider theme={new createMuiTheme()}>
                <div className="App">

                    <Top netId={this.state.netId} />


                    <main className="container">

                        <ErrorMsg msg={this.state.errorMsg} />

                        <Intro />

                        <NetworkInfo
                            web3={this.state.web3}
                            netId={this.state.netId}
                            address={this.state.address}
                            handleNet={this.handleNet}  />

                        <AddressConfiguration
                            web3={this.state.web3}
                            netId={this.state.netId}
                            address={this.state.address}
                            handleAddress={this.handleAddress} />

                        <StoredValues
                            address={this.state.address}
                            instance={this.state.instance}
                            update={this.state.updateOnEvent} />

                        <ManageValues
                            web3={this.state.web3}
                            instance={this.state.instance}  />

                        <History
                            names={this.state.names}
                            contacts={this.state.contacts}
                            owners={this.state.owners} />


                    </main>

                    <Footer/>

                </div>
            </MuiThemeProvider>
        );
    }
}

export default DZariuszApp
