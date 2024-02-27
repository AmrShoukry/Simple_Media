import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counterSlice'
import authReducer from '@/features/auth/authSlice'
import postReducer from '@/features/posts/postSlice'
// import loginReducer from '@/features/auth/loginSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    posts: postReducer,
    // login: loginReducer
  }
}) 



export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;