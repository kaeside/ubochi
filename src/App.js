import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentForecast from './components/CurrentForecast';
import DailyForecast from './components/DailyForecast';
import axios from '../node_modules/axios';
 
const apiKey= 'f6d6744f7230084cd2e66ef11f234190';


//Sample API call: https://api.darksky.net/forecast/f6d6744f7230084cd2e66ef11f234190/37.8267,-122.4233

class App extends Component {
  state = {
    latitude: 0,//response.data.latitude
    longitude: 0//response.data.longitude
  }
  componentDidMount() {
    this.fetchForecast();
  }
  fetchForecast = () => {
    axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`)
    .catch(error => console.error(error))
    .then(response => {
      this.setState({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        currentForecast: response.data.currently,
        dailyForecast: response.data.daily
      })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ubochi!</h1>
        </header>
        <CurrentForecast />
        <DailyForecast />
        <button onClick= {this.fetchForecast}></button>
      </div>
    );
  }
}

export default App;

// const {longitude, latitude} = response.data;
// const dailyData = response.data.daily.data;
// // then later on
// <LongitudeLatitudeDisplay longitude={longitude} latitude={latitude} />
// <DailyDisplay data={dailyData} />