import React from 'react';
import Interface from "./Interface";

function App() {
    return (
        <div>
            <iframe
                title="FlightRadar24"
                className="website"
                width="100%"
                height="100%"
                src="https://www.flightradar24.com/simple?lat=58.497486&lon=15.100503&z=14&label1=callsign&label2=altspeed"
                allowFullScreen
            >
            </iframe>
            <div id="container">
                <Interface />
            </div>
        </div>
    );
}

export default App;
