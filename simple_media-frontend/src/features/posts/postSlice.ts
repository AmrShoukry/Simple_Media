import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";
import { PostContent } from "./postService";

import { uid } from 'uid';


type Posts = {
  id: string;
  body: string;
}

interface PostState {
  posts: Posts[];
  showModal: boolean;
  body: string;
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
  showModal: false,
  body: ''
}

export const postAsync = createAsyncThunk(
  'post/post',
  async(post: PostContent, thunkAPI)=> {
    try {
      return await postService.postContent(post)
    } catch(error: any) {
      const message =(error.res && error.res.data && error.res.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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
  },
  extraReducers: (builder)=> {
    builder
      .addCase(postAsync.fulfilled, (state: PostState, action: PayloadAction<string>)=> {
        state.body = action.payload
      })
  }
})

export const { createPost, toggleModal, deletePost }  = postSlice.actions

export default postSlice.reducer