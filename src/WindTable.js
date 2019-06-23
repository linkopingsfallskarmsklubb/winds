import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 480,
        maxWidth: 480,
    },
});

const colors = {
    "3000": '#6fc6f2',
    "1500": '#1b8ee0',
    "600": '#1270b3',
    "0": '#ff4545',
};

class WindTable extends Component {
    render() {
        let {winds, classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h6">
                    Höjdvind
                </Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="right">Höjd</TableCell>
                            <TableCell align="right">Riktning</TableCell>
                            <TableCell align="right">Hastighet</TableCell>
                            <TableCell align="right">Temperatur</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(winds).reverse().map(key => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row" style={{backgroundColor: colors[key]}} />
                                <TableCell align="right">{key}</TableCell>
                                <TableCell align="right">{winds[key].direction}</TableCell>
                                <TableCell align="right">{winds[key].speed}</TableCell>
                                <TableCell align="right">{winds[key].temperature}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

WindTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WindTable);

