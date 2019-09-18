import { fireStoreRef } from '.';

export function getMapData(updateMapData) {
  fireStoreRef.collection('places').onSnapshot(data => {
    updateMapData(data.docs.map(d => d.data()));
  });
}
