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
