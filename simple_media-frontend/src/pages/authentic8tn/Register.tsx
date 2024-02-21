import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { registerAsync, reset } from '@/features/auth/authSlice';


interface Props {

}


const Register: React.FC<Props> = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsername =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setUsername(e.target.value)
  }

  const handleEmail =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setEmail(e.target.value)
  }
  
  const handleFirstName =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setFirstname(e.target.value)
  }

  const handleLastname =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setLastname(e.target.value)
  }

  const handlePassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setPassword(e.target.value)
  }

  const handleConfirmPassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setConfirmPassword(e.target.value)
  }


  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const {user, isError, isLoading, isSuccess, message} = useAppSelector(state => state.auth)
  
  useEffect(()=> {
    if(isError){
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/home')
    }

    dispatch(reset())
  }, [user, isError, navigate, isSuccess, message])

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()

    if(password !== confirmPassword){
      alert('password mismatch')
    } else {
      const userData = {
        firstname, 
        lastname, 
        username, 
        email, 
        password,
        passwordConfirm: confirmPassword
      }
      dispatch(registerAsync(userData))
    }
  }

  if(isLoading){
    return <span>loading...</span>
  }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl'>Create Account</h3>
        <p className='text-grey2 text-14 py-2'>Welcome! Let’s get your account set up.</p>

        <form onSubmit={handleSubmit} className='mt-10 w-full'>
          <div>
            <TextInput 
              placeholder="Enter your firstname"
              type="text"
              name='fname'
              value={firstname}
              handleInput={handleFirstName}
              inputId="fname"
              label="firstname"
           />
          </div>
          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your lastname"
              type="text"
              name='lname'
              value={lastname}
              handleInput={handleLastname}
              inputId="lname"
              label="Lastname"
           />
          </div>
          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your username"
              type="text"
              name='text'
              value={username}
              handleInput={handleUsername}
              inputId="text"
              label="Username"
           />
          </div>

          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your email"
              type="email"
              name='email'
              value={email}
              handleInput={handleEmail}
              inputId="email"
              label="Email"
           />
          </div>
          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your password"
              type="password"
              name='password'
              value={password}
              handleInput={handlePassword}
              inputId="pwd"
              label="Password"
            />
          </div>
          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your password"
              type="password"
              name='password2'
              value={confirmPassword}
              handleInput={handleConfirmPassword}
              inputId="password2"
              label="Confirm Password"
            />
          </div>
          <div className='mt-16'>
            <Button btnTitle='Create Account' />
          </div>
          <p className='text-grey2 text-14 mt-4 text-center'>
          Already have an account? <Link to='/login' className='text-pry'>Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
