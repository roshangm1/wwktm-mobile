import { fireStoreRef } from '.';

export async function getProgramSchedule() {
  const scheduleData = await fireStoreRef.collection('schedule').get();
  return scheduleData.docs.map(schedule => schedule.data());
}