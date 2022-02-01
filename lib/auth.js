import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebaseAuth, GithubAuthProvider, signInWithPopup } from './firebase';

const authContext = createContext();

function useAuthProvider() {
  const [user, setUser] = useState(null);

  console.log(user);

  const signinWithGithub = () => {
    return signInWithPopup(firebaseAuth, new GithubAuthProvider()).then(
      (response) => {
        setUser(response.user);

        return response.user;
      },
    );
  };

  const signout = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
}

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
