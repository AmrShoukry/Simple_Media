import axios from "axios";

export type PostContent = {
  content: string;
  id: string;
};

const API_URL = "http://localhost:8000";

const token = JSON.parse(localStorage.getItem("user") as string);

const postContent = async (post: PostContent) => {
  const res = await axios.post(`${API_URL}/posts`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data.content;
};

const getContent = async () => {
  const res = await axios.get(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likePost = async (userId, postId) => {
  const likesRes = await axios.get(`${API_URL}/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(likesRes.data.data);

  if (likesRes.data.data.some((item) => item._id === userId)) {
    console.log("second");

    const res = await axios.delete(`${API_URL}/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    console.log("third");
    const res = await axios.post(
      `${API_URL}/posts/${postId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};

const postService = {
  postContent,
  getContent,
  deletePost,
  likePost,
};

export default postService;
