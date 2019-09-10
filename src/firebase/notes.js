import { fireStoreRef, auth } from '.';
import firebase from 'react-native-firebase';

export async function addNoteForTalk(talkId, note = 'hello world') {
  let user = auth().currentUser;
  let ref = fireStoreRef.collection('notes').doc();

  await ref.set({
    id: ref.id,
    uid: user.uid,
    name: user.displayName,
    imageUrl: user.photoURL,
    note,
    talkId,
    date: new Date().getTime(),
  });
}

export function getMyNotesFor(talkId, updateNotes) {
  let user = firebase.auth().currentUser;
  fireStoreRef
    .collection('notes')
    .where('uid', '==', user.uid)
    .where('talkId', '==', talkId)
    .onSnapshot(data => {
      const allNotes = data.docs.map(d => d.data());

      updateNotes(allNotes);
    });
}

export function getAllNotes(updateNotes) {
  let user = firebase.auth().currentUser;
  fireStoreRef
    .collection('notes')
    .where('uid', '==', user.uid)
    .onSnapshot(data => {
      const allNotes = data.docs.map(d => d.data());

      updateNotes(allNotes);
    });
}
