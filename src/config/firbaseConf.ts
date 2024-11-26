import { initializeApp } from "firebase/app";
import { initializeApp as adminInitializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// admin sdk
const adminApp = adminInitializeApp(); 

// accessing the firebase storage using bucket const for admin level file management
const bucket = admin.storage().bucket();

console.log("Firebase has been initialized successfully!");

export { app, adminApp, admin, bucket };