// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcqRnbkND2cCzDCb_zCjsGPDnt1Dp2OVc',
  authDomain: 'kpi-student.firebaseapp.com',
  projectId: 'kpi-student',
  storageBucket: 'kpi-student.appspot.com',
  messagingSenderId: '445076196437',
  appId: '1:445076196437:web:2a4b870cf85d787f6958dc',
  measurementId: 'G-T3KMFXVLYT',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const analytics = firebase.analytics();

analytics.setAnalyticsCollectionEnabled(true);

firebase.auth().useDeviceLanguage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(googleProvider);
const githubProvider = new firebase.auth.GithubAuthProvider();
export const signInWithGitHub = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(githubProvider);

export default firebase;
