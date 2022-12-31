// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTLdFPwSZ6Sz9r_hng3RHXbKbIjSgEwi8",
    authDomain: "journal-games-app.firebaseapp.com",
    projectId: "journal-games-app",
    storageBucket: "journal-games-app.appspot.com",
    messagingSenderId: "218018585115",
    appId: "1:218018585115:web:e4f46236869b87373836be"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);