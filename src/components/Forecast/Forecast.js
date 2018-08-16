import React, {Component} from 'react';
import CurrentForecast from './CurrentForecast/CurrentForecast'
import DailyForecast from './DailyForecast/DailyForecast';
import Loader from '../Loader/Loader';
import './Forecast.css';

class Forecast extends Component {
    getDay = (time) => {
        const dayStamp = new Date(time*1000).getDay();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (dayStamp || dayStamp === 0) {
            return weekDays[dayStamp];
        } else {
            return 'Weekday'
        }
    }

    getTemperature = (temp) => {
        return Math.round(temp)
    }

    getWeatherIcon = (icon) => ({
        'clear-day': "wi wi-day-sunny",
        'clear-night': "wi wi-night-clear",
        'rain': "wi wi-rain",
        'snow': "wi wi-snow",
        'sleet': "wi wi-sleet",
        'wind': "wi wi-windy",
        'fog': "wi wi-fog",
        'cloudy': "wi wi-cloudy",
        'partly-cloudy-day': "wi wi-day-cloudy",
        'partly-cloudy-night': "wi wi-night-cloudy-windy",
        'hail': "wi wi-hail",
        'thunderstorm': "wi wi-thunderstorm",
        'tornado': "wi wi-tornado"
    })[icon]
    render() {
        const { currentForecast, dailyForecast, isLoading, units } = this.props;
        return (
        <div className="forecast d-flex flex-column">
                {isLoading ? (<Loader />) : (
                    <React.Fragment>
                        <CurrentForecast 
                            icon={this.getWeatherIcon(currentForecast.icon)}
                            currentTemp={this.getTemperature(currentForecast.temperature)}
                            summary={currentForecast.summary}
                            units={units}
                        />
                        <div className="weekly-forecast d-sm-flex d-md-flex d-lg-flex">
                            {dailyForecast.slice(1, 5).map((forecast, index) => {
                                return (
                                <DailyForecast
                                    key={index}
                                    icon={this.getWeatherIcon(forecast.icon)}
                                    day={this.getDay(forecast.time)}
                                    tempHigh={this.getTemperature(forecast.temperatureHigh)}
                                    tempLow={this.getTemperature(forecast.temperatureLow)}
                                    summary={forecast.summary}
                                    units={units}
                                />
                                );
                            })}
                        </div>
                    </React.Fragment>
                )}
        </div>
        )
    }
}

export default Forecast;