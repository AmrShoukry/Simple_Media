import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useAppDispatch } from '@/app/hooks';
import { reset, logoutAsync } from '@/features/auth/authSlice';




interface Props {

}

const SideNav: React.FC<Props> = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  // const { user } = useAppSelector(state => state.auth.user)

  const handleLogout =()=> {
    dispatch(logoutAsync())
    dispatch(reset())
    navigate('/login') 
  }

  return (
    <aside className='w-280 bg-pry fixed inset-y-0 flex flex-col text-textPry'>
      <nav className='overflow-y-auto w-full pt-7'>
        <Link to={'/home'} className='text-[28px] pl-9 font-extrabold italic'>Simple_Media</Link>

        <ul className='py-10 pl-9'>
          <li className='text-16 font-bold'>
            <Link to={'/home'} className='flex items-center py-4 gap-x-2'>
              <GoHome  />
              <span>Home</span>
            </Link>
          </li>
          <li className='text-16 font-bold'>
            <Link to={'/home'} className='flex items-center py-4 gap-x-2'>
              <FaRegUser  />
              <span>My Profile</span>
            </Link>
          </li>
          <li className='text-16 font-bold'>
            <button type='submit' onClick={handleLogout} className='flex items-center py-4 gap-x-2'>
              <CiLogout  />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
