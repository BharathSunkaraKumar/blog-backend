import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetails() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(res.data)
            }catch(err) {
                console.log(err.message)
            }
        }
        fetchPost()
    },[id])
    if(!post) return <p className="p-4 text-center">Loading...</p>
  return (
    <section>
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600">By {post.author?.username}</p>
            <p className="mt-4 whitespace-pre-line">{post.content}</p>
        </div>
    </section>
  )
}
