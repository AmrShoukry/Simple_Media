import React, { useState} from 'react';
import TextInput from '@/components/ui/input/TextInput';
import Button from '@/components/ui/button/Button';


interface Props {

}

const ForgetPassword: React.FC<Props> = () => {

  const [input, setInput] = useState({
    email: '',
  })

  const handInput =(e: React.ChangeEvent<HTMLInputElement>)=> {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setInput(values => ({...values, [name]: value}))
  }

  return (
    <section className='mx-4'>
      <div className='py-20'>
        <h3 className='text-black font-semibold text-2xl'>Reset Password</h3>
        <p className='text-grey2 text-14 py-2'>
        Type your authorized email address to receive rest password link.
        </p>

        <form className='mt-10 w-full'>
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
          <div className='mt-20'>
            <Button btnTitle='Sign In' />
          </div>
          
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
