import React from 'react';
import { Outlet } from "react-router-dom";

interface Props {

}

const Layout: React.FC<Props> = () => {
  return (
    <main className='w-full bg-grey1'>
      <section className='w-[600px] mx-auto bg-white min-h-screen rounded-lg'>
        <Outlet  />
      </section>
    </main>
  );
}

export default Layout;
