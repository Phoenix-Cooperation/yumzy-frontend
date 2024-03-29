import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import firebase from "firebase/compat/app";
import userStore from "../utils/userStore";

const firebaseConfig = {
  apiKey: "AIzaSyAi78iH0dsPuDqGZKUcxC0UtLQI6ya9cV0",
  authDomain: "yumzy-foods.firebaseapp.com",
  projectId: "yumzy-foods",
  storageBucket: "yumzy-foods.appspot.com",
  messagingSenderId: "812654463437",
  appId: "1:812654463437:web:d516e613d487695cae1c84",
  measurementId: "G-44GZ4JB8ET"
};


// Initialize Firebase
// export const app = firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth();

export const registerUser = async (email, password, username) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    return null;
  }

  console.log(auth.currentUser.uid)
  try {
    const userData = await updateProfile(auth.currentUser, { displayName: username })
    return userData.uid;
  } catch (error) {
    console.log(error);
  }
}
export const signIn = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch(error) {
    console.log(error);
    return null
  }
}

export const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, new GoogleAuthProvider());
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logout = async () => {
  
  try {
    await signOut(auth)
    localStorage.removeItem("token")
    userStore.clearUserStore();
  } catch (error) {
    console.log(error);
  }
}