import { fireStoreRef, auth, fireStore } from '.';
import { uploadImage } from './image';

export function getFeedData(updateFeed) {
  fireStoreRef
    .collection('feed')
    .orderBy('date', 'desc')
    .onSnapshot(data => {
      updateFeed(data.docs.map(d => d.data()));
    });
}

async function setPost(content, imageUrl = null) {
  let user = auth().currentUser;
  const feedRef = fireStoreRef.collection('feed').doc();
  return await feedRef.set({
    id: feedRef.id,
    content,
    name: user.displayName,
    commentCount: 0,
    uid: user.uid,
    profileImageUrl: user.photoURL,
    voters: [],
    postImage: imageUrl,
    date: new Date().getTime(),
  });
}
export async function addNewPost(content, image) {
  if (image) {
    const imgUrl = await uploadImage(image);
    return await setPost(content, imgUrl);
  } else {
    return await setPost(content);
  }
}
export async function upvoteFeed(feed) {
  let user = auth().currentUser;
  const voters = feed.voters || [];
  fireStoreRef
    .collection('feed')
    .doc(feed.id)
    .update({
      voters: voters.includes(user.uid)
        ? fireStore.FieldValue.arrayRemove(user.uid)
        : fireStore.FieldValue.arrayUnion(user.uid),
    });
}

export function getCommentsForPost(postId, updateComments) {
  fireStoreRef
    .collection('feed')
    .doc(postId)
    .collection('comments')
    .orderBy('date', 'ASC')
    .onSnapshot(data => {
      updateComments(data.docs.map(d => d.data()));
    });
}

export async function addCommentToPost(postId, content) {
  let user = auth().currentUser;
  const comment = {
    content,
    uid: user.uid,
    name: user.displayName,
    profileImageUrl: user.photoURL,
    date: new Date().getTime(),
  };
  const commentRef = await fireStoreRef
    .collection('feed')
    .doc(postId)
    .collection('comments')
    .doc();
  commentRef.set(Object.assign({}, comment, { id: commentRef.id }));
}
