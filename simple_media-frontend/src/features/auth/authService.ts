import axios from "axios";

type UserData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
  // "proxy": "http://localhost:8000",


const API_URL = 'http://localhost:8000/auth/signup'

const register = async(userData: UserData)=> {
  const res = await axios.post(API_URL, userData)

  if(res.data){
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data
}

const authService = {
  register
}

export default authService;