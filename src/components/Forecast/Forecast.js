import React, {Component} from 'react';
import DailyForecast from '../Forecast/DailyForecast/DailyForecast';
import Loader from '../Loader/Loader';

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
    render() {
        const { dailyForecast, isLoading, units } = this.props;
        return (
        <div className="forecast">
            <div className="weekly-forecast">
                {isLoading ? <Loader /> : dailyForecast.slice(0,5).map((forecast, index) => {
                    return <DailyForecast 
                                key={index} 
                                icon={forecast.icon}
                                day={this.getDay(forecast.time)}
                                tempHigh={this.getTemperature(forecast.temperatureHigh)}
                                tempLow={this.getTemperature(forecast.temperatureLow)}
                                units={units} 
                            />
                    })
                }
            </div>
        </div>
        )
    }
}

export default Forecast;