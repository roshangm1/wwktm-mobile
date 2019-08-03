import React from 'react';
import Toolbar from '../components/Toolbar';

const MainLayout = ({ title, menu = 'menu', children }) => {
  return (
    <>
      <Toolbar title={title} icon={menu} />
      {children}
    </>
  );
};
export default MainLayout;
