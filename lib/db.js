import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const updateUser = (uid, data) => {
  return firestore.collection('users').doc(uid).update(data);
};

export const createFeedback = (data) => {
  return firestore.collection('feedback').add(data);
};

export const updateFeedback = (id, data) => {
  return firestore.collection('feedback').doc(id).update(data);
};

export const deleteFeedback = (id) => {
  return firestore.collection('feedback').doc(id).delete();
};

export const createSite = (data) => {
  const site = firestore.collection('sites').doc();

  site.set(data);

  return site;
};
