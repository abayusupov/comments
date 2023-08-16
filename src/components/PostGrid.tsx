import { Alert, AlertIcon, HStack, Text } from '@chakra-ui/react'

interface Post {
    id: number,
    title: string,
    url: string,
    date: Date
}

interface Props {
    post: Post | null,
    error: string
}

const PostGrid = ( {post, error }: Props) => {

  return (<>
        {error && <Alert status='error'><AlertIcon />Error in post: {error}</Alert>}
        <HStack justify='center' margin='20px'>
            <div>
            <Text fontSize='4xl' marginBottom='10px'>{post?.title}</Text>
            <HStack justify='space-between'>
            <Text color='gray' fontSize='0.5xl'>{post?.date.toString()}</Text>
            <a href={post?.url}><Text color='dodgerblue' fontSize='0.5xl'>{post?.url}</Text></a>
            </HStack>
            </div>
        </HStack>
        </> )  

}   

export default PostGrid