import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0CfTDp_8ybBv5Oz_-9KyDdHxKQXdURiE",
  authDomain: "azmar-8f395.firebaseapp.com",
  projectId: "azmar-8f395",
  storageBucket: "azmar-8f395.firebasestorage.app",
  messagingSenderId: "806845477",
  appId: "1:806845477:web:7594ea9d54c8e2c76593cc",
  measurementId: "G-PSGWETP1MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
