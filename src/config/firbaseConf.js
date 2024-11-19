import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAo3_gDE8fJoE8ceR0N6zZk6ProwcRgrGE",
  authDomain: "finalproj1-d59b4.firebaseapp.com",
  projectId: "finalproj1-d59b4",
  storageBucket: "finalproj1-d59b4.firebasestorage.app",
  messagingSenderId: "454890257473",
  appId: "1:454890257473:web:9529b48a296a26cd00dac0",
  measurementId: "G-Y20E0M05MY"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase has been initialized successfully!");

export { app };
