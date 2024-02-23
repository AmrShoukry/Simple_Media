import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { uid } from 'uid';


type Posts = {
  id: string;
  body: string;
}

interface PostState {
  posts: Posts[];
  showModal: boolean;
}

const postState: PostState = {
  posts: [
    {
      id: '1',
      body: 'Sometimes I feel like coding is mentally exhausting'
    },
    {
      id: '2',
      body: 'Arsenal football club is by the best club, bar none'
    },
  ],
  showModal: false
}

const postSlice = createSlice({
  name: 'post',
  initialState: postState,
  reducers: {
    createPost: (state: PostState, action: PayloadAction<string>) => {
      const newPost = {
        id: uid(4),
        body: action.payload
      }
      state.posts.unshift(newPost)
    },
    toggleModal: (state: PostState)=> {
      state.showModal = !state.showModal
    },
    deletePost: (state: PostState, action: PayloadAction<string>)=> {
      state.posts = state.posts.filter(post => post.id !== action.payload)
    }
  }
})

export const { createPost, toggleModal, deletePost }  = postSlice.actions

export default postSlice.reducer