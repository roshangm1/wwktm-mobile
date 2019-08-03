import { useEffect } from 'react';
import { auth } from '../firebase';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const currentUser = auth().currentUser;
    navigation.navigate(currentUser ? 'AppStack' : 'AuthStack');
  }, []);

  return null;
};

export default AuthLoading;
