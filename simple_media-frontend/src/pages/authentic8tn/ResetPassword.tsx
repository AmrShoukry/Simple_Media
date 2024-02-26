import React, { useState, useEffect} from 'react';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { forgetPasswordAsync, reset } from '@/features/auth/authSlice';
interface Props {

}

const ResetPassword: React.FC<Props> = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [input, setInput] = useState({
    email: '',
  })
  const {email } = input

  const {user, isError, isSuccess, message} = useAppSelector(state => state.auth)
  
  useEffect(()=> {
    if(isError){
      console.log(message)
    }
    if(isSuccess){
      navigate('/forget-password')
    }

    dispatch(reset())
  }, [user, isError, navigate, isSuccess, message, dispatch])

  const handInput =(e: React.ChangeEvent<HTMLInputElement>)=> {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setInput(values => ({...values, [name]: value}))
  }

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
     
      dispatch(forgetPasswordAsync(email)) 
      console.log(email);
      
  }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl'>Reset Password</h3>
        <p className='text-grey2 text-14 py-2'>
        Type your authorized email address to receive reset password link.
        </p>

        <form onSubmit={handleSubmit} className='mt-10 w-full'>
          <div>
            <TextInput 
              placeholder="Enter your email"
              type="email"
              name='email'
              value={email}
              handleInput={handInput}
              inputId="email"
              label="Email"
           />
          </div>
          
          <div className='mt-20'>
            <Button btnTitle='Send Reset Password Link' />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
