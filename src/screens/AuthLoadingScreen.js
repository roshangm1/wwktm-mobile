import { useEffect } from 'react';
import { auth } from '../firebase';
import { uploadToken } from '../firebase/auth';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      uploadToken();
      navigation.navigate('AppStack');
    } else {
      navigation.navigate('AuthStack');
    }
  }, [navigation]);

  return null;
};

export default AuthLoading;
