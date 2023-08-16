import React, { useEffect, useState } from 'react'
import { HStack, Image, Stack, Text } from '@chakra-ui/react'
import logo from '../assets/1789313.ico'
import ColorModeSwitch from './ColorModeSwitch'
import apiClient from '../services/api-client';


interface User {
  id: number,
  username: string,
  first_name: string,
  last_name: string 
}

interface Props {
  count: number;
}


const NavBar = ( {count}: Props) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
      apiClient.get<User>('/auth/users/me')
      .then(res => setCurrentUser(res.data))
      .catch(err => console.log({err}));
    }, [])

  return <HStack justify='space-between' paddingLeft='40px' paddingRight='40px' paddingTop='20px'>
    <HStack>
    <Image src={logo} boxSize='40px'/>
      <Text fontFamily='heading' fontSize='3xl' marginLeft='40px'>{count}</Text>
    </HStack>
    <HStack>
    <Text fontSize='2xl' marginRight='40px'>{currentUser?.first_name} {" "} {currentUser?.last_name}</Text>
    <ColorModeSwitch />
    </HStack>
  </HStack>
}

export default NavBar