import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_8_G3He17BRSZikKpTWRxnhkzfircLuo",
  authDomain: "chat-app-9ca91.firebaseapp.com",
  projectId: "chat-app-9ca91",
  storageBucket: "chat-app-9ca91.firebasestorage.app",
  messagingSenderId: "838080685756",
  appId: "1:838080685756:web:5b554b912969097942d2b9",
  measurementId: "G-1ENYXGYMZK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
