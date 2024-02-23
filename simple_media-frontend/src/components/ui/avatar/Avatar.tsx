import React from 'react';

interface Props {
  firstname: string;
  lastname: string;
  variant: 'pry'|'light';
}

const Avatar: React.FC<Props> = (props) => {
  const { firstname, lastname, variant } = props
  return (
    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${variant === 'pry' ? 'bg-pry text-grey4' : 'bg-white text-pry'}`}>
      <div className='uppercase text-18'>{firstname[0]}{lastname[0]}</div>
    </div>
  );
}

export default Avatar;
