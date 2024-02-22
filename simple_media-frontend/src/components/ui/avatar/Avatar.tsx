import React from 'react';

interface Props {
  firstname: string;
  lastname: string;
}

const Avatar: React.FC<Props> = (props) => {
  const { firstname, lastname } = props
  return (
    <div className='w-11 h-11 bg-white text-pry rounded-full flex items-center justify-center'>
      <div className='uppercase text-18'>{firstname[0]}{lastname[0]}</div>
    </div>
  );
}

export default Avatar;
