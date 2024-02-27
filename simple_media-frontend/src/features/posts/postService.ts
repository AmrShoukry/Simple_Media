import axios from "axios";


export type PostContent = {
  content: string;
  id: string;
}

const API_URL = 'http://localhost:8000';

const token = JSON.parse(localStorage.getItem('user') as string)


const postContent = async(post: PostContent)=> {
  const res = await axios.post(`${API_URL}/posts`, post, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data as PostContent
}

const getContent = async()=> {
  const res = await axios.get(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

const postService = {
  postContent,
  getContent
}

export default postService