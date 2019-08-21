import { fireStoreRef } from '.';
import firebase from 'react-native-firebase';

export async function addNoteForTalk(talkId, note = 'hello world') {
    var user = firebase.auth().currentUser;
    fireStoreRef
        .collection('notes')
        .doc()
        .set({
            uid: user.uid,
            name: user.displayName,
            imageUrl: user.photoURL,
            note,
            talkId,
            date: new Date().getTime(),
        })
}

export async function getMyNotesFor(talkId) {
    var user = firebase.auth().currentUser;
    var notesData = await fireStoreRef
        .collection('notes')
        .where("uid", "==", user.uid)
        .get();
    return notesData.docs.map((d) => d.data());
}

export async function getAllNotes(talkId) {
    const notesData = await fireStoreRef
        .collection('notes')
        .where("talkId", "==", talkId)
        .get();
    return notesData.docs.map((d) => d.data());
}
