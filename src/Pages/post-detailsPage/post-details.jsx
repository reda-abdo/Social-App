import React, { useEffect, useState } from 'react'
import Post from '../../Component/post/Post'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../../services/PostsServices'
import LodingScren from '../LodingScren/LodingScren'

export default function PostDetailsPage() {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  async function gitSinglePage() {
    const response = await getSinglePostApi(id)
    if (response.message == "success") {
      setPost(response.post)
    }

    // console.log(response)

  }
  useEffect(() => {
    gitSinglePage()
  }, [])

  return (
    <div className='max-w-2xl mx-auto '>

      {post ? <Post post={post} /> : <LodingScren />}


    </div>
  )
}
