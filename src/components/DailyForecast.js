import React from 'react';

function DailyForecast(props) {
    return (
        <div className="daily-forecast">
            <p>Today</p>
            <div className="weather-icon">
                <img src="" alt="cloudy"/>
            </div>
            <div className="high-low">
                <p className="high">83&deg;</p>
                <p className="low">76&deg;</p>
            </div>
        </div>
    )
}

export default DailyForecast;