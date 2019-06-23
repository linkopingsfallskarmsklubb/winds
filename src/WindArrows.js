import React, {Component} from 'react';
import _ from "lodash";

class WindArrows extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps.winds, this.props.winds)
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.winds) && !_.isEqual(nextProps.winds, this.props.winds)) {

            // Clear canvas before redrawing
            const wd_ctx = this.refs.canvas.getContext('2d');
            wd_ctx.clearRect(0,0, 1000, 1000);

            if (_.has(nextProps.winds, 600)) {
                this.draw_needle('#6fc6f2', nextProps.winds["3000"].direction, nextProps.winds["3000"].speed);
                this.draw_needle('#1b8ee0', nextProps.winds["1500"].direction, nextProps.winds["1500"].speed);
                this.draw_needle('#1270b3', nextProps.winds["600"].direction, nextProps.winds["600"].speed);
            }
            this.draw_needle('#ff4545', nextProps.winds["0"].direction, nextProps.winds["0"].speed);
        }
    }

    draw_needle(color, dir, speed) {
        dir = dir * Math.PI / 180;
        const wd_ctx = this.refs.canvas.getContext('2d');
        wd_ctx.save();

        let length = 410 * (1 + speed) / 11;

        //wd_ctx.translate(x, y);
        wd_ctx.translate(500, 500);
        wd_ctx.rotate(dir + Math.PI);
        for(let i = 0; i < 2; i++) {
            wd_ctx.beginPath();
            wd_ctx.moveTo(0, 20);
            wd_ctx.lineTo(0, length);
            wd_ctx.moveTo(1, 20);
            wd_ctx.lineTo(-18, 46);
            wd_ctx.moveTo(-1 , 20);
            wd_ctx.lineTo(18, 46);
            wd_ctx.lineWidth = 8-4 * i;
            if(i === 0)
                wd_ctx.strokeStyle = 'black';
            else
                wd_ctx.strokeStyle = color;
            wd_ctx.stroke();
        }
        wd_ctx.restore();
    }

    render () {
        let style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -500,
            marginLeft: -500,
            width: 1000,
            height: 1000,
        };

        return (
            <div style={style}>
                <canvas ref="canvas" width="1000" height="1000"/>
            </div>
        )
    }
}

export default WindArrows;