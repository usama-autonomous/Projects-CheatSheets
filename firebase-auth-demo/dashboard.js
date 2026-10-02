// ==========================================================
//  dashboard.js  ->  THE PROTECTED PAGE
//
//  This is the file that answers:
//  "How do I know the user is still logged in every time?"
//
//  Answer: onAuthStateChanged()
// ==========================================================

import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const loadingText = document.getElementById("loading");
const dashboardBox = document.getElementById("dashboard");
const nameText = document.getElementById("userName");
const emailText = document.getElementById("userEmail");
const uidText = document.getElementById("userUid");
const signoutBtn = document.getElementById("signoutBtn");

// ----------------------------------------------------------
//  onAuthStateChanged runs:
//    - every time this page loads
//    - every time the user signs in or signs out
//
//  When the page loads, Firebase looks at the session it saved
//  in the browser earlier. It checks if that session is still
//  valid and gives us back the user.
//
//  user = an object  -> someone is logged in
//  user = null       -> nobody is logged in
// ----------------------------------------------------------
onAuthStateChanged(auth, function (user) {

  loadingText.classList.add("hidden");

  if (user) {
    // Someone IS logged in -> show the page and fill in their details
    console.log("Logged in user:", user);

    nameText.innerText = user.displayName || "(no name)";
    emailText.innerText = user.email;
    uidText.innerText = user.uid;

    dashboardBox.classList.remove("hidden");
  } else {
    // Nobody is logged in -> kick them back to the sign in page
    location.href = "signin.html";
  }
});

// Log out: deletes the saved session, then sends them back to sign in
signoutBtn.addEventListener("click", function () {
  signOut(auth).then(function () {
    location.href = "signin.html";
  });
});
