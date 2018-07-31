import React from 'react';

function DailyForecast(props) {
    return (
        <div className="daily-forecast">
            <p>Today</p>
            <div className="weather-icon">
                <img src="" alt="cloudy"/>
            </div>
            <div className="high-low">
                <p className="high">83&deg;F</p>
                <p className="low">76&deg;F</p>
            </div>
        </div>
    )
}

export default DailyForecast;