// ==========================================================
//  signin.js  ->  LOG AN OLD USER BACK IN
//  Method used: signInWithEmailAndPassword()
// ==========================================================

import { auth, friendlyError } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("remember");
const signinBtn = document.getElementById("signinBtn");
const messageBox = document.getElementById("message");

// Already signed in? No need to log in again.
onAuthStateChanged(auth, function (user) {
  if (user) {
    location.href = "dashboard.html";
  }
});

signinBtn.addEventListener("click", function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  // This decides HOW LONG the user stays signed in.
  //   checkbox ON  -> local   = stays signed in even after closing the browser
  //   checkbox OFF -> session = signed out when the browser is closed
  // It MUST be set BEFORE signing in, otherwise it is ignored.
  const persistence = rememberCheckbox.checked
    ? browserLocalPersistence
    : browserSessionPersistence;

  messageBox.innerText = "Checking your details...";

  // 1. Remember how long to stay signed in
  setPersistence(auth, persistence)
    .then(function () {
      // 2. Now actually sign in
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then(function (userCredential) {
      console.log("Signed in as:", userCredential.user.email);
      // 3. Firebase already saved the session. Go to the dashboard.
      location.href = "dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
      messageBox.innerText = friendlyError(error.code);
    });
});
