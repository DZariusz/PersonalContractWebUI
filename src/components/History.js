import React  from 'react'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const STYLES = {
    table: {

    },
    column_lp: {
        width: 40
    },
    column_block: {
        width: 70
    }
}



function History(props) {

    if (props.names.length + props.contacts.length + props.owners.length === 0) return null;


    return  (

        <Paper className="MuiPaper" >
            <Typography variant="headline" component="h2" paragraph>History Of Events</Typography>

            <TableTemplate
                tableTitle="History of Names"
                rows={props.names}
                columns={["name"]}
                columnsLabels={["New Name"]} />

            <TableTemplate
                tableTitle="History of Contacts"
                rows={props.contacts}
                columns={["contact"]}
                columnsLabels={["New Contact"]} />

            <TableTemplate
                tableTitle="History of Owners"
                rows={props.owners}
                columns={['previousOwner', 'newOwner']}
                columnsLabels={['Previous Owner', 'New Owner']} />

        </Paper>
    )
}


function TableTemplate (props) {

    if (props.rows.length === 0) return null;

    let labels = props.columnsLabels.map((label, i) => (
        <TableCell key={i}>{label}</TableCell>
    ))

    let rowsData = props.rows.map((obj, i) => (
        <TableRow key={i}>
            <TableCell numeric>{i+1}.</TableCell>
            <TableCell numeric>{obj.blockNumber}</TableCell>
            {props.columns.map((column, j) => {
                return (
                    <TableCell key={i+'-'+j} >{obj[column]}</TableCell>
                )
            })}
        </TableRow>

    ))

    let id = "tableTitle_" + props.property

    return (
        <div>
            <Typography variant="title" id={id} component="h3">{props.tableTitle}</Typography>
            <Table className="MuiTable" styles={STYLES.table} aria-labelledby={id} >
                <TableHead>
                    <TableRow>
                        <TableCell numeric style={STYLES.column_lp}>LP</TableCell>
                        <TableCell numeric style={STYLES.column_block}>Block #</TableCell>
                        {labels}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsData}
                </TableBody>
            </Table>
        </div>
    )
}



export default History
