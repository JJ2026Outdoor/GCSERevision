// Storage layer with two interchangeable backends, behind one interface:
//  - "local": browser localStorage on this device only (zero setup)
//  - "cloud": Firebase Firestore, shared between every device signed in to
//    the same Firebase project (see README.md for setup)
//
// The app never needs to know which one is active — it just calls
// saveResult()/getResults(). initStorage() decides which backend to use
// based on firebase-config.js.

import { firebaseConfig, isFirebaseConfigured } from "../firebase-config.js";

const LOCAL_KEY = "gcse_revision_results_v1";
const PROFILE_KEY = "gcse_revision_profile_v1";
const FIREBASE_SDK_VERSION = "10.12.2";

let mode = "local"; // "local" | "cloud"
let db = null;
let auth = null;
let firestoreFns = null;

export async function initStorage() {
  if (!isFirebaseConfigured) {
    mode = "local";
    return { mode };
  }
  try {
    const [{ initializeApp }, authMod, fsMod] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`)
    ]);
    const app = initializeApp(firebaseConfig);
    auth = authMod.getAuth(app);
    await authMod.signInAnonymously(auth);
    await new Promise((resolve) => {
      const unsub = authMod.onAuthStateChanged(auth, (user) => {
        if (user) {
          unsub();
          resolve();
        }
      });
    });
    db = fsMod.getFirestore(app);
    firestoreFns = fsMod;
    mode = "cloud";
    return { mode };
  } catch (err) {
    console.error("Firebase setup failed, falling back to on-device storage:", err);
    mode = "local";
    return { mode, error: err };
  }
}

export function getMode() {
  return mode;
}

export function getCurrentProfile() {
  return localStorage.getItem(PROFILE_KEY) || null;
}

export function setCurrentProfile(name) {
  localStorage.setItem(PROFILE_KEY, name);
}

function readLocalResults() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read local results", err);
    return [];
  }
}

function writeLocalResults(results) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(results));
}

export async function saveResult(record) {
  const withId = { ...record, id: record.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  if (mode === "cloud") {
    const { collection, addDoc } = firestoreFns;
    await addDoc(collection(db, "results"), withId);
    return withId;
  }
  const results = readLocalResults();
  results.push(withId);
  writeLocalResults(results);
  return withId;
}

export async function getResults({ profile, subject } = {}) {
  let results;
  if (mode === "cloud") {
    const { collection, getDocs } = firestoreFns;
    const snap = await getDocs(collection(db, "results"));
    results = snap.docs.map((d) => d.data());
  } else {
    results = readLocalResults();
  }
  if (profile) results = results.filter((r) => r.profile === profile);
  if (subject) results = results.filter((r) => r.subject === subject);
  return results.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

export async function getAllProfiles() {
  const results = mode === "cloud" ? await getResults() : readLocalResults();
  return [...new Set(results.map((r) => r.profile))];
}
