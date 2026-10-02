# Firebase Auth with Google — 2 pages

The smallest possible "Sign in with Google": one button, one protected page.

```
index.html  + login.js      ->  signInWithPopup()  +  GoogleAuthProvider
dashboard.html + dashboard.js -> onAuthStateChanged()  +  signOut()
firebase.js                 ->  shared config
```

## Run it

Must be opened with a local server (Live Server, or `python -m http.server`),
because the pages use `<script type="module">`. Double-clicking will not work.

## Firebase Console setup (one time)

1. **Authentication → Sign-in method → Google → Enable.**
   Skip this and you get `auth/operation-not-allowed`.
2. **Authentication → Settings → Authorized domains** should contain `localhost`.

## The one idea that matters

In the email demo you wrote a signup form and a signin form, and Firebase
checked the password. Here you write **neither**.

`signInWithPopup(auth, provider)` opens Google's own window, the user types
their password on **Google's website** (never on your page), and Google hands
Firebase a verified answer. If this is the first time we see that Google
account, Firebase **creates the user automatically** — no `createUserWithEmailAndPassword`.

Everything after that is identical to the email demo:

| | email + password | Google |
|---|---|---|
| get the user | `signInWithEmailAndPassword` | `signInWithPopup(provider)` |
| signup step | `createUserWithEmailAndPassword` | none, automatic |
| keep the session | `onAuthStateChanged` | `onAuthStateChanged` (same) |
| protected page | same code | same code |

Open `login.js` next to `dashboard.js` and compare with the email demo's
`signin.js` / `dashboard.js`. The dashboard files are nearly the same file.
Only the login file changes. That is the point worth writing on the board.

## Bonus: the profile photo

`user.photoURL` is a normal image URL that Google gives you, and
`user.displayName` is the name on the Google account. That is why the
dashboard can show a face with zero extra work.

For email + password users those two fields are `null` unless you set them
yourself with `updateProfile()` — which is exactly what the email demo does.
