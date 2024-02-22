import React from 'react';
import Avatar from '../ui/avatar/Avatar';

interface Props {

}

const TopNav: React.FC<Props> = () => {
  return (
    <header className='w-full left-280 bg-pry sticky top-0'>
      <nav className='h-70 mx-10 flex items-center justify-end pt-3'>
        <Avatar firstname='amr' lastname='shokury' />
      </nav>
    </header>
  );
}

export default TopNav;
