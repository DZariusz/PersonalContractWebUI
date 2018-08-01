import React, { Component } from 'react'
import ErrorMsg from "./ErrorMsg";
import {isAddress} from '../utils/isAddress'
import {isValidWeb3} from "../utils/isValidWeb3";
import {logExecution} from "../utils/logExecution";
import AddressForm from './AddressForm'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {getEtherscanUrl} from "../utils/variables";


class AddressConfiguration extends Component {


    constructor(props) {
        super(props)

        this.state = {
            error: ''
        }


        this.submitAddress = this.submitAddress.bind(this)
        this.resetAddress = this.resetAddress.bind(this)
        this.canRender = this.canRender.bind(this)

    }

    resetAddress() {
        this.props.handleAddress('')
    }

    submitAddress(evn) {

        logExecution('submitAddress(evn)');


        let addr = evn.target.value;
        if (!isAddress(addr)) return;

        this.props.handleAddress(addr)
    }


    canRender() {
        return isValidWeb3(this.props.web3) && this.props.netId
    }


    get renderAddress() {

        let link = getEtherscanUrl(this.props.address, this.props.netId)

        return (
            <div className="renderAddress">
                <Typography component="div">Contract deployed at: &nbsp;
                    <Chip label={this.props.address} onDelete={this.resetAddress} className="MuiChip" />
                    {link ? <Button variant="outlined"  href={link} target="_blank" >See on etherscan.io</Button> : null}
                </Typography>
            </div>
        )
    }


    render() {

        logExecution('AddressConfiguration.render()')

        if (!this.canRender()) return null;


        return (
            <Paper className="MuiPaper AddressConfiguration" >

                <Typography variant="headline" component="h2" paragraph>Contract Configuration</Typography>

                <ErrorMsg msg={this.state.error} />

                { this.props.address ? this.renderAddress : (
                    <AddressForm submitAddress={this.submitAddress} handleAddress={this.props.handleAddress}  />
                )}

            </Paper>
        );
    }
}



export default (AddressConfiguration)
