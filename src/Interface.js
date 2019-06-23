import React, {Component} from 'react';
import axios from "axios";
import _ from "lodash";
import Spot from "./Spot";
import WindArrows from "./WindArrows";
import WindPanel from "./WeatherPanel";
import Clock from "./Clock";

class Interface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerId: null,
            groundWinds: [],
            allWinds: {}
        };
    }

    componentDidMount() {
        this.fetchWeather();
        let id = setInterval(this.fetchWeather, 30000);

        this.setState({
            timerId: id
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId)
    }

    fetchWeather = () => {
        axios.get('/weather.php')
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Could not fetch data.")
                }

                return response.data
            })
            .then(data => {
                let allWinds = {};
                if (!_.isNull(data.lfv)) {
                    allWinds = data.lfv;
                }
                let lastData = data.station[data.station.length - 1];
                allWinds["0"] = {
                    direction: lastData.wind.direction,
                    speed: lastData.wind.max,
                    temperature: lastData.temperature
                };
                this.setState({
                    groundWinds: data.station,
                    allWinds: allWinds
                })
            })
            .catch(error => console.log(error))
    };

    render() {
        return (
            <div>
                <Spot winds={this.state.allWinds}/>
                <WindArrows winds={this.state.allWinds}/>
                <WindPanel allWinds={this.state.allWinds} groundWinds={this.state.groundWinds}/>
                <Clock />
            </div>
        )
    }
}

export default Interface;
