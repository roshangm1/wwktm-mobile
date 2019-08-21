import { fireStoreRef } from '.';
import firebase from 'react-native-firebase';

export async function addQuestionForTalk({ question, talkId }) {
  var user = firebase.auth().currentUser;
  var ref = fireStoreRef.collection('questions').doc();
  await ref.setData({
    id: ref.id,
    question,
    talkId,
    name: user.displayName,
    uid: user.uid,
    imageUrl: user.photoURL,
    date: new Date().getTime(),
    upvotes: 0,
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
  var user = firebase.auth().currentUser;
  return (await fireStoreRef
    .collection('questions')
    .where('uid', '==', user.uid)
    .get()).docs.map(d => d.data());
}

export async function upvoteAQuestion(questionId) {
  // TODO: Add a cloud functon to process the upvote.
  await firebase
    .functions()
    .httpsCallable('upvoteAQuestion')
    .call({
      questionId,
    });
}
