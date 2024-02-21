import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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


// interface AuthState {
//   isUserAuthenticated: boolean;
//   user: User | null;
//   error: string | null;
// }

// const authState:AuthState = {
//   isUserAuthenticated: false,
//   user: null,
//   error: null
// }

// export const userLoginAsync = createAsyncThunk(
//   'auth/login',
//   async(credentials: {email: string; password: string;}, { rejectWithValue })=> {
//     try {
//       const res = await fetch('http://localhost:8000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials)
//       })
//       if (!res.ok) {
//         const errorData = await res.json();
//         return rejectWithValue(errorData.message);
//       }
//       const data = await res.json();
//       return data;
//     } catch(error) {
//       return rejectWithValue('error occurred')
//     }
//   }
// )

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: authState,
//   reducers: {},
//   extraReducers: (builder)=> {
//     builder.addCase(userLoginAsync.fulfilled, (state: AuthState, action) => {
//       state.isUserAuthenticated = true,
//       state.user = action.payload.user,
//       state.error = null
//     })
//   }
// })


export const { reset } = authSlice.actions

export default authSlice.reducer