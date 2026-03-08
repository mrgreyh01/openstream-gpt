// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwpV_DyfFwCuLREn9tvak9rywJ6f_hHYc",
  authDomain: "openstream-gpt.firebaseapp.com",
  projectId: "openstream-gpt",
  storageBucket: "openstream-gpt.firebasestorage.app",
  messagingSenderId: "237848398926",
  appId: "1:237848398926:web:3c6da5114ceaec822b071f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export auth
export const auth = getAuth(app);