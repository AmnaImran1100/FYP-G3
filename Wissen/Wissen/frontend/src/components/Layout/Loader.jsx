import React from 'react'
import { VStack, Spinner} from '@chakra-ui/react'

const Loader = ({color="teal.400"}) => {
  return (
    <VStack h="100vh" justifyContent={'center'}>
        <div style={{transform:"scale(4)"}}> 
            <Spinner thickness='2px' speeed='0.65s' emptyColor='transparent' color={color} size="xl" />
        </div>
    </VStack>
  )
}

export default Loader