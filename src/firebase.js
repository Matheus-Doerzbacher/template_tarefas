// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuIjZrJ8UJ1_xhJpOiy72OlXCOkH-6ltM",
    authDomain: "minhas-tarefas-d0110.firebaseapp.com",
    projectId: "minhas-tarefas-d0110",
    storageBucket: "minhas-tarefas-d0110.appspot.com",
    messagingSenderId: "794836573575",
    appId: "1:794836573575:web:d87292884ac097f01c0722",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };