import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBflX6ZNqVgtNKPS1njOVrQ6CNx3FUw5NI",
  authDomain: "tourism-app-a5d56.firebaseapp.com",
  projectId: "tourism-app-a5d56",
  storageBucket: "tourism-app-a5d56.firebasestorage.app",
  messagingSenderId: "555610635019",
  appId: "1:555610635019:web:9214703eac2c235eab800e",
  measurementId: "G-ZLGQX3VZSC"
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
