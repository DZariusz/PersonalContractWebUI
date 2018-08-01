import React from 'react'

import Typography from '@material-ui/core/Typography';


import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    error: {
        backgroundColor: theme.palette.error.dark,
        color: '#fff',
        padding: theme.spacing.unit,
    }

});

function ErrorMsg(props) {

    const { classes } = props;

    if (!props.msg) return null

    return (
        <Typography className={classNames("ErrorMsg", classes.error)} component="p" paragraph>
            {props.msg}
        </Typography>
    );

}


export default withStyles(styles)(ErrorMsg)
