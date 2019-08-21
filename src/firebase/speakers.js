import { fireStoreRef } from '.';

export async function getAllSpeakers() {
  const speakersList = await fireStoreRef.collection('speakers').get();
  return speakersList.docs.map(speaker => speaker.data());
}

export async function getSpeaker(speakerId) {
  return (await fireStoreRef
    .collection('speakers')
    .doc(speakerId)
    .get()).data();
}
