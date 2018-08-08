import React, {Component} from 'react';
import CurrentForecast from './CurrentForecast';
import DailyForecast from './DailyForecast';
import SearchModal from './SearchModal'
import axios from 'axios';

class Forecast extends Component {
    state = {
        searchInputValue: '',
        latitude: 36.081944,
        longitude: -115.124722,
        city: 'Paradise',
        state: 'Nevada',
        zipCode: 89119,
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
        this.getLatandLongFromAddress();
        this.fetchForecast();
    }
    getDay = (time) => {
        const dayStamp = new Date(time*1000).getDay();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    getLatandLongFromAddress = () => {
        // axios.get('https://nominatim.openstreetmap.org/search/', {
        //     params: {
        //         q: '11 W 53rd St, New York, NY 10019',
        //         format: 'json',
        //         addressdetails: 1,
        //     }
        // })
        axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/', {
            params: {
                input: this.state.searchInputValue,
                output: 'json',
                key: process.env.REACT_APP_GMAPS_PLACES_API_KEY
            }
        })
        .then(response => {
            this.setState((prevState, props) => {
                return {
                    latitude: 36.081944,
                    longitude: -115.124722,
                    city: 'Paradise',
                    state: 'Nevada',
                    zipCode: 89119
                }
            })
            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${this.state.latitude},${this.state.longitude}`, {
                params: {
                    units: this.state.units
                }
            })
        })
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
    fetchForecast = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${this.state.latitude},${this.state.longitude}`, {
            params: {
                units: this.state.units
            }
        })
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
            <SearchModal value={this.state.searchInputValue} />
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