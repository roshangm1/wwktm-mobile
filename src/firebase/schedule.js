import { fireStoreRef } from '.';

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
  await ref.set(scheduleDetail);
}
