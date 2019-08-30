import { auth } from 'react-native-firebase';

import { fireStoreRef, fireStore } from '.';

export async function getProgramSchedule(updateProgramSchedule) {
  fireStoreRef
    .collection('schedule')
    .orderBy('endTime', 'asc')
    .onSnapshot(data => {
      updateProgramSchedule(data.docs.map(d => d.data()));
    });
}

export async function addNewSchedule(scheduleDetail) {
  let ref = fireStoreRef.collection('schedule').doc();
  scheduleDetail.id = ref.id;
  scheduleDetail.rating = 0;
  scheduleDetail.likedBy = [];
  scheduleDetail.reviewCount = 0;
  await ref.set(scheduleDetail);
}

export async function rateATalk(id, rating, review) {
  const user = auth().currentUser;
  await fireStoreRef
    .collection('schedule')
    .doc(id)
    .collection('reviews')
    .doc(user.uid)
    .set({
      uid: user.uid,
      name: user.displayName,
      imageUrl: user.photoURL,
      rating,
      review,
      date: new Date().getTime(),
    });
}

export async function likeASession(session) {
  const user = auth().currentUser;
  const likedBy = session.likedBy || [];
  fireStoreRef
    .collection('schedule')
    .doc(session.id)
    .update({
      likedBy: likedBy.includes(user.uid)
        ? fireStore.FieldValue.arrayRemove(user.uid)
        : fireStore.FieldValue.arrayUnion(user.uid),
    });
}

export async function getFavouriteSessions(updateFavouriteSessions) {
  const user = auth().currentUser;
  fireStoreRef
    .collection('schedule')
    .where('likedBy', 'array-contains', user.uid)
    .onSnapshot(data => {
      updateFavouriteSessions(data.docs.map(d => d.data()));
    });
}
export async function getTalkDetail(talkId) {
  let talk = await fireStoreRef
    .collection('schedule')
    .doc(talkId)
    .get();
  return talk.data();
}
