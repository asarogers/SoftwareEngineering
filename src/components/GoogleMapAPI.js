import { useJsApiLoader, GoogleMap} from '@react-google-maps/api'
  
  
  const center = {lat: 48.854, lng: 2.2945}
  
  function GoogleMapAPI() {
  
    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      })
      
      
      if(!isLoaded){
        return <>Loading</>
      }
      
        return (
          <div style={{position: "absolute", flexDirection:"column", alignItems: "center", height: "100vh", width: "100vw"}}
          >
              {/* Google Maps Box*/ }
              <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height:'100%'}}>
                {/* Display markers or directions*/ }
              </GoogleMap>
      
      
          </div>
        )
  }
  
  export default GoogleMapAPI