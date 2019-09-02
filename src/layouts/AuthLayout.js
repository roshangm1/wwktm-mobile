import React from 'react';
import { ImageBackground, View } from 'react-native';

const AuthLayout = ({ children }) => (
  <ImageBackground
    source={require('../assets/images/wwktm.jpeg')}
    style={{ height: '100%', width: '100%' }}
  >
    {children}
  </ImageBackground>
);

export default AuthLayout;
