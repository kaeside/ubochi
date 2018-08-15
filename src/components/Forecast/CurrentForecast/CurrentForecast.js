import React from 'react';
import './CurrentForecast.css';
import '../../../assets/weather-icons/css/weather-icons.css';

function CurrentForecast({icon, currentTemp, units}) {
    return (
        <div className="current-forecast">
            <p>Now</p>
            <div className="weather-icon">
                <i className={icon}></i>
            </div>
            <div className="current-temperature">
                <p>{currentTemp + " " + units}</p>
            </div>
        </div>
    )
}

export default CurrentForecast;