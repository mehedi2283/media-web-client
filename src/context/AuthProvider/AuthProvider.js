import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import app from "../.././firebase/firbase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [totalLow, setTotalLow] = useState(null);
  const [totalEntry, setTotalEntry] = useState(null);
  const [totalHigh, setTotalHigh] = useState(null);
  const [totalAll, setTotalAll] = useState(null);

  

  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('tourDE-token')
    signOut(auth);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const verifyEmail = () => {
     return sendEmailVerification(auth.currentUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  
 
  
  

  

  const authInfo = {
    user,
    loading,
    search,
    totalLow,
    totalEntry,
    totalHigh,
    totalAll,
    setTotalAll,
    setTotalHigh,
    setTotalEntry,
    setTotalLow,
    setSearch,
    setLoading,
    providerLogin,
    logOut,
    createUser,
    signIn,
    updateUserProfile,
    verifyEmail,
   
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
