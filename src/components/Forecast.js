import React, {Component} from 'react';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import axios from 'axios';

const apiKey = 'f6d6744f7230084cd2e66ef11f234190';

class Forecast extends Component {
    state = {
        latitude: 0,
        longitude: 0,
        currentForecast: {
            summary: 'Weather Summary',
            temperature: 0,
        },
        dailyForecast: [
            {
                summary: 'Weather Summary',
                temperature: 0,
                temperatureLow: 0,
                temperatureHigh: 0
            }
        ]
    }
    componentDidMount() {
        this.fetchForecast();
    }
    getDay = (time) => {
        let timeStamp = new Date(time*1000);
        let day = timeStamp.getDay();
        return day
    }
    getTemperature = (temp) => {
        return Math.round(temp)
    }
    fetchForecast = () => {
        axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`)
        .catch(error => console.error(error))
        .then(response => {
            this.setState((prevState, props) => {
                return {
                    latitude: response.data.latitude, 
                    longitude: response.data.longitude, 
                    currentForecast: response.data.currently, 
                    dailyForecast: [...response.data.daily.data]
                }
            })
        })
    }
    render() {
        return (
        <div className="forecast">
            <CurrentForecast currentForecast={this.state.currentForecast} />
            {this.state.dailyForecast.map((item, i) => <DailyForecast key={i} summary={item.summary} />)}
        </div>
        )
    }
}

export default Forecast;