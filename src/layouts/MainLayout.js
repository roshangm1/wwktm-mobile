import React from 'react';
import Toolbar from '../components/Toolbar';
import Container from '../components/Container';

const MainLayout = ({ title, icon = 'menu', children }) => {
  return (
    <Container>
      <Toolbar title={title} icon={icon} />
      {children}
    </Container>
  );
};
export default MainLayout;
