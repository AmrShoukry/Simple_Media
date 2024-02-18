import React from 'react';
import './input.scss'

interface Props {
  placeholder: string;
}

const TextInput: React.FC<Props> = (props) => {

  const { placeholder } = props;

  return (
    <div className="custom">
      <div className="w-full flex items-center h-full">
        <input 
          type='text'
          // :type="type" 
          // @input="getValue" 
          // :value="modelValue" 
          required
        />
        <span>{ placeholder }</span>
      </div>
  </div>
  );
}

export default TextInput;
