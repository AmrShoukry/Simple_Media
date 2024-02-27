import React from 'react';
import { GoPencil } from "react-icons/go";
import Avatar from '../ui/avatar/Avatar';



interface Props {
  openModal: ()=> void;
  firstname: string;
  lastname: string;
  username: string;
}

const Header: React.FC<Props> = (props) => {

  const { openModal, firstname, lastname, username} = props;

  return (
    <div onClick={openModal} className='w-500 py-7 cursor-pointer border bg-white border-solid border-grey5 rounded-md relative px-6'>
      <div className='w-full flex items-center gap-x-5'>
        <Avatar 
          firstname={firstname} 
          lastname={lastname} 
          variant='pry' 
        />
        <h2 className='text-gray-400 text-2xl'>
          Share what's on your mind, {username}...
        </h2>
      </div>
      <span className='absolute right-6 top-11'>
        <GoPencil  />
      </span>
    </div>
  );
}

export default Header;
