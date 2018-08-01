import React, { Component } from 'react'
import {isValidWeb3} from "../utils/isValidWeb3";
import ErrorMsg from "./ErrorMsg";
import {logExecution} from "../utils/logExecution";
import {netColors} from '../utils/variables'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {NetNameChip} from "./Elements";




class NetworkInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: ''
        }

        this.readNetInfo = this.readNetInfo.bind(this)
    }


    componentWillMount() {

    }

    async componentDidUpdate() {

        //if web3 will be updated, we need to get network info again
        this.readNetInfo()

    }


    readNetInfo() {

        logExecution('NetworkInfo.readNetInfo()');

        if (!isValidWeb3(this.props.web3)) return;


        this.props.web3.version.getNetwork((err, netId) => {

            if (err) {
                console.log('readNetInfo error:', err)
                this.setState({
                    error: 'readNetInfo error:' + err.toString()
                })
                return;
            }

            //preventing loop! if we are on the same network, then no changes
            this.props.handleNet(netId);

        })

    }




    get renderNetInfo() {

        let styles = netColors(this.props.netId);

        return (
            <Typography component="div">
                Network ID: <strong style={styles}>{this.props.netId}</strong> &nbsp;
                <NetNameChip netId={this.props.netId} />
            </Typography>
        )
    }


    get renderEmptyInfo() {
        return (
            <Typography component="div">
                <ErrorMsg msg="Please connect to the blockchain network"/>
                <Typography component="div">
                    My Personal Contract is present on <NetNameChip netId={1}/> and <NetNameChip netId={3}/>.
                    But you can connect and experiment with any network, even with <NetNameChip />.
                </Typography>
            </Typography>
        )
    }





    render() {

        return (
            <Paper className="MuiPaper NetworkInfo" >

                <Typography variant="headline" component="h2" paragraph >Network Info</Typography>

                <ErrorMsg msg={this.state.error}/>

                {this.props.netId > 0 ? this.renderNetInfo : this.renderEmptyInfo}


            </Paper>
        );
    }
}



export default (NetworkInfo)


