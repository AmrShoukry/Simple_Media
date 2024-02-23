import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type Posts = {
  id: number;
  body: string;
}

interface PostState {
  posts: Posts[];
}

const postState: PostState = {
  posts: [
    {
      id: 1,
      body: 'Sometimes I feel like coding is mentally exhausting'
    },
    {
      id: 2,
      body: 'Arsenal football club is by the best club, bar none'
    },
  ]
}

const postSlice = createSlice({
  name: 'post',
  initialState: postState,
  reducers: {
    createPost: (state: PostState, action: PayloadAction<string>) => {
      const newPost = {
        
      }
    }
  }
})


export default postSlice.reducer