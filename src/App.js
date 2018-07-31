import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from '../node_modules/axios';

//Dark Sky API key: f6d6744f7230084cd2e66ef11f234190


//Sample API call: https://api.darksky.net/forecast/f6d6744f7230084cd2e66ef11f234190/37.8267,-122.4233

class App extends Component {
  state = {
    forecasts: []
  }
  componentDidMount() {
    this.fetchForecast();
  }
  fetchForecast = () => {
    axios('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f6d6744f7230084cd2e66ef11f234190/37.8267,-122.4233')
    .catch(error => console.error(error))
    .then(response => console.log('RESPONSEOK', response))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick= {this.fetchForecast}></button>
      </div>
    );
  }
}

export default App;
