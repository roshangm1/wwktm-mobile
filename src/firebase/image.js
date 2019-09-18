import { storageRef } from '.';

export async function uploadImage(image) {
  let names = image.split('/');
  // Todo: maintain later
  // const task = storageRef
  //   .ref()
  //   .child('images')
  //   .child(names[names.length - 1])
  //   .putFile(image);
  // task.on(
  //   'state_changed',
  //   t => {
  //     let progress = (t.bytesTransferred / t.totalBytes) * 100;
  //     console.log(progress);
  //   },
  //   err => {
  //     console.log(err);
  //   },
  //   t => {
  //     onComplete(t.downloadURL);
  //   },
  // );

  const snapshot = await storageRef
    .ref()
    .child('images')
    .child(names[names.length - 1])
    .putFile(image);

  return snapshot.downloadURL;
}
