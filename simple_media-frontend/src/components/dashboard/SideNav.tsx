import React from 'react';

interface Props {

}

const SideNav: React.FC<Props> = () => {
  return (
    <aside className='w-280 bg-pry fixed inset-y-0 flex flex-col text-textPry'>
      <nav className='overflow-y-auto w-full'>
        <div></div>
      </nav>
    </aside>
  );
}

export default SideNav;
