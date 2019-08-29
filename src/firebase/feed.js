import { fireStoreRef, auth } from '.';

export function getFeedData(updateFeed) {
  fireStoreRef.collection('feed').onSnapshot(data => {
    updateFeed(data.docs.map(d => d.data()));
  });
}

export async function addNewPost(content) {
  let user = auth().currentUser;
  const feedRef = fireStoreRef.collection('feed').doc();
  await feedRef.set({
    id: feedRef.id,
    content,
    name: user.displayName,
    uid: user.uid,
    profileImageUrl: user.photoURL,
    postImage: null,
    date: new Date().getTime(),
  });
}
