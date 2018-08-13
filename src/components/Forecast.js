import React, {Component} from 'react';
import DailyForecast from './DailyForecast';
import SearchModal from './SearchModal'
import axios from 'axios';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class Forecast extends Component {
    state = {
        lat: 36.081944,
        lng: -115.124722,
        formattedAddress: 'Paradise, NV 89119, USA',
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
        this.fetchForecast(this.state.lat, this.state.lng);
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
    handleLocationTextChange = (address) => {
        this.setState({address})
    }
    handleLocationSelection = async (address) => {
        try {
            let results = await geocodeByAddress(address)
            this.setState({
                formattedAddress: results[0].formatted_address
            })
            let coord = await getLatLng(results[0])
            this.setState({
                lat: coord.lat,
                lng: coord.lng
            })
            await this.fetchForecast(coord.lat, coord.lng);
        } catch (error) {
            console.error('Error', error)
        } 
    }
    getTemperature = (temp) => {
        return Math.round(temp)
    }
    fetchForecast = (lat, lng) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${lat},${lng}`, {
            params: {
                units: this.state.units
            }
        })
        .then(response => {
            this.setState((prevState, props) => {
                return {
                    lat: response.data.latitude, 
                    lng: response.data.longitude, 
                    currentForecast: response.data.currently, 
                    dailyForecast: [...response.data.daily.data]
                }
            })
        })
        .catch(error => console.error(error))
    }
    render() {
        return (
        <div className="forecast">
            <SearchModal
                handleLocationTextChange={this.handleLocationTextChange}
                handleLocationSelection={this.handleLocationSelection} 
                fetchForecast={this.fetchForecast}
            />
            {this.state.dailyForecast.splice(0,5).map((forecast, index) => {
                return <DailyForecast 
                            key={index} 
                            icon={forecast.icon}
                            day={this.getDay(forecast.time)}
                            tempHigh={this.getTemperature(forecast.temperatureHigh)}
                            tempLow={this.getTemperature(forecast.temperatureLow)} 
                        />
            })}
            <p>{this.state.formattedAddress}</p>
        </div>
        )
    }
}

export default Forecast;