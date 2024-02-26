import React, { useEffect } from 'react';
import Avatar from '../ui/avatar/Avatar';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getUserAsync } from '@/features/auth/authSlice';


interface Props {

}


const TopNav: React.FC<Props> = () => {

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth)

  useEffect(()=> {
    dispatch(getUserAsync())
  }, [dispatch])

//  console.log(user.isSuccess)

  return (
    <header className='w-full z-20 h-70 left-280 bg-pry sticky top-0 text-grey4'>
      <nav className='h-full mx-10 flex items-center justify-end gap-x-4'>
        <p>Welcome back, <span className='font-bold capitalize'>{ user?.user?.data?.username }</span></p>
        {user.isSuccess && <Avatar 
          firstname={user?.user?.data.firstName as string} 
          lastname={user?.user?.data.lastName as string} 
          variant='light' 
        />}
      </nav>
    </header>
  );
}

export default TopNav;
