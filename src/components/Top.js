import React from 'react'

import {Gravatar} from './Elements'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Top(props) {

    return (

        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Typography variant="headline" color="inherit" component="h1">
                    <Gravatar netId={props.netId} /> Personal Contract GUI
                </Typography>
            </Toolbar>
        </AppBar>

    )

}

export default Top