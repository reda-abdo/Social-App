import axios from "axios";




const baseUrl = 'https://linked-posts.routemisr.com/'

export function addCommentApi(commentContent, pastId) {
    return axios.post(baseUrl + 'comments', {
        content: commentContent,
        post: pastId
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
}


export async function updateCommentApi(commnetId, newCommentContent) {

    try {
        const { data } = await axios.put(baseUrl + "comments/" + commnetId, {
            content: newCommentContent,
        },
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        return data;
    } catch (error) {
        return error.response ? error.response.data.error : error.message;
    }

}