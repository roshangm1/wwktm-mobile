import firebase from 'react-native-firebase';

export const fireStore = firebase.firestore;
export const fireStoreRef = fireStore();
export const { auth } = firebase;
