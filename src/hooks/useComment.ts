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


const useComment = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        apiClient.get<FetchCommentsResponse>('/comments', { signal: controller.signal })
        .then(res => setComments(res.data.results))
        .catch(err => {
            if (err instanceof CanceledError) return;
            setError(err.message);
        });

        return () => controller.abort();
    }, [])

    return { comments, error }
}

export default useComment;