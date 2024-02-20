import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';


interface Props {

}


const Register: React.FC<Props> = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setUsername(e.target.value)
  }
  const handleEmail =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setEmail(e.target.value)
  }
  const handlePassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setPassword(e.target.value)
  }

  // const handInput =(e: React.ChangeEvent<HTMLInputElement>)=> {
  //   const { name, value } = e.target
  //   setInput(prevInputs => ({...prevInputs, [name]: value}))
  //   console.log(input.username)
  // }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl'>Create Account</h3>
        <p className='text-grey2 text-14 py-2'>Welcome! Let’s get your account set up.</p>

        <form className='mt-10 w-full'>
          <div>
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
