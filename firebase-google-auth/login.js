// ==========================================================
//  login.js  ->  SIGN IN WITH GOOGLE
//  Method used: signInWithPopup() + GoogleAuthProvider
// ==========================================================

import { auth, friendlyError } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const googleBtn = document.getElementById("googleBtn");
const messageBox = document.getElementById("message");

// "provider" = WHICH company is checking the user.
// Google, Facebook, GitHub... each one has its own provider.
const provider = new GoogleAuthProvider();

// Already signed in? Go straight to the dashboard.
onAuthStateChanged(auth, function (user) {
  if (user) {
    location.href = "dashboard.html";
  }
});

googleBtn.addEventListener("click", function () {
  messageBox.innerText = "Opening Google...";

  // This opens Google's own window. The user types their Google
  // password THERE, on Google's website - never on our page.
  signInWithPopup(auth, provider)
    .then(function (result) {
      const user = result.user;
      console.log("Signed in with Google:", user.email);

      // If this Google account is new, Firebase created the user
      // automatically. There is no signup step to write.
      location.href = "dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
      messageBox.innerText = friendlyError(error.code);
    });
});

// If the popup gets blocked in class, this is the alternative:
//   signInWithRedirect(auth, provider)
// It leaves the page instead of opening a window, then comes back.
