import React, {Component} from 'react';
import _ from "lodash";

let size = 275;
let strokeWidth = 5;

class Spot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winds: null
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps.winds, this.props.winds)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!_.isEmpty(nextProps.winds) && !_.isEqual(nextProps.winds, this.props.winds) && _.has(nextProps.winds, "1500")) {
            this.setState({
                winds: {
                    direction: nextProps.winds["1500"].direction,
                    speed: nextProps.winds["1500"].speed
                }
            })
        }
    }

    render() {
        if (!_.isNull(this.state.winds)) {
            let dir = this.state.winds.direction * Math.PI / 180 + Math.PI;
            let speed = this.state.winds.speed;
            let x = size + Math.sin(dir) * speed * size / 7;
            let y = size - Math.cos(dir) * speed * size / 7;
            let style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -y,
                marginLeft: -x,
                width: size * 2,
                height: size * 2,
            };
            return (
                <div style={style}>
                    <svg width={size * 2} height={size * 2}>
                        <circle
                            cx={size}
                            cy={size}
                            r={size - strokeWidth}
                            stroke="white"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />
                    </svg>
                </div>
            )
        }
        else {
            let style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
            };
            return (
                <div style={style}>
                    Missing wind data from LFV
                </div>
            )
        }
    }
}

export default Spot;