/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { User, UserData, AuthState, } from "../types";


// get user from localstorage
const user = JSON.parse(localStorage.getItem('user') as string)

interface LoginState {
  isSuccess: boolean;
  isError: boolean;
  user: User | null;
  isLoading: boolean;
  message: string;
  // token: string;
}

// export type UserDetails = {
//   user: UserData;
// }


const authState: AuthState = {
  isError: false,
  isSuccess: false,
  user: user ? user : null,
  isLoading: false,
  message: '',
  // token: ''
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

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (user: User, thunkAPI)=> {
    try {
      return await authService.login(user)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      const message =(error.res && error.res.data && error.res.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const getUserAsync = createAsyncThunk(
  'auth/getData',
  async()=> {
    try {
      return await authService.getUserData()
    } catch(error) {
      console.log('error msg')
    }
  }
)

export const forgetPasswordAsync = createAsyncThunk(
  'auth/forget-password',
  async(user: string, thunkAPI)=> {
    try {
      return await authService.forgetPassword(user)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      const message =(error.res && error.res.data && error.res.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async() => {
    await authService.logout()
  }
)


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

      .addCase(loginAsync.pending, (state: AuthState)=> {
        state.isLoading = true
      })
      .addCase(loginAsync.fulfilled, (state: LoginState, action: PayloadAction<User>)=> {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state: AuthState, action: PayloadAction<any>)=> {
        state.isLoading = false,
        state.isError = true,
        state.isError = action.payload,
        state.user = null
      })

      .addCase(forgetPasswordAsync.pending, (state: AuthState)=> {
        state.isLoading = true
      })
      .addCase(forgetPasswordAsync.fulfilled, (state: AuthState, action: PayloadAction<UserData>)=> {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(forgetPasswordAsync.rejected, (state: AuthState, action: PayloadAction<any>)=> {
        state.isLoading = false,
        state.isError = true,
        state.isError = action.payload,
        state.user = null
      })

      .addCase(getUserAsync.pending, (state: AuthState)=> {
        state.isLoading = true
      })
      .addCase(getUserAsync.fulfilled, (state: AuthState, action: PayloadAction<any>)=> {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(getUserAsync.rejected, (state: AuthState, action: PayloadAction<any>)=> {
        state.isLoading = false,
        state.isError = true,
        state.isError = action.payload,
        state.user = null
      })



      .addCase(logoutAsync.fulfilled, (state: AuthState) => {
        state.user = null
      })
  }
})



export const { reset } = authSlice.actions

export default authSlice.reducer