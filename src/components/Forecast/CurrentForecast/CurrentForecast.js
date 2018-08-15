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
                <p>{currentTemp + " " + units}</p>
            </div>
            <p>Now</p>
            <p className="summary">{summary}</p>
        </div>
    )
}

export default CurrentForecast;