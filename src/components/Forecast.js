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
        let dayStamp = new Date(time*1000).getDay();
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = weekDays[dayStamp];
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
            <CurrentForecast
                summary={this.state.currentForecast.summary}
                temperature={this.state.currentForecast.temperature}
            />
            {this.state.dailyForecast.splice(0,5).map((forecast, i) => <DailyForecast key={i} forecast={forecast} />)}
        </div>
        )
    }
}

export default Forecast;