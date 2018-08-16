import React from 'react';
import './DailyForecast.css';
import '../../../assets/weather-icons/css/weather-icons.css';

function DailyForecast({icon, day, tempHigh, tempLow, units, summary}) {
    return (
        <div className="daily-forecast d-flex flex-column align-content-center">
            <div className="weather-icon">
                <i className={icon + ' display-4'}></i>
            </div>
            <div className="high-low d-flex justify-content-center">
                <p className="high h5">{tempHigh + " " + units}</p>
                <p className="low h6">{tempLow + " " + units}</p>
            </div>
            <p className="day">{day}</p>
            <p className="summary">{summary}</p>
        </div>
    )
}

export default DailyForecast;