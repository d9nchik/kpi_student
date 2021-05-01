// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcqRnbkNCb_zCjsGPDnt1Dp2OVc',
  projectId: 'kpi-student',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
firestore.useEmulator('localhost', 8080);
export const auth = firebase.auth();
auth.useEmulator('http://localhost:9099');
export const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(googleProvider);
const githubProvider = new firebase.auth.GithubAuthProvider();
export const signInWithGitHub = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(githubProvider);

export default firebase;
