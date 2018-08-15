import React from 'react';
import './DailyForecast.css';
import '../../../assets/weather-icons/css/weather-icons.css';

function DailyForecast({icon, day, tempHigh, tempLow, units, summary}) {
    return (
        <div className="daily-forecast">
            <div className="weather-icon">
                <i className={icon + ' display-4'}></i>
            </div>
            <div className="high-low">
                <p className="high">{tempHigh + " " + units}</p>
                <p className="low">{tempLow + " " + units}</p>
            </div>
            <p>{day}</p>
            <p>{summary}</p>
        </div>
    )
}

export default DailyForecast;