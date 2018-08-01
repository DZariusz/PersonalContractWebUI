import React, { Component } from 'react'
import isUrl from '../utils/isUrl'
import ErrorMsg from "./ErrorMsg";
import {logExecution} from "../utils/logExecution";


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ContactIcon from '@material-ui/icons/ContactMail';
import ListSubheader from '@material-ui/core/ListSubheader';

class StoredValues extends Component {

    constructor(props) {
        super(props)

        this.state = {
            owner: '',
            name: '',
            contact: null,
            contactIsUrl: false,
            error: '',
            reseted: false,
            key: 1,
        }

        this.readDataFromContract = this.readDataFromContract.bind(this)
        this.canRender = this.canRender.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    componentWillMount() {

    }

    componentDidUpdate() {

        this.readDataFromContract()
    }


    canRender() {

        return !!this.props.instance;
    }

    //watch out for a loop!!
    resetState(error = '') {

        if (this.state.reseted) return;

        logExecution('resetState(error)')

        this.setState({
            owner: '',
            name: '',
            contact: '',
            reseted:  true,
            error
        })
    }
    /**
     * we are changing state base on props change
     * its not best solution, so we must do it under some conditions
     * this is simple demo so its ok, but in larger projects other solution should be apply:
     *
     * https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
     */
    async readDataFromContract() {

        logExecution('readDataFromContract()')

        if (!this.props.address) {
            this.resetState()
            return;
        }

        if (!this.props.instance) return;


        let name, contact, owner


        try {
            owner = await this.props.instance.owner.call()
            name = await this.props.instance.name.call()
            contact = await this.props.instance.contact.call()



            //if we have any changes
            if (name !== this.state.name
                || contact !== this.state.contact
                || owner !== this.state.owner ) {
                this.setState({
                    name,
                    contact,
                    owner,
                    contactIsUrl: isUrl(contact),
                    reseted: false,
                    error: ''
                });
            }

        } catch(e) {
            console.warn(e.message)
            //if we already have errors then, do nothing
            if (this.state.error) return;

            this.resetState('There is a problem with pulling data from the contract - please make sure you provided valid address.')
        }

    }

    get printValues() {

        let url = this.state.contactIsUrl ? this.state.contact : false
        let contactHtml = url ? <a href={url} target="_blank">{url}</a> : this.state.contact


        return (

            <div>
            <List component="nav"
                  subheader={<ListSubheader component="div">Personal Contract stores this data: name, contact information and owner address.</ListSubheader>}>
                <ListItem >
                    <ListItemIcon>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={this.state.name} />
                </ListItem>

                <ListItem button={!!url} href={url ? url : '#'} target="_blank">
                    <ListItemIcon>
                        <ContactIcon />
                    </ListItemIcon>
                    <ListItemText primary={contactHtml} />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <FingerprintIcon />
                    </ListItemIcon>
                    <ListItemText primary={this.state.owner} />
                </ListItem>
            </List>


            </div>
        )
    }


    render() {

        if (!this.canRender()) return null;

        return (
            <Paper className="MuiPaper StoredValues" key={this.state.key} >
                <Typography variant="headline" component="h2" paragraph >Stored Values</Typography>

                <ErrorMsg msg={this.state.error} />

                {this.printValues}
            </Paper>
        );
    }
}

export default StoredValues
