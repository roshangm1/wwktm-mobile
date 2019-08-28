import React from 'react';
import Toolbar from '../components/Toolbar';

const MainLayout = ({ title, icon = 'menu', children }) => {
  return (
    <>
      <Toolbar title={title} icon={icon} />
      {children}
    </>
  );
};
export default MainLayout;
