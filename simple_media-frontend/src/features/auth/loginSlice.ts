import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
// import { AuthState } from "../types";


type User = {
  email: string;
  password: string;
}

interface AuthState {
  isSuccess: boolean;
  isError: boolean;
  user: User | null;
  isLoading: boolean;
  message: string;
  token: string;
}

const user = JSON.parse(localStorage.getItem('user') as string)

const authState: AuthState = {
  isError: false,
  isSuccess: false,
  user: user ? user : null,
  isLoading: false,
  message: '',
  token: ''
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (user: User, {rejectWithValue})=> {
    try {
      return await authService.login(user)
    } catch(error) {
      return rejectWithValue('error occured')
    }
})

const loginSlice = createSlice({
  name:'login',
  initialState: authState,
  reducers: {
    reset:(state: AuthState)=> {
      state.isLoading = false,
      state.isError = false,
      state.isSuccess = false,
      state.message = ''
    }
  },
  extraReducers: (builder)=> {
    builder
    .addCase(loginAsync.pending, (state: AuthState)=> {
      state.isLoading = true
    })
    .addCase(loginAsync.fulfilled, (state: AuthState, action: PayloadAction<User>)=> {
      state.isLoading = false,
      state.isSuccess = true,
      state.user = action.payload
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addCase(loginAsync.rejected, (state: AuthState, action: PayloadAction<any>)=> {
      state.isLoading = false,
      state.isError = true,
      state.isError = action.payload,
      state.user = null
    })
  }
})

export const { reset } = loginSlice.actions

export default loginSlice.reducer