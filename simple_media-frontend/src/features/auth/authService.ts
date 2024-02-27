// import axios from '../../services';
import axios from "axios";

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  data?: Data;
}

  // "proxy": "http://localhost:8000",
interface User {
  email: string;
  password: string;
  data?: Data;
  // token: string;
}


const API_URL = 'http://localhost:8000'

const register = async(userData: UserData)=> {
  const res = await axios.post(`${API_URL}/auth/signup`, userData)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data.token))
  }

  return res.data
}

const login = async(user: User) => {
  const res = await axios.post(`${API_URL}/auth/login`, user)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data.token))
  }

  return res.data as User
}

const logout = async() => {
  const res = await axios.post(`${API_URL}/auth/logout`)
  localStorage.removeItem('user')
  return res.data
}

const forgetPassword = async(userEmail: string)=> {
  const res = await axios.post(`${API_URL}/auth/forgetPassword`, userEmail)
  return res.data
}

// const getUserData = async()=> {
//   const res = await axios.get(`${API_URL}/me/data`, {
//     headers: {
//       Authorization : `Bearer ${localStorage.getItem('user')}`
//     }
//   })
//   return res.data as UserData
// }
const getUserData =async()=> {
  const token = JSON.parse(localStorage.getItem('user') as string)
  const res = await axios.get(`${API_URL}/me/data`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

const authService = {
  register,
  login,
  logout,
  forgetPassword,
  getUserData
}

export default authService;