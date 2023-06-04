// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkhRkTMNxNbZFFCR262WgCvNk75W90cxk",
  authDomain: "manishbaba-e21e6.firebaseapp.com",
  projectId: "manishbaba-e21e6",
  storageBucket: "manishbaba-e21e6.appspot.com",
  messagingSenderId: "284870522068",
  appId: "1:284870522068:web:5d970bb71fa9ba51283741",
  measurementId: "G-5F364VBPKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);