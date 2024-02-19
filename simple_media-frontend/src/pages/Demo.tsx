import { useState } from "react"
import TextInput from "../components/ui/input/TextInput"

export const Demo = () => {

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handInput =(e: React.ChangeEvent<HTMLInputElement>)=> {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setInput(values => ({...values, [name]: value}))
  }

  return (
    <div>
      <div className="py-5">
        <TextInput 
          placeholder="Enter your password"
          type="password"
          name='password'
          value={input.password}
          handleInput={handInput}
          inputId="pwd"
          label="Password"
        />
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
    </div>
  )
}
