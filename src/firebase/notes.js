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

export async function getMyNotesFor(talkId) {
  let user = firebase.auth().currentUser;
  let notesData = await fireStoreRef
    .collection('notes')
    .where('uid', '==', user.uid)
    .where('talkId', '==', talkId)
    .get();
  return notesData.docs.map(d => d.data());
}

export async function getAllNotes(talkId) {
  const notesData = await fireStoreRef
    .collection('notes')
    .where('talkId', '==', talkId)
    .get();
  return notesData.docs.map(d => d.data());
}
