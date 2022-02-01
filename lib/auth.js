import React, { useState, useEffect, useContext, createContext } from 'react';

import firebase from './firebase';
import { createUser } from './db';

const authContext = createContext();

function useAuthProvider() {
  const [user, setUser] = useState(null);

  console.log(user);

  const handleUser = (rawUser) => {
    const user = rawUser ? formatUser(rawUser) : false;

    user && createUser(rawUser.uid, formatUser(rawUser));

    setUser(user);
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}

export const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoURL: user.photoURL,
});

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
