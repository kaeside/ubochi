import React from 'react';

function DailyForecast({forecast, day}) {
    return (
        <div className="daily-forecast">
            <p>{day}</p>
            <div className="weather-icon">
                <img src="" alt={forecast.icon}/>
            </div>
            <div className="high-low">
                <p className="high">{forecast.temperatureHigh}&deg;F</p>
                <p className="low">{forecast.temperatureLow}&deg;F</p>
            </div>
        </div>
    )
}

export default DailyForecast;