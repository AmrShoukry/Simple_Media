import React, { useState} from 'react';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';


interface Props {

}

const ForgetPassword: React.FC<Props> = () => {


  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handlePassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setPassword(e.target.value)
  }

  const handleConfirmPassword =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setConfirmPassword(e.target.value)
  }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl capitalize'>create new password</h3>
        <p className='text-grey2 text-14 py-2'>
          Type your new strong password. 
          Your password must include:- Uppercase letter &  lowercase letter at least, One Special character & minimum of 8 digits long
        </p>

        <form className='mt-10 w-full'>
          <div>
            <TextInput 
              placeholder="Enter your password"
              type="password"
              name='pwd'
              value={password}
              handleInput={handlePassword}
              inputId="pwd"
              label="Password"
            />
          </div>
          <div className='mt-10'>
            <TextInput 
              placeholder="Confirm your password"
              type="password"
              name='password'
              value={confirmPassword}
              handleInput={handleConfirmPassword}
              inputId="confirmpwd"
              label="Confirm Password"
            />
          </div>
          <div className='mt-20'>
            <Button btnTitle='Confirm Changes' />
          </div>
          
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
