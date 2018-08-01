import React from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SmileIcon from '@material-ui/icons/SentimentSatisfiedAlt';

function Intro(props) {

    return (

        <Paper className="MuiPaper" elevation={1}>

            <Typography component="p" color="primary" paragraph>
                <strong>GUI for my Personal Contract, base on React Truffle Box.</strong>
                Please use browser that supports Ethereum blockchain network eg. Chrome + MetaMask,
                because this GUI works on <strong>real blockchain data.</strong>
            </Typography>
            <Typography component="p" >
                Purpose of this contract is to prove, that whenever I will use this contract address, anyone can check, that this is me <SmileIcon style={{maxHeight: '17px'}}/><br/>
                eg. when I got a blockchain certificate and I need to provide my ethereum address, I will provide address of my Personal Contract, like this:
                <Button href="https://certificates.b9lab.com/certificate.html?uuid=45f7f9ad-68e1-4111-a986-05f837cf0d74" target="_blank">Ethereum Developer Certificate</Button>
            </Typography>


        </Paper>

    )
}

export default Intro