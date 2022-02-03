import admin from 'firebase-admin';
import json from '../firebase-pk.json';

if (!admin.apps.length) {
  const firebaseConfig = {
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: json.private_key || process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://fast-feedback-demo-f5460.firebaseio.com',
  };

  admin.initializeApp(firebaseConfig);
}

export const db = admin.firestore();
export const auth = admin.auth();