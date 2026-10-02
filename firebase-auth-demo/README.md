# Firebase Auth Demo — signup / signin / dashboard

A very small 3-page example that shows the **whole** email + password flow in plain JavaScript.

```
signup.html  + signup.js      ->  createUserWithEmailAndPassword()
signin.html  + signin.js      ->  signInWithEmailAndPassword()
dashboard.html + dashboard.js ->  onAuthStateChanged()  +  signOut()
firebase.js                   ->  shared config, imported by all 3 pages
style.css                     ->  shared styling
```

---

## 1. How to run it

**Do NOT double-click the HTML files.** Open them with a local server:

- VS Code → right click `signup.html` → **Open with Live Server**, or
- terminal in this folder → `python -m http.server 5500` → open http://localhost:5500/signup.html

Why: the pages use `<script type="module">`, and browsers refuse to load modules
from `file://`. You will see a CORS error in the console and nothing will work.

## 2. Firebase Console checklist (one time)

1. **Authentication → Sign-in method → Email/Password → Enable.**
   If you skip this, signup fails with `auth/operation-not-allowed`.
2. **Authentication → Settings → Authorized domains** should contain `localhost`.
   (It is there by default.)

## 3. The flow, in order

**Signup** — `createUserWithEmailAndPassword(auth, email, password)`
Firebase creates the user, stores the password hashed (never as plain text),
and **signs the user in immediately**. So after signup you go straight to the
dashboard, there is no separate "now log in" step.

**Signin** — `signInWithEmailAndPassword(auth, email, password)`
Firebase checks the email + password against the account and, if they match,
gives you back the user object.

**Dashboard (protected)** — `onAuthStateChanged(auth, callback)`
This is the answer to *"how do I authenticate the user every time?"*

---

## 4. How the user stays logged in (the important idea)

1. When someone signs in, Firebase saves a **session** in the browser's
   IndexedDB (a refresh token + an ID token).
2. On every page load you call `onAuthStateChanged(auth, callback)`.
   Firebase reads that saved session, checks it is still valid, refreshes the
   ID token if it expired, and then calls your callback **once** with:
   - `user` = a user object → someone is logged in
   - `user` = `null` → nobody is logged in
3. So `dashboard.html` does not need to know how the user got there. It just
   asks Firebase "who is this?" and reacts:

```js
onAuthStateChanged(auth, function (user) {
  if (user) {
    // show the page
  } else {
    location.href = "signin.html";   // not logged in -> get out
  }
});
```

Use `onAuthStateChanged` and not `auth.currentUser` on page load.
`auth.currentUser` can be `null` for a split second before Firebase has
finished restoring the saved session.

**Try it in class:** sign in, then just refresh the dashboard. You are still
logged in — nobody typed a password. That is step 2 doing its job.

**How long does the session last?**
In `signin.js`, `setPersistence()` decides this, and it must be called
**before** signing in:

| Persistence | Behaviour |
|---|---|
| `browserLocalPersistence` (default) | stays signed in even after closing the browser |
| `browserSessionPersistence` | signed out when the browser is closed |
| `inMemoryPersistence` | gone on refresh |

The "Keep me signed in" checkbox on the signin page switches between the first two.

**Sign out** — `signOut(auth)` deletes the saved session. `onAuthStateChanged`
fires again with `null`, and the dashboard sends the user to the signin page.

---

## 5. Honest warning for your students

This dashboard is protected **in the browser only**. Anyone can open dev tools
and unhide the page. It stops an honest user from seeing a page by accident, it
does not stop an attacker.

Real protection lives on the server side — in Firestore/Storage security rules,
where every request carries the user's ID token and the rules check it. Say this
out loud in class, because students often assume "I hid the div" means "secure".

---

## 6. Things worth demoing live

- Signup with the same email twice → `auth/email-already-in-use`
- Password of 3 characters → `auth/weak-password`
- Wrong password → `auth/invalid-credential`
- Sign in, refresh the dashboard → still logged in (session restored)
- Sign in with "Keep me signed in" **unchecked**, close the whole browser,
  reopen → you are back at the signin page
- Click Sign Out → you cannot go back to `dashboard.html` by typing the URL
