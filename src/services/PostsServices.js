import axios from "axios";




const baseUrl = 'https://linked-posts.routemisr.com/'

export function getPostsApi() {


    return axios.get(baseUrl + 'posts', {
        headers: {
            token: localStorage.getItem("token")
        },
        params: {
            sort: '-createdAt'
        }
    })

}

export async function addpostApi(formData) {
    try {
        const { data } = await axios.post(baseUrl + 'posts', formData, {
            headers: {
                token: localStorage.getItem("token")
            },

        })
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message;

    }

}
export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get(baseUrl + 'posts/' + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message;

    }

}
export async function getCreatecommentApi(postId) {
    try {
        const { data } = await axios.post(baseUrl + 'comments/' + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message;

    }

}



export async function getUserDataApi() {
    try {
        const { data } = await axios.get(baseUrl + 'users/profile-data', {
            headers: {
                token: localStorage.getItem("token")
            }

        },
        )
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deletePostApi(postId) {
    try {
        const { data } = await axios.delete(baseUrl + 'posts/' + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        console.log(data)
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message;

    }

}
export async function deleteCommentApi(commnetId) {
    try {
        const { data } = await axios.delete(baseUrl + 'comments/' + commnetId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data
    } catch (error) {
        return error.response ? error.response.data.error : error.message;

    }

}