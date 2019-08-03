import firebase from 'react-native-firebase';

export const loginAnon = () => {
  firebase
    .auth()
    .signInAnonymously()
    .then(cred => console.log(cred));
};

export const logout = () => {
  firebase.auth().signOut();
};
