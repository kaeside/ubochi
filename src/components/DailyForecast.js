import React from 'react';
import '../../src/DailyForecast.css'

function DailyForecast({icon, day, tempHigh, tempLow}) {
    return (
        <div className="daily-forecast">
            <p>{day}</p>
            <div className="weather-icon">
                <img src="" alt={icon}/>
            </div>
            <div className="high-low">
                <p className="high">{tempHigh}&deg;F</p>
                <p className="low">{tempLow}&deg;F</p>
            </div>
        </div>
    )
}

export default DailyForecast;