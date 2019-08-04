import firebase from 'react-native-firebase';

export const loginWithEmailAsync = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  firebase.auth().signOut();
};
