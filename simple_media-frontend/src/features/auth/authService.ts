import axios from "axios";

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
  // "proxy": "http://localhost:8000",
interface User {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:8000'

const register = async(userData: UserData)=> {
  const res = await axios.post(`${API_URL}/auth/signup`, userData)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data
}

const login = async(user: User) => {
  const res = await axios.post(`${API_URL}/auth/login`, user)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data
}

const logout = async() => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout
}

export default authService;