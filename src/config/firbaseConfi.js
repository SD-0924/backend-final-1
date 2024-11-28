"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var app_1 = require("firebase/app");
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
console.log("Firebase has been initialized successfully!");
