import { initializeApp } from "firebase/app";
import { initializeApp as adminInitializeApp, cert } from "firebase-admin/app";
import * as admin from "firebase-admin";
import * as path from "path";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// app for clinet-side
const app = initializeApp(firebaseConfig);

// service account credentials configuration

console.log(process.env.SERVICE_ACCOUNT_PATH);
const serviceAccountConfig = process.env.SERVICE_ACCOUNT_PATH;

if (!serviceAccountConfig) {
  throw new Error("SERVICE_ACCOUNT_PATH environment variable is not set.");
}

// resolving the path for the service account file
const serviceAccountPath = path.resolve(process.env.SERVICE_ACCOUNT_PATH!);
console.log(serviceAccountPath);

// importing the service account JSON
let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
  console.log(serviceAccount);
} catch (error:any) {
  throw new Error(`Failed to load service account JSON. Path: ${serviceAccountPath}. Error: ${error.message}`);
}

// admin sdk
const adminApp = adminInitializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// accessing the firebase storage using bucket const for admin level file management
const bucket = admin.storage().bucket();

console.log("Firebase has been initialized successfully!!!");

export { app, adminApp, admin, bucket };
