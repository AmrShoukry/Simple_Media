import React from 'react';

interface Props {
  btnTitle: string;
}

const Button: React.FC<Props> = (props) => {

  const { btnTitle } = props;
  return (
    <button className='w-full rounded-10 text-center bg-pry text-white cursor-pointer py-3'>
      { btnTitle }
    </button>
  );
}

export default Button;
