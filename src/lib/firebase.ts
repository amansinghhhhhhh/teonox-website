import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChOwNIm2-Fa8ZoWPcHzY2p3TZ3xIYiMrc",
  authDomain: "my-first-firebase-projec-ecd73.firebaseapp.com",
  projectId: "my-first-firebase-projec-ecd73",
  storageBucket: "my-first-firebase-projec-ecd73.firebasestorage.app",
  messagingSenderId: "442617093185",
  appId: "1:442617093185:web:8a75235b2975f1409cfac0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
