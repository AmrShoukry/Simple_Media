import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";



// get user from localstorage
const user = JSON.parse(localStorage.getItem('user') as string)

// type User = {
//   email: string;
//   password: string;
// }

type UserData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface AuthState {
  isSuccess: boolean;
  isError: boolean;
  user: UserData | null;
  isLoading: boolean;
  message: string;
}

const authState: AuthState = {
  isError: false,
  isSuccess: false,
  user: user ? user : null,
  isLoading: false,
  message: ''
}

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (user: UserData, thunkAPI)=> {
    try {
      return await authService.register(user)
    } catch(error: any) {
      const message =(error.res && error.res.data && error.res.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

const authSlice = createSlice({
  name: 'auth',
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
      .addCase(registerAsync.pending, (state: AuthState)=> {
        state.isLoading = true
      })
      .addCase(registerAsync.fulfilled, (state: AuthState, action: PayloadAction<UserData>)=> {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(registerAsync.rejected, (state: AuthState, action: PayloadAction<any>)=> {
        state.isLoading = false,
        state.isError = true,
        state.isError = action.payload,
        state.user = null
      })
  }
})



export const { reset } = authSlice.actions

export default authSlice.reducer