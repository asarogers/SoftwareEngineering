<<<<<<< HEAD
import { Box, Flex } from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 48.854, lng: 2.2945 };

function GoogleMapAPI() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {/* Display markers or directions*/}
          </GoogleMap>
        </Box>
      </Flex>
    </>
  );
=======
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
>>>>>>> 41853fcffe28bf75bab00ff89b4dc899ce52846a
}

export default GoogleMapAPI;
