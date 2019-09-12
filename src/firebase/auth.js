import firebase from 'react-native-firebase';
import { fireStoreRef, messagingRef } from '.';

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

export const addUserDetail = async () => {
  const user = firebase.auth().currentUser;
  await fireStoreRef
    .collection('users')
    .doc(user.uid)
    .set(
      {
        ...user,
      },
      { merge: true },
    );
};

export const uploadToken = async () => {
  const user = firebase.auth().currentUser;
  const token = await messagingRef.getToken();
  await fireStoreRef
    .collection('users')
    .doc(user.uid)
    .set(
      {
        token,
      },
      { merge: true },
    );
};
