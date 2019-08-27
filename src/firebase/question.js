import { fireStoreRef, auth } from '.';
import firebase from 'react-native-firebase';

export async function addQuestionForTalk({ question, talkId }) {
  let user = auth.currentUser;
  let ref = fireStoreRef.collection('questions').doc();
  await ref.set({
    id: ref.id,
    question,
    talkId,
    name: user.displayName,
    uid: user.uid,
    imageUrl: user.photoURL,
    date: new Date().getTime(),
    upvotes: 0,
    voters: [],
  });
}

export async function getTopVotedQuestions(count = 10) {
  return (await fireStoreRef
    .collection('questions')
    .orderBy('upvotes', 'desc')
    .limit(count)
    .get()).docs.map(d => d.data());
}

export async function getQuestionsForTalk(talkId) {
  return (await fireStoreRef
    .collection('questions')
    .where('talkId', '==', talkId)
    .orderBy('upvotes', 'desc')
    .get()).docs.map(d => d.data());
}

export async function getMyQuestions() {
  let user = auth().currentUser;
  return (await fireStoreRef
    .collection('questions')
    .where('uid', '==', user.uid)
    .get()).docs.map(d => d.data());
}

export async function upvoteAQuestion(questionId) {
  await firebase
    .functions()
    .httpsCallable('upvoteAQuestion')
    .call({
      questionId,
    });
}