import React, {Component} from 'react'
import PropTypes from "prop-types";
import '../node_modules/react-vis/dist/style.css'
import {HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis} from 'react-vis';
import {Typography, withStyles} from "@material-ui/core";
import moment from "moment";
import 'moment/locale/sv';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
});

class WindGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max: [],
            mean: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            max: nextProps.winds.map(point => {
                return {
                    x: new Date(point.time * 1000),
                    y: point.wind.max,
                }
            }),
            mean: nextProps.winds.map(point => {
                return {
                    x: new Date(point.time * 1000),
                    y: point.wind.mean,
                }
            }),
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h6">
                    Markvind
                </Typography>
                <XYPlot height={300} width={480} yDomain={[0, 12]}>
                    <HorizontalGridLines/>
                    <XAxis
                        tickFormat={(v) => moment(v).format("LT")}
                    />
                    <YAxis/>
                    <LineSeries color="red" data={this.state.max} curve={'curveMonotoneX'}/>
                    <LineSeries color="blue" data={this.state.mean} curve={'curveMonotoneX'}/>
                </XYPlot>
            </div>
        )
    }
}

WindGraph.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WindGraph);