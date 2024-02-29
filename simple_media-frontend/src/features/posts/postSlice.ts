/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import postService from "./postService";
import { PostContent } from "./postService";

type Posts = {
  _id: string;
  content: string;
};

interface PostState {
  posts: Posts[];
  // image: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const postState: PostState = {
  posts: [], //JSON.parse(localStorage.getItem('posts')|| '[]'),
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const postAsync = createAsyncThunk(
  "post/post",
  async (post: PostContent, thunkAPI) => {
    try {
      return await postService.postContent(post);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getPost", async () => {
  try {
    return await postService.getContent();
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk("p", async (id) => {
  try {
    return await postService.deletePost(id);
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("p", async (userId, postId) => {
  try {
    return await postService.likePost(userId, postId);
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState: postState,
  reducers: {
    // createPost: (state: PostState, action: PayloadAction<any>) => {
    //   const newPost = {
    //     id: uid(4),
    //     content: action.payload
    //   }
    //   state.posts.unshift(newPost)
    // },
    // deletePost: (state: PostState, action: PayloadAction<string>) => {
    //   console.log(action);
    //   state.posts = state.posts.filter((post) => post.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAsync.pending, (state: PostState) => {
        state.isLoading = true;
      })
      .addCase(
        postAsync.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          const newPost = {
            content: action.payload,
            id: nanoid(4),
          };
          state.posts.push(newPost);
          (state.isLoading = false), (state.isSuccess = true);
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(
        postAsync.rejected,
        (state: PostState, action: PayloadAction<any>) => {
          (state.isLoading = false), (state.isError = action.payload);
          // state.content = ''
        }
      )

      .addCase(getAllPosts.pending, (state: PostState) => {
        state.isLoading = true;
      })
      .addCase(
        getAllPosts.fulfilled,
        (state: PostState, action: PayloadAction<any>) => {
          (state.posts = action.payload),
            (state.isLoading = false),
            (state.isSuccess = true);
        }
      )
      .addCase(
        getAllPosts.rejected,
        (state: PostState, action: PayloadAction<any>) => {
          (state.isLoading = false), (state.isError = action.payload);
          // state.content = ''
        }
      );
  },
});

// export const { deletePost } = postSlice.actions;

export default postSlice.reducer;
