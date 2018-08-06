import React, {Component} from 'react';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import axios from 'axios';

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
        ],
        units: 'auto'
    }
    componentDidMount() {
        this.fetchForecast();
    }
    getDay = (time) => {
        const dayStamp = new Date(time*1000).getDay();
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (dayStamp || dayStamp === 0) {
            return weekDays[dayStamp];
        } else {
            return 'Weekday'
        }
    }
    setForecastUnits = (units) => {
        let unitsArray = ['auto', 'ca', 'us', 'si'];
        let forecastUnits = this.state.units;
    }
    getTemperature = (temp) => {
        return Math.round(temp)
    }
    fetchForecast = () => {
        axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/37.8267,-122.4233?units=${this.state.units}`)
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
            {this.state.dailyForecast.splice(0,5).map((forecast, i) => {
                return <DailyForecast 
                            key={i} 
                            icon={forecast.icon}
                            day={this.getDay(forecast.time)}
                            tempHigh={this.getTemperature(forecast.temperatureHigh)}
                            tempLow={this.getTemperature(forecast.temperatureLow)} 
                        />
            })}
        </div>
        )
    }
}

export default Forecast;