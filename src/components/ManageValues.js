import React, { Component } from 'react'
import {isValidWeb3} from "../utils/isValidWeb3";
import {logExecution} from "../utils/logExecution";
import ErrorMsg from "./ErrorMsg";
import {getAccount} from "../utils/getDZariuszInstance";


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import WaitIcon from '@material-ui/icons/HourglassEmpty';
import ErrorIcon from '@material-ui/icons/ReportProblem';


const STATUSES = {
    default: 0,
    error: -1,
    waiting: 1,
    done: 2
}

const STYLES ={

    textField: {
        margin: '0 10px 10px',
        width: 200,
    },
    formControl: {
        margin: 10,
    }
};


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}



function FormTemplate(props) {


    let icon


    switch (props.submitStatus[props.inputId] ? props.submitStatus[props.inputId] : null) {
        case STATUSES.error: icon = <ErrorIcon/>
            break;
        case STATUSES.waiting: icon = <WaitIcon/>
            break;
        case STATUSES.done: icon = <DoneIcon/>
            break;
        default: icon = <SaveIcon/>

    }

    return (
        <form onSubmit={props.onSubmit} >

            <TextField
                id={props.inputId}
                name={props.inputName}
                label={props.inputLabel}
                style={STYLES.textField}
                margin="normal"
                disabled={props.disabled}
                error={props.success === false}
                onChange={props.handleOnChange}
            />

            <Button type="submit" disabled={props.disabled} >
                Save
                &nbsp;
                {icon}
            </Button>
        </form>
    )
}


class ManageValues extends Component {

    constructor(props) {
        super(props)

        this.state = {
            disabled: false,
            error: '',
            account: null,
            tab: 0,
            submitStatus: []    //input_id => 0:default 1:waitting 2:saved -1:error
        }

        this.canRender = this.canRender.bind(this)
        this.submitName = this.submitName.bind(this)
        this.submitContact = this.submitContact.bind(this)
        this.newOwner = this.newOwner.bind(this)
        this.formsOFF = this.formsOFF.bind(this)
        this.formsON = this.formsON.bind(this)
        this.canSubmitForm = this.canSubmitForm.bind(this)
        this.executeSubmit = this.executeSubmit.bind(this)
    }


    formsOFF() {
        this.setState({disabled: true})
    }

    formsON(input) {
        this.setState({disabled: false})
        input.value = '';
    }


    async canSubmitForm(targetInput) {

        let submitStatus = this.state.submitStatus;
        submitStatus[targetInput.id] = STATUSES.error

        if (!isValidWeb3(this.props.web3) || !this.props.instance) {
            this.setState({
                error: 'Web3/instance not available',
                submitStatus
            })
            return false;
        }

        if (typeof targetInput === 'undefined') {
            this.setState({
                error: 'Input field not found',
                submitStatus
            })
            return false
        }


        let account = await getAccount(this.props.web3);
        if (!account) {
            this.setState({
                error: 'No Account found - unlock your wallet',
                submitStatus
            })
            return
        }

        return account;
    }


    async executeSubmit(method, targetInput) {

        let account = await this.canSubmitForm(targetInput)
        if (!account) return;

        let submitStatus = this.state.submitStatus;


        try {
            this.formsOFF()
            submitStatus[targetInput.id] = STATUSES.waiting
            this.setState({submitStatus})

            await this.props.instance[method](targetInput.value, {from: account})

            submitStatus[targetInput.id] = STATUSES.done

            this.setState({
                error: '',
                submitStatus
            })

        } catch (e) {
            submitStatus[targetInput.id] = STATUSES.error
            this.setState({
                error: e.message,
                submitStatus
            })
        }

        this.formsON(targetInput)
    }

    async submitName(evn) {


        let targetInput = evn.target.name
        console.log(targetInput)
        evn.preventDefault();

        logExecution('submitForm(evn)')


        await this.executeSubmit('setName', targetInput)

    }

    async submitContact(evn) {

        let targetInput = evn.target.contact
        evn.preventDefault();

        logExecution('submitForm(evn)')

        await this.executeSubmit('setContact', targetInput)

    }

    async newOwner(evn) {

        let targetInput = evn.target.owner
        evn.preventDefault();

        logExecution('submitForm(evn)')

        await this.executeSubmit('transferOwnership', targetInput)

    }

    handleTabChange = (event, value) => {
        this.setState({tab: value});
    }
    handleChangeIndex = (index) => {
        this.setState({tab: index});
    }
    handleOnChange = (event) => {
        let submitStatus = this.state.submitStatus

        if (submitStatus[event.target.id] === STATUSES.default) return;
        submitStatus[event.target.id] = STATUSES.default

        this.setState({
            submitStatus
        })
    }

    canRender() {

        return !!this.props.instance;
    }

    render() {

        if (!this.canRender()) return null;

        return (
            <Paper className="MuiPaper" id="ManageValues">
                <Typography variant="headline" component="h2" paragraph>Manage Stored Values</Typography>

                <ErrorMsg msg={this.state.error}/>

                <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                >
                    <Tab label="Change Name" />
                    <Tab label="Change Contact" />
                    <Tab label="Change Owner" />
                </Tabs>

                <SwipeableViews
                    index={this.state.tab}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer >
                        <FormTemplate
                            onSubmit={this.submitName}
                            inputId="contract_name"
                            inputName="name"
                            inputLabel="New Name"
                            disabled={this.state.disabled}
                            submitStatus={this.state.submitStatus}
                            handleOnChange={this.handleOnChange}
                        />
                    </TabContainer>

                    <TabContainer >
                        <FormTemplate
                            onSubmit={this.submitContact}
                            inputId="contract_contact"
                            inputName="contact"
                            inputLabel="New Contact"
                            disabled={this.state.disabled}
                            submitStatus={this.state.submitStatus}
                            handleOnChange={this.handleOnChange}
                        />
                    </TabContainer>

                    <TabContainer >
                        <FormTemplate
                            onSubmit={this.newOwner}
                            inputId="contract_owner"
                            inputName="owner"
                            inputLabel="New Owner"
                            disabled={this.state.disabled}
                            submitStatus={this.state.submitStatus}
                            handleOnChange={this.handleOnChange}
                        />
                    </TabContainer>

                </SwipeableViews>



            </Paper>
        );
    }
}

export default ManageValues
