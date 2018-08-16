import React from 'react';
import './CurrentForecast.css';
import '../../../assets/weather-icons/css/weather-icons.css';

function CurrentForecast({icon, currentTemp, units, summary}) {
    return (
        <div className="current-forecast">
            <div className="weather-icon">
                <i className={icon + ' display-1'}></i>
            </div>
            <div className="current-temperature">
                <p className="h3">{currentTemp + " " + units}</p>
            </div>
            <p className="h1">Now</p>
            <p className="summary h2">{summary}</p>
        </div>
    )
}

export default CurrentForecast;