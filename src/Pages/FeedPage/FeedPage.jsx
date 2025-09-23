import React, { useContext, useEffect, useState } from 'react'
import { getPostsApi } from '../../services/PostsServices'
import LodingScren from '../LodingScren/LodingScren'
import Post from '../../Component/post/Post'
import CreataPost from '../../Component/post/CreataPost'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@heroui/react'
import { div } from 'framer-motion/client'




export default function FeedPage() {


    // const [posts, setPosts] = useState([])
    // const [isLoding, setIsLoding] = useState(true)



    // async function getAllPosts() {
    //     const data = await getPostsApi()
    //     setIsLoding(false)
    //     if (data.message == 'success') {
    //         setPosts(data.posts)
    //     }

    // }

    // useEffect(() => {
    //     getAllPosts()
    // }, [])

    //  getPostsApi  عشان اجيب الداتا من call le refetch بعمل
    const { data, refetch, isFetching, isError, error, isLoading } = useQuery({
        queryKey: "posts",
        queryFn: getPostsApi,
        retry:3,
        retryDelay:function (failureCount){
            failureCount * 1000
        },
        retryOnMount:false,
        refetchOnReconnect:true,
        refetchOnMount:true,
        refetchOnWindowFocus:true,
        // refetchInterval:5000,
        // refetchIntervalInBackground:true,
        // staleTime:5000,
        gcTime:5000,
    })
    return (
        <div className=' grid gap-4 mx-auto max-w-2xl '>
            <CreataPost getAllPosts={refetch} />
            {
                isLoading ?
                    <LodingScren />
                    :
                    isError ?
                   <div>
                     <h1>{error.message}</h1>
                    <Button onPress={refetch}>retry</Button>
                   </div>
                        :
                        data?.data.posts.map((post) => <Post key={post.id} post={post} commentsLimit={1} />)


            }

        </div>

    )
}

