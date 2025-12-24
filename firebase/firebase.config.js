import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4jlj3UCL6jeglqTzKA198jPWQM3CVpEM",
  authDomain: "warm-paws-652a6.firebaseapp.com",
  projectId: "warm-paws-652a6",
  storageBucket: "warm-paws-652a6.appspot.com",
  messagingSenderId: "733321754092",
  appId: "1:733321754092:web:aa49799d1a19868f353cc9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
