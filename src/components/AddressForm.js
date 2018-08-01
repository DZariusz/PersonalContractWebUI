import React, { Component } from 'react'
import ErrorMsg from "./ErrorMsg";
import {getPredefinedAddress, getSimpleNetName, MAINNET_ID, ROPSTEN_ID, TESTRPC_ID} from "../utils/variables";


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import {withStyles} from "@material-ui/core/styles/index";




const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        width: 400,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    }
});


class AddressForm extends Component {


    constructor(props) {
        super(props)


        this.handlePredefinedAddress = this.handlePredefinedAddress.bind(this)

    }

    handlePredefinedAddress(evn) {
        evn.preventDefault()

        this.props.handleAddress(getPredefinedAddress(evn.target.value));
    }


    render() {

        const {classes} = this.props;

        return (
            <form name="address_form" noValidate autoComplete="on">

                <ErrorMsg msg="Contract is not deployed or can't be found automatically. Please provide address."/>

                <TextField
                    id="address"
                    label="Contract address"
                    className={classes.textField}
                    value={this.props.address}
                    onChange={this.props.submitAddress}
                    margin="normal"
                />


                <Typography component="h3" paragraph>Or you can choose from predefined addresses below:</Typography>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-helper">Address</InputLabel>
                    <NativeSelect
                        onChange={this.handlePredefinedAddress}
                        input={<Input name="address_helper" id="age-native-helper" />}
                    >
                        <option value="" />
                        <option value={MAINNET_ID}>{getSimpleNetName(MAINNET_ID)}</option>
                        <option value={ROPSTEN_ID}>{getSimpleNetName(ROPSTEN_ID)}</option>
                        <option value={TESTRPC_ID}>{getSimpleNetName(TESTRPC_ID)}</option>
                    </NativeSelect>
                    <FormHelperText>choose the network</FormHelperText>
                </FormControl>


            </form>
        )
    }
}


export default withStyles(styles)(AddressForm)
