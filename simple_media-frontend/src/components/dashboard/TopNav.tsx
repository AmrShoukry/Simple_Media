import React from 'react';
import Avatar from '../ui/avatar/Avatar';

interface Props {

}

const TopNav: React.FC<Props> = () => {
  return (
    <header className='w-full h-70 left-280 bg-pry sticky top-0 text-grey4'>
      <nav className='h-full mx-10 flex items-center justify-end gap-x-4'>
        <p>Welcome back, <span className='font-bold'>{'Amr Shoukry'}</span></p>
        <Avatar firstname='amr' lastname='shokury' variant='light' />
      </nav>
    </header>
  );
}

export default TopNav;
