// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyALtm-aCvAq5FmKygk20lJozGjPHe2vrDw",
  authDomain: "capstone-project-5b469.firebaseapp.com",
  projectId: "capstone-project-5b469",
  storageBucket: "capstone-project-5b469.firebasestorage.app",
  messagingSenderId: "681124702142",
  appId: "1:681124702142:web:c69e0f1e7b4b083b227bef",
  measurementId: "G-EDCKMQ0T9C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);