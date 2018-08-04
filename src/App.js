import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Forecast from './components/Forecast';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Ubochi!</h1>
        </header>
        <Forecast />
        <button></button>
      </div>
    );
  }
}

export default App;