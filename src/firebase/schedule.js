import { auth } from 'react-native-firebase';

import { fireStoreRef } from '.';

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
  scheduleDetail.reviewCount = 0;
  await ref.set(scheduleDetail);
}

export async function rateATalk(talkId, rating, review) {
  let user = auth().currentUser;
  await fireStoreRef
    .collection('schedule')
    .doc(talkId)
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
