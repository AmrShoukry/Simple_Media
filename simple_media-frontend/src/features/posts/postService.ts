import axios from "axios";


export type PostContent = {
  body: string;
}

const API_URL = 'http://localhost:8000';

const postContent = async(post: PostContent)=> {
  const res = await axios.post(`${API_URL}/posts`, post)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data 
}

const postService = {
  postContent
}

export default postService