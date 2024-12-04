import { initializeApp } from "firebase/app";
import { initializeApp as adminInitializeApp, cert } from "firebase-admin/app";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Client-side Firebase initialization
const app = initializeApp(firebaseConfig);

// Service account credentials configuration
const serviceAccountConfig = process.env.SERVICE_ACCOUNT_JSON;

if (!serviceAccountConfig) {
  throw new Error("SERVICE_ACCOUNT_JSON environment variable is not set.");
}

let serviceAccount;
try {
  // Parse the service account JSON from the environment variable
  serviceAccount = JSON.parse(serviceAccountConfig);
  console.log("Service account successfully parsed.");
} catch (error: any) {
  throw new Error(`Failed to parse service account JSON. Error: ${error.message}`);
}

// Admin SDK initialization
const adminApp = adminInitializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Access Firebase storage using the admin SDK
const bucket = admin.storage().bucket();

console.log("Firebase has been initialized successfully!!!");

export { app, adminApp, admin, bucket };
