import { fireStoreRef, auth } from '.';
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
