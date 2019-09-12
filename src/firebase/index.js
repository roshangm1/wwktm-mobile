import firebase from 'react-native-firebase';

export const fireStore = firebase.firestore;
export const storageRef = firebase.storage();
export const messagingRef = firebase.messaging();
export const fireStoreRef = fireStore();
export const { auth } = firebase;
