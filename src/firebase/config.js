import { fireStoreRef } from '.';

export async function getScheduleConfig() {
  const scheduleConfig = await fireStoreRef
    .collection('config')
    .doc('schedule')
    .get();
  return scheduleConfig.data();
}
