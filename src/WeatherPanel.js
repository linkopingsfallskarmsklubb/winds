import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WindGraph from './WindGraph';
import WindTable from './WindTable';
import {Paper, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    panel: {
        display: 'block',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 500,
        height: '100%',
    },
    logo: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
    }
});

class WeatherPanel extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.panel}>
                <Typography variant="h5" component="h3">
                    Väderdata
                </Typography>
                <WindTable winds={this.props.allWinds}/>
                <WindGraph winds={this.props.groundWinds}/>
                <img src='lfk.png' alt='' className={classes.logo}/>
            </Paper>
        )
    }
}

WeatherPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeatherPanel);