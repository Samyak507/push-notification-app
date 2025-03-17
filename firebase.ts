import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB1HbUe_Mr_hlUCY4XANjucsJ3UzpuF8ho",
  authDomain: "pwa-digilabs.firebaseapp.com",
  projectId: "pwa-digilabs",
  storageBucket: "pwa-digilabs.firebasestorage.app",
  messagingSenderId: "16837214054",
  appId: "1:16837214054:web:c586f133d5931f607552a7",
  measurementId: "G-PRJBMKBQ3P"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
