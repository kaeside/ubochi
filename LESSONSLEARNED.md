## Using React Fragment in Forecast Component
JSX always needs a single root node, or it needs to be in an array
React.Fragment is a way to get that without introducing unnecessary divs or something


## Issue with Async call for currentForecast
Your currentForcecast is created asyncronously in your request
It doesn't exist until after the first render, when the request finishes
You need to either conditionally render CurrentForecast based on if currentForcast exists, modify CurrentForecast so it works without any props, or set your full initial state in App with currentForecast
### Code
```js
class App extends Component {
    state = {
        latitude: 0,
        longitude: 0
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
            dailyForecast: response.data.daily})
        })
    }
    render() {
        return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to Ubochi!</h1>
            </header>
            <Forecast forecast={this.state} />
            <button onClick={this.fetchForecast}></button>
        </div>
        );
    }
}

export default App;

function Forecast({forecast}){
    return (
        <div className="forecast">
            <CurrentForecast currentForecast={forecast.currentForecast} />
            <DailyForecast />
        </div>
    )
}

import React from 'react';

function CurrentForecast(props) {
    console.log(props.currentForecast);
    return(
        <div className="current-forecast">
            <div className="forecast-info">
                {/* <p>{currentForecast.summary}</p> */}
                {/* <p>{temperature}&deg;F</p> */}
            </div>
            <div className="forecast-icon">
                <img src="" alt="sunny"/>
            </div>
        </div> 
    )
}

export default CurrentForecast;
```

## Writing Async/Await using promise chainign

I used Async/Await with try and catch for my Axios requests from Dark Sky API.

It can also be written this way using promise chaining

```js
handleLocationSelection = address => {
    geocodeByAddress(address)
        .then(results => {
            this.setState({
                formattedAddress: results[0].formatted_address
            })
            return getLatLng(results[0])
        })
        .then(coord => {
            this.setState({
                lat: coord.lat,
                lng: coord.lng
            })
            this.fetchForecast(coord.lat, coord.lng);
        })
        .catch(error => console.error('Error', error))
}

```