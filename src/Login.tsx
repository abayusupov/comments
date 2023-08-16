import { Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { FormEvent, useRef, useState } from 'react';
import apiClient from './services/api-client';

const Login = () => {

  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (loginRef.current!==null && passRef.current!==null) {
      const credential = {username: loginRef.current.value, password: passRef.current.value}
      apiClient.post('/auth/jwt/create', credential)
      .then(res => {
        console.log(res.data.access);

      })
      .catch(err => {
        if (err.response.status===401) {
          setError('Login yoki parol xato kiritildi!')
        }
        else {
          setError(err.message);
        }
      });

    }
  }

  return (
    <>
    <Stack spacing={3}>
      {error && <Alert status='error'><AlertIcon />{error}</Alert>}
    </Stack>
    <Flex justify='center' alignItems='center' height='100vh'>
      <Box w='40%' color='white' border='1px' borderColor='gray.700'>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired padding='30px'>
            <FormLabel>login</FormLabel>
            <Input ref={loginRef} id='login' placeholder='login' />
            <FormLabel marginTop={1}>password</FormLabel>
            <Input ref={passRef} id='password' type='password' placeholder='password' />
            <Flex justify='center'><Button colorScheme='dodgerblue' variant='outline' type='submit' marginTop={4}>Submit</Button></Flex>
        </FormControl>
      </form>
      </Box>
    </Flex>
    </>
  )
}

export default Login