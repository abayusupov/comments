import { Button, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios'
import { useEffect, useState } from 'react';

import apiClient, { getKey } from './services/api-client';
import NavBar from './components/NavBar';
import CommentGrid from './components/CommentGrid';
import PostGrid from './components/PostGrid';


import { Alert, AlertIcon, Box, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { FormEvent, useRef } from 'react';
// import apiClient from './services/api-client';

interface Post {
  id: number,
  title: string,
  url: string,
  date: Date
}

function App() {

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [isAuthenticated, setAuthenticated] = useState(false);
  

    
    useEffect(() => {
      checkStatus();
      if (isAuthenticated===true) {
        fetchAll();
      }
    }, [isAuthenticated])
  


  const checkStatus = () => {

    apiClient.interceptors.request.use(function (config) {
      config.headers.Authorization = getKey();
      return config;
    });

    apiClient.get('/auth/users/me')
    .then(res => setAuthenticated(true))
    .catch(err => {
      if (err.response.status === 401) {
        setAuthenticated(false);
      }
    });
  }

  const fetchAll = () => {
    fetchPost();
    fetchCommentCount();
  }

  const fetchPost = () => {
    apiClient.get<Post[]>('/post')
    .then(res => setPost(res.data[0]))
    .catch(err => setError(err.message))
  } 
  


  const fetchCommentCount = () => {
    apiClient.get('/comment_count')
    .then(res => setCommentCount(res.data['count']))
    .catch(err => setError(err.message))
  }





  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  // const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (loginRef.current!==null && passRef.current!==null) {
      const credential = {username: loginRef.current.value, password: passRef.current.value}
      apiClient.post('/auth/jwt/create', credential)
      .then(res => {
        console.log(res.data.access);
        window.localStorage.setItem('kalit', JSON.stringify(res.data.access))
        setAuthenticated(true);
        console.log(localStorage.getItem('kalit'))

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

    return <>{isAuthenticated ? <Grid templateAreas={`"nav" "main"`}>
    <GridItem area='nav'>
      <NavBar count={commentCount} />
    </GridItem>
    <GridItem area='main'>
      <PostGrid post={post} error={error}/>
      <CommentGrid updateCount={()=>setCommentCount(commentCount+1)} updatePost={() => fetchAll()}/>
    </GridItem>
  </Grid> : <>
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
    </>}</> 
  
 
}

export default App;