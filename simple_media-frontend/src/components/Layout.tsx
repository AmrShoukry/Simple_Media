import React from 'react';
import { Outlet } from "react-router-dom";

interface Props {

}

const Layout: React.FC<Props> = () => {
  return (
    <main>
      <Outlet  />
    </main>
  );
}

export default Layout;
