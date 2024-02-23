import React, { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

import robot from "./imgs/robot.png";

const alabamaLocation = { lat: 34.7838, lng: -86.5722 }; // Birmingham, Alabama
const startLocation = alabamaLocation; // Set the start location to be the same as Birmingham, Alabama
const endLocation = { lat: 34.7938, lng: -86.5702 }; // Set the end location to be north of the start location

const initialRobotPosition = startLocation; // Set the initial position for the robot marker

function GoogleMapAPI() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [robotPosition, setRobotPosition] = useState(initialRobotPosition);

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the new position for the robot marker
            const newPosition = {
                lat: robotPosition.lat + 0.0001, // Adjust the movement speed if needed
                lng: robotPosition.lng // Keep the longitude the same
            };
            setRobotPosition(newPosition);
        }, 3000); // Change the interval as needed (in milliseconds)

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [robotPosition]); // Run effect whenever robotPosition changes

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            {/* Google Maps Box */}
            <GoogleMap center={alabamaLocation} zoom={10} mapContainerStyle={{ width: '100%', height: '100%' }}>
                {/* Display a marker for the moving robot */}
                <Marker position={robotPosition} icon={robot} />
                {/* Display a marker for the end location */}
                <Marker position={endLocation} />
            </GoogleMap>
        </div>
    );
}

export default GoogleMapAPI;
