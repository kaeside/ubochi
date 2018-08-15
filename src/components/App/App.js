import React, {Component} from 'react';
import axios from 'axios';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import logo from '../../assets/logos/logo.svg';
import './App.css';
import Forecast from '../Forecast/Forecast';
import SearchModal from '../SearchModal/SearchModal';

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
      isLoading: true
  }
  componentDidMount() {
        this.fetchForecast(this.state.lat, this.state.lng);
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
              lng: coord.lng,
              isLoading: true
          })
          await this.fetchForecast(coord.lat, coord.lng);
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Ubochi!</h1>
        </header>
        <SearchModal
          handleLocationTextChange={this.handleLocationTextChange}
          handleLocationSelection={this.handleLocationSelection} 
          fetchForecast={this.fetchForecast}
        />
        <Forecast 
          fetchForecast={this.fetchForecast}
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