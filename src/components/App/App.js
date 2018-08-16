import React, {Component} from 'react';
import axios from 'axios';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import './App.css';
import Forecast from '../Forecast/Forecast';
import SearchModal from '../SearchModal/SearchModal';
import NodeGeocoder from 'node-geocoder';

class App extends Component {
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
        initialUnitsOption: 'auto',
        currentUnitsOption: '',
        unitsSymbol: '',
        isLoading: true,
        searchModalOpened: false,
        backgroundColor: '#c54c3c'
    }
    componentDidMount() {
        this.getLocation();
        this.fetchForecast(this.state.lat, this.state.lng);
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
                lng: coord.lng,
                isLoading: true
            })
            await this.fetchForecast(coord.lat, coord.lng);
            this.toggleSearchModal();
        } catch (error) {
            console.error('Error', error)
        } 
    }
    fetchForecast = (lat, lng) => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_API_KEY}/${lat},${lng}`, {
            params: {
                units: this.state.initialUnitsOption
            }
        })
        .then(response => {
            this.setState((prevState, props) => {
                return {
                    lat: response.data.latitude, 
                    lng: response.data.longitude, 
                    currentForecast: response.data.currently, 
                    dailyForecast: [...response.data.daily.data],
                    currentUnitsOption: response.data.flags.units,
                    isLoading: false
                }
            })
            this.setUnits(response.data.flags.units)
        })
        .catch(error => console.error(error))
    }
    setUnits = (units) => {
        units === 'us' ? this.setState({unitsSymbol: '°F'}) : this.setState({unitsSymbol: '°C'})
    }
    toggleSearchModal = () => {
        this.setState({searchModalOpened : !this.state.searchModalOpened})
    }
    changeThemeColor = (color) => {
        this.setState({backgroundColor: color.hex})
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.saveCoords, this.handleGeolocationErrors);
        } else {
            alert("Please refresh the page and enable Geolocation services in order to use this app.")
        }
    }
    saveCoords = (position) => {
        this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        this.fetchForecast(position.coords.latitude, position.coords.longitude);
        this.getFormattedAddress();
    }
    handleGeolocationErrors = (error) => ({
        'error.PERMISSION_DENIED': 'User denied the request for Geolocation.',
        'error.POSITION_UNAVAILABLE':'Location information is unavailable.',
        'error.TIMEOUT': 'The request to get user location timed out.',
        'error.UNKNOWN_ERROR': 'An unknown error occurred.'
    })[error]
    getFormattedAddress = async () => {
        const options = {
            provider: 'google',
        };
        const geocoder = NodeGeocoder(options);
        try {
            let results = await geocoder.reverse({lat: this.state.lat, lon: this.state.lng})
            this.setState({
                formattedAddress: results[0].formattedAddress
            })
        } catch (error) {
            console.error('Error', error)
        } 
    }
    render() {
        return (
        <div className="App" style={{backgroundColor: this.state.backgroundColor}}>
            <button className="menu display-4"
                    style={{backgroundColor: this.state.backgroundColor}}
                    onClick={this.toggleSearchModal}>☰</button>
            <SearchModal
                handleLocationSelection={this.handleLocationSelection} 
                fetchForecast={this.fetchForecast}
                searchModalOpened={this.state.searchModalOpened}
                toggleSearchModal={this.toggleSearchModal}
                changeThemeColor={this.changeThemeColor}
            />
            <Forecast 
                fetchForecast={this.fetchForecast}
                currentForecast={this.state.currentForecast}
                dailyForecast={this.state.dailyForecast}
                isLoading={this.state.isLoading}
                units={this.state.unitsSymbol}
            />
        <footer>
            <p>{this.state.formattedAddress}</p>
        </footer>
        </div>
        );
    }
}

export default App;