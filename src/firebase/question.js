import { fireStoreRef } from '.';
import firebase from 'react-native-firebase';

export async function addQuestionForTalk({ question, talkId }) {
    var user = firebase.auth().currentUser;
    await firestoreRef
        .collection('questions')
        .doc()
        .setData({
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
    return (await firestoreRef
        .collection('questions')
        .orderBy("upvotes", "desc")
        .limit(count)
        .get()).docs.map((d) => d.data());
}


export async function getQuestionsForTalk(talkId) {
    return (await firestoreRef
        .collection('questions')
        .where("talkId", "==", talkId)
        .orderBy("upvotes", "desc")
        .get()).docs.map((d) => d.data());
}



export async function getMyQuestions() {
    var user = firebase.auth().currentUser;

    return (await firestoreRef
        .collection('questions')
        .where("uid", "==", uid)
        .get()).docs.map((d) => d.data());
}
