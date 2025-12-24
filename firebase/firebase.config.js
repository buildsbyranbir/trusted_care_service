// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4jlj3UCL6jeglqTzKA198jPWQM3CVpEM",
  authDomain: "warm-paws-652a6.firebaseapp.com",
  projectId: "warm-paws-652a6",
  storageBucket: "warm-paws-652a6.firebasestorage.app",
  messagingSenderId: "733321754092",
  appId: "1:733321754092:web:aa49799d1a19868f353cc9",
  measurementId: "G-G0LKP4NC61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);