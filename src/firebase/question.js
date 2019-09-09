import { fireStoreRef, auth, fireStore } from '.';

export async function addQuestionForTalk(talkId, question, anonymous) {
  let user = auth().currentUser;

  let ref = fireStoreRef.collection('questions').doc();
  await ref.set({
    id: ref.id,
    question,
    anonymous,
    talkId,
    name: !anonymous ? user.displayName : 'WWKTM User',
    uid: user.uid,
    imageUrl: user.photoURL,
    date: new Date().getTime(),
    voters: [],
    upvoteCount: 0,
  });
}

export async function getTopVotedQuestions(count = 10) {
  return (await fireStoreRef
    .collection('questions')
    .orderBy('upvoteCount', 'desc')
    .limit(count)
    .get()).docs.map(d => d.data());
}

export async function getQuestionsForTalk(talkId) {
  return (await fireStoreRef
    .collection('questions')
    .where('talkId', '==', talkId)
    .orderBy('upvoteCount', 'desc')
    .get()).docs.map(d => d.data());
}

export async function getAllQuestions(updateQuestions) {
  fireStoreRef
    .collection('questions')
    .orderBy('upvoteCount', 'desc')
    .onSnapshot(data => {
      updateQuestions(data.docs.map(d => d.data()));
    });
}

export async function getMyQuestions() {
  let user = auth().currentUser;
  return (await fireStoreRef
    .collection('questions')
    .where('uid', '==', user.uid)
    .get()).docs.map(d => d.data());
}

export async function upvoteAQuestion(question) {
  let user = auth().currentUser;
  const voters = question.voters || [];
  fireStoreRef
    .collection('questions')
    .doc(question.id)
    .update({
      voters: voters.includes(user.uid)
        ? fireStore.FieldValue.arrayRemove(user.uid)
        : fireStore.FieldValue.arrayUnion(user.uid),
    });
}
