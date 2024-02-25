import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { reset, logoutAsync } from '@/features/auth/authSlice';
import Avatar from '../ui/avatar/Avatar';

interface Props {

}

const TopNav: React.FC<Props> = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  // const { user } = useAppSelector(state => state.auth.user)

  const handleLogout =()=> {
    dispatch(logoutAsync())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='w-full z-20 h-70 left-280 bg-pry sticky top-0 text-grey4'>
      <nav className='h-full mx-10 flex items-center justify-between gap-x-4'>
        <button onClick={handleLogout}>logout</button>
        <div className='flex gap-x-4 items-center'>
          <p>Welcome back, <span className='font-bold'>{'Amr Shoukry'}</span></p>
          <Avatar firstname='amr' lastname='shokury' variant='light' />
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
