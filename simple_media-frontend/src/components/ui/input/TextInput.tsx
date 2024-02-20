import React from 'react';
import { useState } from 'react'
import { GrMailOption } from 'react-icons/gr'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiFillLock } from 'react-icons/ai'
import { AiFillUnlock } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import './input.scss'

interface Props {
  placeholder: string;
  type: 'text'|'email'|'password';
  value: string;
  name: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputId?: string;
  label: string;
  // onChange: (name: string, value: string) => void;
}

const TextInput: React.FC<Props> = (props) => {

  const { placeholder, type, value, name, inputId, label, handleInput } = props;

  const [hidePassword, setHidePassword] = useState({
    type: type,
    showPassword: false
  })

  const togglePassword =()=> {
    setHidePassword({...hidePassword, showPassword: !hidePassword.showPassword})
  }


  const getType = hidePassword.type === 'password'
    ? hidePassword.showPassword
      ? 'text'
      : hidePassword.type
    : hidePassword.type;

  // const handleInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   onChange((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value);
  // }; 

  return (
    <>
      <label className='capitalize mb-3 block' htmlFor={inputId}>{ label }</label>
      <div className="input focus-within:border-pry focus-within:border focus:border-solid">
      { hidePassword.type === "password" &&
        <span>
          { hidePassword.showPassword ?
            <AiFillUnlock className='icon'/> :
            <AiFillLock className='icon'/>
          }
        </span> 
      }
      {hidePassword.type === 'text' && <FaUserAlt className='icon' /> }
      { hidePassword.type === "email" && <GrMailOption className='icon'/> }
      <input
        type={getType}
        value={value}
        onChange={handleInput}
        name={name}
        id={inputId}
        placeholder={placeholder}
      />
      <span onClick={togglePassword} className="input__btn">
        { hidePassword.type === "password" ?
            <span>
              {
                hidePassword.showPassword ?
                <AiOutlineEye className='icon' /> :
                <AiOutlineEyeInvisible className='icon' />
              }
            </span>
          :
            ''
        }
      </span>
    </div>
    </>
  );
}

export default TextInput;
