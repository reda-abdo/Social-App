import React, { useContext, useState } from 'react'
import userPhoto from '/src/assets/user-photo.png'
import { Button, Input, useDisclosure } from '@heroui/react'
import { authContext } from '../../contexts/authContext'
import { deleteCommentApi } from '../../services/PostsServices'
import { addToast } from '@heroui/toast'
import CardDropdown from './CardDropdown'
import ModelCombonenet from './ModelCombonenet'
import { addCommentApi, updateCommentApi } from '../../services/commentsServices'
import { queryClient } from '../../App'
import { useMutation } from '@tanstack/react-query'



export default function Comment({ comment }) {
    const { userData } = useContext(authContext)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isCommentDeleteing, setIsCommentDeleteing] = useState(false)
    const [isInUpdateMode, setIsInUpdateMode] = useState(false)
    const [newCommnetContenet, setNewCommnetContenet] = useState(comment.content)
    const [isUpdateingLoding, setisUpdateingLoding] = useState(false)



useMutation({
    mutationFn:()=>addCommentApi(newCommnetContenet,comment._id)
})

    async function handelDeleteComment(onClose) {
        setIsCommentDeleteing(true)
        const response = await deleteCommentApi(comment._id)
        if (response.message == 'success') {
            await queryClient.invalidateQueries(['posts'])
            onClose()
            addToast({
                title: "deleted comment success",
                color: 'success',
                timeout: 2000
            })

        }
        setIsCommentDeleteing(false)

    }


    async function handeUpdateComment() {
        setisUpdateingLoding(true)
        console.log(newCommnetContenet)
        const response = await updateCommentApi(comment._id, newCommnetContenet)
        if (response.message == 'success') {
            setNewCommnetContenet(response.comment.content)
            await queryClient.invalidateQueries(['posts'])
            setIsInUpdateMode(false)
        }
        setisUpdateingLoding(false)
    }


    return (
        <div>
            <div className="w-full h-16 flex items-center  justify-between ">

                <div className="flex">
                    <img onError={(e) => { e.target.src = userPhoto }} className=" rounded-full w-10 h-10 mr-3" src={comment.commentCreator.photo} alt="" />
                    <div>
                        <h3 className="text-md font-semibold ">{comment.commentCreator.name}</h3>
                        <p className="text-xs text-gray-500">{comment.createdAt}</p>
                    </div>
                </div>
                {comment.commentCreator._id == userData?._id && <CardDropdown setIsInUpdateMode={setIsInUpdateMode} onOpen={onOpen} />}

            </div>

            {
                isInUpdateMode ?
                    <div className="div">
                        <Input className="text-md  ps-6 py-4   text-gray-900"  isDisabled={isUpdateingLoding} value={newCommnetContenet} onChange={(e) => setNewCommnetContenet(e.target.value)} />

                        <div className='flex justify-end gap-3'>

                            <Button color='default' variant='bordered' onPress={() => setIsInUpdateMode(false)} >Cancle</Button>
                            <Button color='primary' isDisabled={newCommnetContenet.trim().length < 2} isLoading={isUpdateingLoding} onPress={handeUpdateComment} >Update</Button>
                        </div>
                    </div>
                    :
                    <p className="text-md  ps-6 py-4  text-gray-900">{comment.content}</p>
            }







            <ModelCombonenet titel={'Deleted comment'} isLoading={isCommentDeleteing} isOpen={isOpen} onOpenChange={onOpenChange} handelFunction={handelDeleteComment} />
        </div>)
}
