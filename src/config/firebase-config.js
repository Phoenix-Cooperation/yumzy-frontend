// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);