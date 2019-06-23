import React, {Component} from "react";
import {Paper} from "@material-ui/core";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import 'moment/locale/sv';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        padding: theme.spacing(2, 2, 2, 2),
        position: 'absolute',
        top: 0,
        left: 0,
        width: 120,
        height: 65,
    },
    clock: {
        textAlign: 'center'
    }
});

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment(),
            timerId: null
        }
    }

    componentDidMount() {
        this.setState({
            timerId: setInterval(this.tick, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }

    tick = () => {
          this.setState({
              time: moment()
          })
    };

    render() {
        const {classes} = this.props;
        return   (
            <Paper className={classes.root}>
                <Typography variant="h3" className={classes.clock}>
                    {this.state.time.format('LT')}
                </Typography>
                <Typography variant="h6" className={classes.clock}>
                    {this.state.time.format("ll")}
                </Typography>
            </Paper>
        )
    }
}

Clock.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Clock);