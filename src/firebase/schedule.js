import { auth } from 'react-native-firebase';

import { fireStoreRef, fireStore } from '.';

export async function getProgramSchedule() {
  const scheduleData = await fireStoreRef
    .collection('schedule')
    .orderBy('endTime', 'asc')
    .get();
  return scheduleData.docs.map(schedule => schedule.data());
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
  let user = auth().currentUser;
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
  let user = auth().currentUser;
  var likedBy = session.likedBy || [];
  fireStoreRef
    .collection('schedule')
    .doc(session.id)
    .update({
      likedBy: likedBy.includes(user.uid)
        ? fireStore.FieldValue.arrayRemove(user.uid)
        : fireStore.FieldValue.arrayUnion(user.uid),
    });
}
