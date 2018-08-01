import React from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

function Footer() {

    return (
        <Paper className="MuiPaper" elevation={1} >
            <Typography component="footer" className="footer">

                <Typography component="p" paragraph><strong>This DAPP is made with:</strong></Typography>
                <Chip label="Truffle" className="MuiChip"/>
                <Chip label="React"  className="MuiChip"/>
                <Chip label="Solidity"  className="MuiChip"/>
                <Chip label="Web3"   className="MuiChip"/>
                <Chip label={"Material-UI"}  className="MuiChip"/>

            </Typography>
        </Paper>
    );

}

export default Footer
