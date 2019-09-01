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

export async function addNewPost(content, image) {
  async function setPost(imageUrl = null) {
    let user = auth().currentUser;
    const feedRef = fireStoreRef.collection('feed').doc();
    await feedRef.set({
      id: feedRef.id,
      content,
      name: user.displayName,
      uid: user.uid,
      profileImageUrl: user.photoURL,
      voters: [],
      postImage: imageUrl,
      date: new Date().getTime(),
    });
  }
  if (image) {
    uploadImage(image, url => {
      setPost(url);
    });
  } else {
    await setPost();
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

export async function addCommentToPost(postId, content) {
  let user = auth().currentUser;
  const comment = {
    content,
    uid: user.uid,
    name: user.displayName,
    profileImageUrl: user.photoURL,
    date: new Date().getTime(),
    id: commentRef.id,
  };
  const commentRef = fireStoreRef
    .collection('feed')
    .doc(postId)
    .collection('comments')
    .doc();
  commentRef.set(comment);
}
