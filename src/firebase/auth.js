import firebase from 'react-native-firebase';

export const loginWithEmailAsync = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signupWithEmail = async ({ name, email, password }) => {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return user.updateProfile({ displayName: name });
};

export const logout = () => {
  firebase.auth().signOut();
};
