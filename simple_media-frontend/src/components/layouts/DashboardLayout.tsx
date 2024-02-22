import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../dashboard/SideNav';
import TopNav from '../dashboard/TopNav';
import './layout.scss'


interface Props {

}

const DashboardLayout: React.FC<Props> = () => {
  return (
    <main className='bg-pry w-full'>
      <SideNav  />
      <div className='w-topNav relative top-0 left-280'>
        <TopNav  />
        <section className='w-full bg-grey4 round min-h-screen'>
          <div className='mx-5 my-4'>
            <Outlet  />
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardLayout;
