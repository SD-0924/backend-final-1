import { initializeApp } from "firebase/app";
import { initializeApp as adminInitializeApp, cert } from "firebase-admin/app";
import * as admin from "firebase-admin";
import * as path from "path";
import fs from "fs";

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
const serviceAccountConfig = process.env.SERVICE_ACCOUNT_PATH;

if (!serviceAccountConfig) {
  throw new Error("SERVICE_ACCOUNT_PATH environment variable is not set.");
}
let serviceAccount;
if (process.env.NODE_ENV !== "test") {
  const serviceAccountPath = path.resolve(process.env.SERVICE_ACCOUNT_PATH!);
  try {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  } catch (error: any) {
    throw new Error(`Failed to load service account JSON. Error: ${error.message}`);
  }
}
 
// resolving the path for the service account file
/*const serviceAccountPath = path.resolve(process.env.SERVICE_ACCOUNT_PATH!);

// importing the service account JSON
let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error:any) {
  throw new Error(`Failed to load service account JSON. Path: ${serviceAccountPath}. Error: ${error.message}`);
}
*/
// admin sdk
const adminApp = adminInitializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// accessing the firebase storage using bucket const for admin level file management
const bucket = admin.storage().bucket();

console.log("Firebase has been initialized successfully!!!");

export { app, adminApp, admin, bucket };
