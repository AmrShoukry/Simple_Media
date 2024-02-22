import React, { useState} from 'react';
// import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Link } from 'react-router-dom';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';
// import { userLoginAsync } from '@/features/auth/authSlice';


interface Props {

}

const Login: React.FC<Props> = () => {

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  // const error  = useAppSelector(state => state.auth)

  // const dispatch = useAppDispatch()

  const handInput =(e: React.ChangeEvent<HTMLInputElement>)=> {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setInput(values => ({...values, [name]: value}))
  }

  const handleSubmit =( e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    // dispatch(userLoginAsync(input))
    // console.log(error);
    
  }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl'>Sign In</h3>
        <p className='text-grey2 text-14 py-2'>Welcome back...</p>

        <form onSubmit={handleSubmit} className='mt-10 w-full'>
          <div>
            <TextInput 
              placeholder="Enter your email"
              type="email"
              name='email'
              value={input.email}
              handleInput={handInput}
              inputId="email"
              label="Email"
           />
          </div>
          <div className='mt-8'>
            <TextInput 
              placeholder="Enter your password"
              type="password"
              name='password'
              value={input.password}
              handleInput={handInput}
              inputId="pwd"
              label="Password"
            />
          </div>
          <div className='w-full flex justify-end capitalize text-pry text-14 mt-2'>
            <Link to="/reset-password">forget password?</Link>
          </div>
          <div className='mt-10'>
            <Button btnTitle='Sign In' />
          </div>
          <p className='text-grey2 text-14 mt-4 text-center'>
          Don’t have an account? <Link to='/register' className='text-pry'>Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
