import { compareDesc, parseISO } from 'date-fns';

import { db } from './firebase-admin';

export const getAllFeedback = async (siteId) => {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();

    const feedback = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { feedback };
  } catch (error) {
    return { error };
  }
};

export const getAllSites = async () => {
  const snapshot = await db.collection('sites').get();

  const sites = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { sites };
};

export const getUserSites = async (uid) => {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get();

  const sites = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

  return { sites };
};
