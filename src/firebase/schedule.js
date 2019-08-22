import { fireStoreRef } from '.';
import { auth } from 'react-native-firebase';

export async function getProgramSchedule() {
  const scheduleData = await fireStoreRef.collection('schedule').get();
  return scheduleData.docs.map(schedule => schedule.data());
}

export async function addNewSchedule(scheduleDetail) {
  // Todo: Remove this once the function is properly used with object containing these fields
  let {
    name,
    startTime,
    endTime,
    description,
    speakerId,
    // Type here refers to different types of session, probably break, talk, game, outdoor activity etc
    type,
  } = scheduleDetail;

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
