import { storageRef } from '.';

export async function uploadImage(image, onComplete) {
  var names = image.split('/');
  const task = storageRef
    .ref()
    .child('images')
    .child(names[names.length - 1])
    .putFile(image);
  task.on(
    'state_changed',
    t => {
      var progress = (t.bytesTransferred / t.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    err => {
      console.log(err);
    },
    t => {
      onComplete(t.downloadURL);
    },
  );
}
