import {
    Box,
    Flex,
  } from '@chakra-ui/react'
   import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  
   import { useJsApiLoader, GoogleMap} from '@react-google-maps/api'
  
  
  const center = {lat: 48.854, lng: 2.2945}
  
  function GoogleMapAPI() {
  
  const {isLoaded} = useJsApiLoader({
  googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  

  
    return (
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Maps Box*/ }
          <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height:'100%'}}>
            {/* Display markers or directions*/ }
          </GoogleMap>
        </Box>
      </Flex>
    )
  }
  
  export default GoogleMapAPI