import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostsList() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(res=>setPosts(res.data))
            .catch(err=>console.log(err))
    },[])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Blog Posts</h1>
      {posts && posts.map(post => (
        <div key={post._id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
          <p className="text-sm text-gray-500 mt-2">Author: {post.author?.name || "Unknown"}</p>
          <Link to={`/post/${post._id}`} className="text-blue-600 mt-2 block">
            Read more
          </Link>
        </div>
      ))}
    </div>
  )
}
