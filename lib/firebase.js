import * as firebase from 'firebase/app';
import * as auth from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = auth.getAuth();
export const { signInWithPopup, GithubAuthProvider, onAuthStateChanged } = auth;
