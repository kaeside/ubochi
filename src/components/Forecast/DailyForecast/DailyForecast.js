import React from 'react';
import './DailyForecast.css'

function DailyForecast({icon, day, tempHigh, tempLow, units}) {
    return (
        <div className="daily-forecast">
            <p>{day}</p>
            <div className="weather-icon">
                <img src="" alt={icon}/>
            </div>
            <div className="high-low">
                <p className="high">{tempHigh + " " + units}</p>
                <p className="low">{tempLow + " " + units}</p>
            </div>
        </div>
    )
}

export default DailyForecast;