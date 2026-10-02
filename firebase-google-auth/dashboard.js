// ==========================================================
//  dashboard.js  ->  PROTECTED PAGE
//
//  Notice: this file is almost IDENTICAL to the email demo.
//  That is the lesson. onAuthStateChanged does not care HOW
//  the user signed in - email, Google, GitHub, whatever.
//  Only login.js changes.
// ==========================================================

import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const loadingText = document.getElementById("loading");
const dashboardBox = document.getElementById("dashboard");
const avatar = document.getElementById("avatar");
const nameText = document.getElementById("userName");
const emailText = document.getElementById("userEmail");
const uidText = document.getElementById("userUid");
const signoutBtn = document.getElementById("signoutBtn");

onAuthStateChanged(auth, function (user) {

  loadingText.classList.add("hidden");

  if (user) {
    console.log("Logged in user:", user);

    nameText.innerText = user.displayName || "No name";
    emailText.innerText = user.email;
    uidText.innerText = user.uid;

    // Google gives us a profile photo as a normal URL.
    // user.photoURL is null for email/password users.
    if (user.photoURL) {
      avatar.src = user.photoURL;
    } else {
      avatar.classList.add("hidden");
    }

    dashboardBox.classList.remove("hidden");
  } else {
    location.href = "index.html";
  }
});

signoutBtn.addEventListener("click", function () {
  signOut(auth).then(function () {
    location.href = "index.html";
  });
});
