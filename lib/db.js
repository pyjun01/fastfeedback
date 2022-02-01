import firebase from './firebase';

export const createUser = (uid, data) => {
  console.log(data);
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .set(
      {
        uid,
        ...data,
      },
      { merge: true },
    );
};
