// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8g7iDtaiDN-y-CkNVwzbSFpmOxfnhyYk",
  authDomain: "weekly-planner-841f5.firebaseapp.com",
  projectId: "weekly-planner-841f5",
  storageBucket: "weekly-planner-841f5.firebasestorage.app",
  messagingSenderId: "33753726786",
  appId: "1:33753726786:web:dfa3feb5a7c46b1c1a52db",
  measurementId: "G-VCC1F847BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
