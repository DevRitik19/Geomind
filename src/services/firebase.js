import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";

// Extract env variables
const configVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Log temporarily for debugging (REMOVE IN PRODUCTION)
console.log("Firebase Env Config Loaded:", {
  ...configVars,
  apiKey: configVars.apiKey ? "***HIDDEN***" : undefined
});

// Validate all variables exist
const missingKeys = Object.entries(configVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  throw new Error(`Firebase setup Error: Missing environment variables: ${missingKeys.join(', ')}`);
}

// Initialize Firebase
const app = initializeApp(configVars);
export const auth = getAuth(app);
// Initialize Firestore with offline persistence to ensure data survives page refreshes
// even if the network fluctuates or if backend writes are delayed.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({})
});
