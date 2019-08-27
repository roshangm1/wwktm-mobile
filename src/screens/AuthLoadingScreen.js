import { useEffect } from 'react';
import { auth } from '../firebase';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const currentUser = auth().currentUser;
    navigation.navigate(currentUser ? 'AppStack' : 'AuthStack');
  }, [navigation]);

  return null;
};

export default AuthLoading;
