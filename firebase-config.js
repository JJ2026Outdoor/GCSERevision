// Fill this in once you've created a free Firebase project (see README.md,
// "Setting up shared cloud sync"). Until you do, apiKey stays as the
// placeholder below and the app automatically uses on-device storage instead
// — it still works, it just won't sync between your phone and your
// daughter's phone. Nothing else in the app needs to change when you add
// your real values here.
export const firebaseConfig = {
  apiKey: "AIzaSyB2tAEcmzKPBgD7UOKqXibvP2f3O96ASoM",
  authDomain: "gcserevisionjj2026.firebaseapp.com",
  projectId: "gcserevisionjj2026",
  storageBucket: "gcserevisionjj2026.firebasestorage.app",
  messagingSenderId: "858477367129",
  appId: "1:858477367129:web:53f242e1dc156f3c130648",
  measurementId: "G-B42LE1PND9"
};

export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && !!firebaseConfig.apiKey;

// PIN for the "Assessor / parent view" (see README, "Assessor / parent
// view"). This is a SINGLE shared PIN for the whole app, set once here —
// every device checks against this same value, rather than each device
// letting whoever opens it first set their own. Change it from "CHANGE_ME"
// to whatever digits/letters you like, then upload this file. Until you
// change it, the assessor view refuses to open at all (a default like
// "CHANGE_ME" would just be a different way of letting anyone in).
//
// This is still not real security — it's a shared password sitting in
// plain text in a public file, readable by anyone who views the page
// source. It stops a casual visitor clicking their way in; it does not
// stop someone who goes looking for it.
export const ASSESSOR_PIN = "985632";
