// ==========================================================
//  firebase.js  ->  SHARED FILE
//  All 3 pages (signup, signin, dashboard) import from here.
//  So the config is written once, not 3 times.
// ==========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// This is YOUR project's config (from Firebase Console > Project settings)
const firebaseConfig = {
  apiKey: "AIzaSyBcnrJVO_QCnx83qvkOz70f776NZ0etHss",
  authDomain: "development-80e5b.firebaseapp.com",
  projectId: "development-80e5b",
  storageBucket: "development-80e5b.firebasestorage.app",
  messagingSenderId: "910771086531",
  appId: "1:910771086531:web:6c7161e8e7040a9effae76"
};

// Start Firebase
const app = initializeApp(firebaseConfig);

// "auth" is the object that knows WHO IS LOGGED IN right now.
// Every page imports this same object.
export const auth = getAuth(app);

// Firebase gives technical error codes like "auth/weak-password".
// This function turns them into sentences a normal person can read.
export function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email already has an account. Try signing in instead.";
    case "auth/invalid-email":
      return "That email address does not look right.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email/Password is not switched on in the Firebase Console.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password.";
    case "auth/too-many-requests":
      return "Too many tries. Please wait a minute and try again.";
    default:
      return "Something went wrong: " + code;
  }
}
