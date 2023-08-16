import { Alert, AlertIcon, Box, Button, HStack, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Comment {
    id: number,
    post: number,
    text: string,
    date: Date
}

interface FetchCommentsResponse {
    count: number,
    results: Comment[]
}

interface Props {
  updatePost: () => void;
  updateCount: () => void;
}


const CommentGrid = ( {updatePost, updateCount }: Props) => {

  const onSelectPositive = (id: number) => {

      apiClient.patch(`/comments/${id}/`, {position: '1'})
        .then(response => {
          deleteOnSelect(id);
          updateCount();
          if (comments.length === 1) {
            updatePost();
            FetchComment();
          }
        })
        .catch(error => setError(error.message));

  }

  const onSelectNegative = (id: number) => {

      apiClient.patch(`/comments/${id}/`, {position: '2'})
        .then(response => {
          deleteOnSelect(id);
          updateCount();
          if (comments.length === 1) {
            updatePost();
            FetchComment();
          }
        })
        .catch(error => setError(error.message));
  }

  const onSelectNeutral = (id: number) => {
      apiClient.patch(`/comments/${id}/`, {position: '3'})
        .then(response => {
          deleteOnSelect(id);
          updateCount();
          if (comments.length === 1) {
            updatePost();
            FetchComment();
          }
        })
        .catch(error => setError(error.message));
  }


  function deleteOnSelect(id: number) {
    const filteredComment = comments.filter(comment => comment.id !== id)
    setComments(filteredComment);
  }


  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');


  useEffect(() => {
    FetchComment();
  }, [])


  const FetchComment = () => {
    const controller = new AbortController();

    apiClient.get<FetchCommentsResponse>('/comments', { signal: controller.signal })
    .then(res => setComments(res.data.results))
    .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
    });

    return () => controller.abort();
  }


  return (
    <>
    <Stack spacing={3}>
    {error && <Alert status='error'><AlertIcon />Error in comments {error}</Alert>}
  </Stack>

    <VStack spacing={10} divider={<StackDivider borderColor='gray.300'/>} align='stretch' justifyContent='center' marginBottom='50px'>
      {comments.map(comment => <Box paddingLeft='20px' paddingRight='20px' marginTop='20px' key={comment.id}>
        <HStack justify='space-between'>
          <Text>{comment.text}</Text>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='green' variant='outline' onClick={() => onSelectPositive(comment.id)}>Positive</Button>
            <Button colorScheme='red' variant='outline' onClick={() => onSelectNegative(comment.id)}>Negative</Button>
            <Button colorScheme='gold' variant='outline' onClick={() => onSelectNeutral(comment.id)}>Neutral</Button>
          </Stack>
        </HStack>
      </Box>)}
    </VStack>
    </>
  )
}

export default CommentGrid