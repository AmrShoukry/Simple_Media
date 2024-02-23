import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../dashboard/SideNav';
import TopNav from '../dashboard/TopNav';
import Modal from '../ui/modal/Modal';
import { useAppSelector } from '@/app/hooks';
import './layout.scss'


interface Props {

}

const DashboardLayout: React.FC<Props> = () => {

  const showModal = useAppSelector(state => state.posts.showModal)
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
      {showModal && <Modal  />}
    </>
  );
}

export default DashboardLayout;
