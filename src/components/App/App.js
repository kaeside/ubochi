import React, {Component} from 'react';
import logo from '../../assets/logos/logo.svg';
import './App.css';
import Forecast from '../Forecast/Forecast';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Ubochi!</h1>
        </header>
        <Forecast />
      </div>
    );
  }
}

export default App;