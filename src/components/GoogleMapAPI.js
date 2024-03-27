import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import robot from "./imgs/robot.png";

const alabamaLocation = { lat: 34.7838, lng: -86.5622 };
const endLocation = { lat: 34.7938, lng: -86.5702 };

function GoogleMapAPI({ robotPosition }) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <GoogleMap center={alabamaLocation} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
                <Marker position={robotPosition} icon={robot} />
                <Marker position={endLocation} />
            </GoogleMap>
        </div>
    );
}

export default GoogleMapAPI;
