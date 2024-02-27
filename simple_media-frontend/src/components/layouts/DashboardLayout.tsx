import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SideNav from '../dashboard/SideNav';
import TopNav from '../dashboard/TopNav';
// import Modal from '../ui/modal/Modal';
import { useAppSelector } from '@/app/hooks';
// import { getUserAsync } from '@/features/auth/authSlice';
import './layout.scss'


interface Props {

}

const DashboardLayout: React.FC<Props> = () => {

  // const showModal = useAppSelector(state => state.posts.showModal)

  // const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth)

  // const navigate = useNavigate()

  // useEffect(()=> {
  //   dispatch(getUserAsync())
  // }, [dispatch])

  if(!user.user) {
    return(
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-red-500'>Welcome to Simple_Media!!!</h2>
          <Link to={'/login'} className='text-blue-700 italic'>login to get started</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className='w-full min-h-screen flex'>
        <SideNav  />
        <div className='w-topNav relative top-0 left-280'>
          <TopNav  />
          <section className='w-full bg-grey4 min-h-screen flex justify-between'>
            <div className='px-12 py-10 w-rem'>
              <Outlet  />
            </div>
            <div className='w-300 bg-'>
              <h3>Who's online</h3>
            </div>
          </section>
        </div>
      </main>
      {/* {showModal && user.isSuccess 
        && <Modal 
            firstname={user?.user?.data?.firstName as string} 
            lastname={user?.user?.data?.lastName as string} 
            username={user?.user?.data?.username as string} 
          />
      } */}
    </>
  );
}

export default DashboardLayout;
