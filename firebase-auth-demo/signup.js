// ==========================================================
//  signup.js  ->  CREATE A NEW USER
//  Method used: createUserWithEmailAndPassword()
// ==========================================================

import { auth, friendlyError } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const messageBox = document.getElementById("message");

// If a user is ALREADY signed in, this page is useless for them,
// so send them straight to the dashboard.
onAuthStateChanged(auth, function (user) {
  if (user) {
    location.href = "dashboard.html";
  }
});

signupBtn.addEventListener("click", function () {
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  messageBox.innerText = "Creating your account...";

  // 1. Ask Firebase to create the user.
  //    IMPORTANT: if this works, Firebase signs the user in automatically.
  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      const user = userCredential.user;
      console.log("New user created:", user.uid);

      // 2. Save the full name on the account.
      //    (Email + password are already saved by step 1)
      return updateProfile(user, { displayName: fullName });
    })
    .then(function () {
      // 3. Account is ready -> go to the dashboard
      location.href = "dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
      messageBox.innerText = friendlyError(error.code);
    });
});
