import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVq0mlDnd6C9XbT3Kh8UBjq51wu1eM0wI",
  authDomain: "grapplinggarage.firebaseapp.com",
  projectId: "grapplinggarage",
  storageBucket: "grapplinggarage.firebasestorage.app",
  messagingSenderId: "124425797012",
  appId: "1:124425797012:web:8f6e0ed8ee8af01ed7a381",
  measurementId: "G-FBELE9EGPP",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

let analyticsPromise: Promise<unknown> | undefined;

export function enableFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = import("firebase/analytics")
      .then(async ({ getAnalytics, isSupported }) =>
        (await isSupported()) ? getAnalytics(app) : null,
      )
      .catch(() => null);
  }

  return analyticsPromise;
}
