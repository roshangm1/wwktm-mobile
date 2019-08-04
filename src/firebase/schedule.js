import { fireStoreRef } from '.';
import firebase from 'react-native-firebase';

export async function getProgramSchedule() {
  const scheduleData = await fireStoreRef.collection('schedule').get();
  return scheduleData.docs.map(schedule => schedule.data());
}

export async function addNoteForTalk(talkId, note = 'hello world') {
  fireStoreRef
    .collection('talks')
    .doc(talkId)
    .update({ notes: firebase.firestore.FieldValue.arrayUnion(note) });
}
