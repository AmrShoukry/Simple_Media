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
  type: string;
  value: string;
  name: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  label: string;
}

const TextInput: React.FC<Props> = (props) => {

  const { placeholder, type, value, name, handleInput, inputId, label } = props;

  const [hidePassword, setHidePassword] = useState({
    type: type,
    showPassword: false
  })

  const togglePassword =()=> {
    setHidePassword({...hidePassword, showPassword: !hidePassword.showPassword})
  }

  return (
    <>
      <label className='capitalize' htmlFor={inputId}>{ label }</label>
      <div className="input">
      { hidePassword.type === "password" ?
        <span>
          { hidePassword.showPassword ?
            <AiFillUnlock className='icon'/> :
            <AiFillLock className='icon'/>
          }
        </span> :
        null
      }
      { hidePassword.type === "email" ? <GrMailOption className='icon'/> : null }
      <input
        type={
            (hidePassword.type === 'password')
            ? (hidePassword.showPassword ? 'text' : hidePassword.type)
            : hidePassword.type
          }
        value={value}
        onChange={handleInput}
        name={name}
        id={inputId}
        placeholder={placeholder}
      />
      <button onClick={togglePassword} className="input__btn">
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
      </button>
      {hidePassword.type === 'text' ? <FaUserAlt /> : null}
      </div>
    </>
  );
}

export default TextInput;
