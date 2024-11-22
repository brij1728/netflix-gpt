import { getAnalytics } from 'firebase/analytics';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_1q8uRpVV4a3tb4r-nyrf41BxAXEE10E',
  authDomain: 'netflixgpt-1c084.firebaseapp.com',
  projectId: 'netflixgpt-1c084',
  storageBucket: 'netflixgpt-1c084.firebasestorage.app',
  messagingSenderId: '1008915822994',
  appId: '1:1008915822994:web:080197fe7cff5e6d08294b',
  measurementId: 'G-9VGW46TY5F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
