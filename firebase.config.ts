import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHyv0h8Thot0Nvwl3oTdySsQEbkpE5pns",
  authDomain: "test-project-7c170.firebaseapp.com",
  projectId: "test-project-7c170",
  storageBucket: "test-project-7c170.appspot.com",
  messagingSenderId: "57281493334",
  appId: "1:57281493334:web:cb1c4347bc08d5ac827ef7",
  measurementId: "G-S21MFQBJ58",
};
const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore();
// export default db;
// const auth = getAuth(firebaseApp);
export default firebaseApp;
