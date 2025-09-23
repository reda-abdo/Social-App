import { Button, Input,  useDisclosure } from "@heroui/react";
import  { useContext, useState } from 'react'
import Comment from './comment'
import { useNavigate } from 'react-router-dom'
import { addCommentApi } from '../../services/commentsServices'
import { authContext } from "../../contexts/authContext";
import { deletePostApi } from "../../services/PostsServices";
import { addToast } from "@heroui/toast"
import CardDropdown from "./CardDropdown";
import ModelCombonenet from "./ModelCombonenet";
import { queryClient } from "../../App";


export default function Post({ post, commentsLimit }) {
    const navigate = useNavigate()
    const [visibelcomment, setVisibelcomment] = useState(2)
    const [isloading, setIsloading] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const [isLoadingSubmit, setisLoadingSubmit] = useState(false)
    const { userData, setUserData } = useContext(authContext)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isPostDeleteing, setIsPostDeleteing] = useState(false)

    function handelLodeMoerComments() {
        setIsloading(true)
        setTimeout(() => {
            setIsloading(false)
            setVisibelcomment(visibelcomment * 2)
        }, 200)
    }
    async function handelcommentContent() {
        setisLoadingSubmit(true)
        const response = await addCommentApi(commentContent, post.id)
        setisLoadingSubmit(false)
        setCommentContent('')
        queryClient.invalidateQueries(['posts'])
    }

    async function handelDeletePost(onClose) {
        setIsPostDeleteing(true)
        const response = await deletePostApi(post._id)
        console.log(response)
        if (response.message == 'success') {
            await queryClient.invalidateQueries(['posts'])
            setIsPostDeleteing(false)
            onClose();
            addToast({
                title: 'post deleted successfuly',
                timeout: 2000,
                color: 'success'
            })
        }
    }

    return (
        <div>
            <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
                <div className="w-full h-16 flex items-center  justify-between ">
                    <div className="flex">
                        <img className=" rounded-full w-10 h-10 mr-3" src={post.user.photo} alt="" />
                        <div>
                            <h3 className="text-md font-semibold ">{post.user.name}</h3>
                            <p className="text-xs text-gray-500">{post.createdAt}</p>
                        </div>
                    </div>
                    {post.user._id == userData._id && <CardDropdown onOpen={onOpen} />}

                </div>

                {post.body && <p className='py-3'>{post.body}</p>}
                {post.image && <img src={post.image} className='w-full h-100 object-cover mt-3' alt='' />}
                <div className="w-full h-8 flex items-center px-3 my-3">
                    <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                        <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    </div>
                    <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                        <svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>

                    <div className="w-full flex justify-between">
                        <p className="ml-3 text-gray-500">8</p>
                        <p className="ml-3 text-gray-500">{post.comments.length} comment</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 w-full  px-5 my-3 border-t-1  border-gray-400  pt-4">
                    <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        <span className="font-semibold text-lg text-gray-600">Like</span></button>
                    <button onClick={() => navigate("/post-details/" + post.id)} className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span className="font-semibold text-lg text-gray-600">Comment</span></button>

                    <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        <span className="font-semibold text-lg text-gray-600">Share</span></button>
                </div>

                <div className='my-3' >
                    <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} variant='bordered' placeholder='comment...' endContent={<Button isDisabled={commentContent.trim().length < 2} isLoading={isLoadingSubmit} onPress={handelcommentContent} > comment </Button>} />
                </div>
                {post.comments.slice(0, commentsLimit ?? visibelcomment).map((comment) => <Comment  key={comment.id} comment={comment} />)}
                {post.comments.length > visibelcomment && !commentsLimit && <Button isLoading={isloading} onPress={handelLodeMoerComments} className='mx-auto p-3 block' variant='faded' >Lood More Comment</Button>
                }
            </div>


            <ModelCombonenet isOpen={isOpen} isLoading={isPostDeleteing} onOpenChange={onOpenChange} handelFunction={handelDeletePost} title={'Delet Post'} />

        </div>
    )
}
