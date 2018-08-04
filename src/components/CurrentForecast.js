import React from 'react';

function CurrentForecast({currentForecast}) {
    console.log(currentForecast);
    return(
        <div className="current-forecast">
            <div className="forecast-info">
                <p>{currentForecast.summary}</p>
                <p>{currentForecast.temperature}&deg;F</p>
            </div>
            <div className="forecast-icon">
                <img src="" alt="sunny"/>
            </div>
        </div> 
    )
}

export default CurrentForecast;

// Your currentForcecast is created asyncronously in your request
// It doesn't exist until after the first render, when the request finishes
// You need to either conditionally render CurrentForecast based on if currentForcast exists, modify CurrentForecast so it works without any props, or set your full initial state in App with currentForecast
