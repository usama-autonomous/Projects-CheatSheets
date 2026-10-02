// ==========================================================
//  firebase.js  ->  SHARED FILE (same idea as the email demo)
// ==========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcnrJVO_QCnx83qvkOz70f776NZ0etHss",
  authDomain: "development-80e5b.firebaseapp.com",
  projectId: "development-80e5b",
  storageBucket: "development-80e5b.firebasestorage.app",
  messagingSenderId: "910771086531",
  appId: "1:910771086531:web:6c7161e8e7040a9effae76"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Same helper as before. This time it also knows the Google errors.
export function friendlyError(code) {
  switch (code) {
    case "auth/operation-not-allowed":
      return "Google is not switched on in the Firebase Console.";
    case "auth/unauthorized-domain":
      return "This domain is not in the Authorized domains list in the Firebase Console.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google popup. Allow popups and try again.";
    case "auth/popup-closed-by-user":
      return "You closed the Google window before finishing.";
    case "auth/cancelled-popup-request":
      return "Another sign in window was already open.";
    case "auth/account-exists-with-different-credential":
      return "This email already has an account made with email + password.";
    case "auth/network-request-failed":
      return "No internet connection.";
    default:
      return "Something went wrong: " + code;
  }
}
