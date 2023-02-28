// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO9k0zxKrtzqAh8QoKAaNNlvJszC7LMnw",
  authDomain: "webdictionary-auth.firebaseapp.com",
  projectId: "webdictionary-auth",
  storageBucket: "webdictionary-auth.appspot.com",
  messagingSenderId: "516199880484",
  appId: "1:516199880484:web:ce846333f8004440c145b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
