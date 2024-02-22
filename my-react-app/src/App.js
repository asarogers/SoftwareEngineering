import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import { useJsApiLoader, GoogleMap} from '@react-google-maps/api'


const center = {lat: 48.854, lng: 2.2945}

function App() {

const {isLoaded} = useJsApiLoader({
googleMapsApiKey:process.env.REACT_APP_GOOGLE_KEY,
})

console.log(process.env.REACT_APP_GOOGLE_KEY, "works")
if(!isLoaded){
  return <SkeletonText/>
}

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

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
      >
        <HStack spacing={4}>
          <Input type='text' placeholder='Origin' />
          <Input type='text' placeholder='Destination' />
          <ButtonGroup>
            <Button colorScheme='pink' type='submit'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => alert(123)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App